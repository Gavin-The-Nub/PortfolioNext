"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  useProgress,
} from "@react-three/drei";

export function PortfolioScene({ onLoaded, onProgress }) {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 10, 40]} />
      <ambientLight intensity={0.2} />
      <Environment preset="city" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
      />

      <SceneLoader onLoaded={onLoaded} onProgress={onProgress} />
      <GridPoints />
      <FloatingParticles />
      <DataFlowLines />
    </Canvas>
  );
}

// Component to detect when scene is loaded
function SceneLoader({ onLoaded, onProgress }) {
  const { progress, active, loaded, total } = useProgress();
  const [sceneReady, setSceneReady] = useState(false);
  const [internalProgress, setInternalProgress] = useState(0);

  // Update progress
  useEffect(() => {
    const calculatedProgress = active ? progress : 100;
    setInternalProgress(calculatedProgress);
    onProgress && onProgress(calculatedProgress);
  }, [progress, active, onProgress]);

  // Handle scene ready state
  useEffect(() => {
    if (!active && progress === 100 && !sceneReady) {
      // Add a small delay to ensure all components are rendered
      const timer = setTimeout(() => {
        setSceneReady(true);
        onLoaded && onLoaded();
      }, 1000); // Wait 1 second after assets are loaded

      return () => clearTimeout(timer);
    }
  }, [active, progress, sceneReady, onLoaded]);

  // Simulate additional loading time for scene setup
  useEffect(() => {
    if (!active && progress === 100) {
      let currentProgress = 100;
      const interval = setInterval(() => {
        currentProgress += 0.5;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return;
        }
        onProgress && onProgress(Math.min(currentProgress, 100));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [active, progress, onProgress]);

  return null;
}

function GridPoints() {
  const pointsRef = useRef(null);
  const { viewport } = useThree();
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const gridSize = 10;
    const spacing = 2;
    const newPoints = [];

    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        // Create a grid but exclude points near the center
        const distance = Math.sqrt(x * x + z * z);
        if (distance > 5) {
          newPoints.push([x, -3, z]);
        }
      }
    }

    setPoints(newPoints);
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={pointsRef}>
      {points.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const count = 50;
    const newParticles = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 10;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 10;

      newParticles.push({
        position: [x, y, z],
        speed: 0.2 + Math.random() * 0.3,
        size: 0.05 + Math.random() * 0.1,
        color: Math.random() > 0.7 ? "#3b82f6" : "#8b5cf6",
      });
    }

    setParticles(newParticles);
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const data = particles[i];
        if (data) {
          // Move particles up and reset when they reach the top
          particle.position.y += data.speed * 0.02;
          if (particle.position.y > 5) {
            particle.position.y = -5;
          }
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[particle.size, 16, 16]} />
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataFlowLines() {
  const linesRef = useRef(null);

  useFrame(({ clock }) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={linesRef} position={[0, 0, 0]}>
      <Sphere args={[8, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.3}
          speed={2}
          wireframe
          transparent
          opacity={0.2}
        />
      </Sphere>
    </group>
  );
}
