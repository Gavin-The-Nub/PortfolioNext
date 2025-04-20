  "use client";

  import { useRef, useEffect, useState } from "react";

  export default function InteractiveBackground({ imageUrl }) {
    const canvasRef = useRef(null);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const isTouchingRef = useRef(false);
    const [isMobile, setIsMobile] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
      imageRef.current = new Image();
      imageRef.current.src = imageUrl;
      imageRef.current.crossOrigin = "anonymous";
      imageRef.current.onload = () => setImageLoaded(true);
    }, [imageUrl]);

    useEffect(() => {
      if (!imageLoaded || !imageRef.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const updateCanvasSize = () => {
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
        } else {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        setIsMobile(window.innerWidth < 768);
      };

      updateCanvasSize();

      let particles = [];
      let textImageData = null;

      function createTextImage() {
        if (!ctx || !canvas || !imageRef.current) return 0;

        const offscreenCanvas = document.createElement("canvas");
        const offscreenCtx = offscreenCanvas.getContext("2d");
        if (!offscreenCtx) return 0;

        offscreenCanvas.width = canvas.width;
        offscreenCanvas.height = canvas.height;

        offscreenCtx.fillStyle = "black";
        offscreenCtx.fillRect(
          0,
          0,
          offscreenCanvas.width,
          offscreenCanvas.height
        );

        const size = Math.min(canvas.width, canvas.height) * 0.8;
        const imageX = (canvas.width - size) / 2;
        const imageY = (canvas.height - size) / 2;

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return 0;

        tempCanvas.width = size;
        tempCanvas.height = size;

        tempCtx.save();
        tempCtx.beginPath();
        tempCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        tempCtx.closePath();
        tempCtx.clip();
        tempCtx.drawImage(imageRef.current, 0, 0, size, size);
        tempCtx.restore();

        const imageData = tempCtx.getImageData(0, 0, size, size);
        const data = imageData.data;
        const threshold = 120;

        for (let i = 0; i < data.length; i += 4) {
          const brightness =
            0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          const value = brightness > threshold ? 255 : 0;
          data[i] = data[i + 1] = data[i + 2] = value;
          data[i + 3] = value === 255 ? 255 : 0;
        }

        tempCtx.putImageData(imageData, 0, 0);
        offscreenCtx.drawImage(tempCanvas, imageX, imageY, size, size);

        textImageData = offscreenCtx.getImageData(
          0,
          0,
          offscreenCanvas.width,
          offscreenCanvas.height
        );

        return 1;
      }

      function createParticle(scale) {
        if (!ctx || !canvas || !textImageData) return null;

        const data = textImageData.data;

        for (let attempt = 0; attempt < 100; attempt++) {
          const x = Math.floor(Math.random() * canvas.width);
          const y = Math.floor(Math.random() * canvas.height);
          const index = (y * canvas.width + x) * 4;

          if (data[index + 3] > 128) {
            return {
              x: x,
              y: y,
              baseX: x,
              baseY: y,
              size: Math.random() * 1 + 0.5,
              color: "white",
              scatteredColor: "#FF9900",
              life: Math.random() * 100 + 50,
            };
          }
        }

        return null;
      }

      function createInitialParticles(scale) {
        const baseParticleCount = 5000;
        const particleCount = Math.floor(
          baseParticleCount *
            Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
        );
        for (let i = 0; i < particleCount; i++) {
          const particle = createParticle(scale);
          if (particle) particles.push(particle);
        }
      }

      let animationFrameId;

      function animate(scale) {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const { x: mouseX, y: mouseY } = mousePositionRef.current;
        const maxDistance = 240;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (
            distance < maxDistance &&
            (isTouchingRef.current || !("ontouchstart" in window))
          ) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            const moveX = Math.cos(angle) * force * 60;
            const moveY = Math.sin(angle) * force * 60;
            p.x = p.baseX - moveX;
            p.y = p.baseY - moveY;
            ctx.fillStyle = p.scatteredColor;
          } else {
            p.x += (p.baseX - p.x) * 0.1;
            p.y += (p.baseY - p.y) * 0.1;
            ctx.fillStyle = "white";
          }

          ctx.fillRect(p.x, p.y, p.size, p.size);

          p.life--;
          if (p.life <= 0) {
            const newParticle = createParticle(scale);
            if (newParticle) {
              particles[i] = newParticle;
            } else {
              particles.splice(i, 1);
              i--;
            }
          }
        }

        const baseParticleCount = 5000;
        const targetParticleCount = Math.floor(
          baseParticleCount *
            Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
        );
        while (particles.length < targetParticleCount) {
          const newParticle = createParticle(scale);
          if (newParticle) particles.push(newParticle);
        }

        animationFrameId = requestAnimationFrame(() => animate(scale));
      }

      const scale = createTextImage();
      createInitialParticles(scale);
      animate(scale);

      const handleResize = () => {
        updateCanvasSize();
        const newScale = createTextImage();
        particles = [];
        createInitialParticles(newScale);
      };

      const handleMove = (x, y) => {
        const rect = canvas.getBoundingClientRect();
        const canvasX = x - rect.left;
        const canvasY = y - rect.top;
        mousePositionRef.current = { x: canvasX, y: canvasY };
      };

      const handleMouseMove = (e) => {
        handleMove(e.clientX, e.clientY);
      };

      const handleTouchMove = (e) => {
        if (e.touches.length > 0) {
          e.preventDefault();
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      const handleTouchStart = () => {
        isTouchingRef.current = true;
      };

      const handleTouchEnd = () => {
        isTouchingRef.current = false;
        mousePositionRef.current = { x: 0, y: 0 };
      };

      const handleMouseLeave = () => {
        if (!("ontouchstart" in window)) {
          mousePositionRef.current = { x: 0, y: 0 };
        }
      };

      window.addEventListener("resize", handleResize);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
      canvas.addEventListener("mouseleave", handleMouseLeave);
      canvas.addEventListener("touchstart", handleTouchStart);
      canvas.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("resize", handleResize);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchend", handleTouchEnd);
        cancelAnimationFrame(animationFrameId);
      };
    }, [isMobile, imageLoaded, imageUrl]);

    return (
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with profile image"
      />
    );
  }
