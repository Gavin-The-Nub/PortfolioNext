"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";

export function PortfolioScene() {
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

      <GridPoints />
      <FloatingParticles />
      <DataFlowLines />
    </Canvas>
  );
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
        // Move particles up and reset when they reach the top
        particle.position.y += data.speed * 0.02;
        if (particle.position.y > 5) {
          particle.position.y = -5;
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
