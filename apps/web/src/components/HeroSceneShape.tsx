'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Floating orbs component with distortion effects
 * Creates a modern particle-like arrangement of glowing spheres
 */
export default function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Create multiple orbs with different positions and properties
  // Use useMemo to prevent recreation on every render
  const orbs = useMemo(() => {
    // Use a fixed seed for consistent positioning
    const seed = 42;
    const random = (i: number) => {
      const x = Math.sin(i * seed) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2 + random(i) * 1.5;
      return {
        position: [
          Math.cos(angle) * radius,
          (random(i + 10) - 0.5) * 3,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        size: 0.3 + random(i + 20) * 0.4,
        speed: 0.3 + random(i + 30) * 0.4,
        color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#8b5cf6' : '#ec4899', // indigo, purple, pink
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;

    // Rotate the entire group slowly
    groupRef.current.rotation.y += 0.002;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <FloatingOrb
          key={i}
          position={orb.position}
          size={orb.size}
          speed={orb.speed}
          color={orb.color}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </group>
  );
}

interface FloatingOrbProps {
  position: [number, number, number];
  size: number;
  speed: number;
  color: string;
  prefersReducedMotion: boolean;
}

function FloatingOrb({
  position,
  size,
  speed,
  color,
  prefersReducedMotion,
}: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return;

    // Floating animation
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;

    // Subtle rotation
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.8}
        distort={prefersReducedMotion ? 0 : 0.3}
        speed={prefersReducedMotion ? 0 : 2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  );
}
