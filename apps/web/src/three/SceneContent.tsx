'use client';

import { useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useScene } from './SceneContext';
import PostFX from './PostFX';
import { usePrefersReducedMotion } from '@/hooks/useIsClient';
import type { SceneId } from '@/types/portfolio';

const PARTICLE_POSITIONS = Array.from({ length: 80 }, (_, i) => ({
  x: Math.sin(i * 1.7) * 6,
  y: Math.cos(i * 2.1) * 4,
  z: Math.sin(i * 0.9) * 4,
}));

const GALAXY_POSITIONS = Array.from({ length: 30 }, (_, i) => {
  const phi = Math.acos(2 * ((i * 0.137) % 1) - 1);
  const theta = 2 * Math.PI * ((i * 0.271) % 1);
  const r = 3 + (i % 5) * 0.4;
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.sin(phi) * Math.sin(theta),
    z: r * Math.cos(phi),
    hue: i % 3 === 0 ? '#5B8CFF' : i % 3 === 1 ? '#8A5CFF' : '#00E5FF',
  };
});

function SceneLayer({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const opacity = useRef(active ? 1 : 0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = active ? 1 : 0;
    opacity.current = THREE.MathUtils.damp(opacity.current, target, 6, delta);
    groupRef.current.visible = opacity.current > 0.02;
    groupRef.current.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.material) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        if ('opacity' in material) {
          material.transparent = true;
          material.opacity = opacity.current;
        }
      });
    });
  });

  return <group ref={groupRef}>{children}</group>;
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useScene();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = mouse.y * 0.1;
    groupRef.current.position.x = mouse.x * 0.3;
  });

  const colors = ['#5B8CFF', '#8A5CFF', '#00E5FF', '#00FFB0'];

  return (
    <group ref={groupRef}>
      {colors.map((color, i) => {
        const angle = (i / colors.length) * Math.PI * 2;
        const radius = 2.5;
        return (
          <Float key={i} speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
            <Sphere
              args={[0.4 + i * 0.08, 32, 32]}
              position={[Math.cos(angle) * radius, Math.sin(i) * 0.8, Math.sin(angle) * radius]}
            >
              <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.3}
                speed={2}
                roughness={0.1}
                metalness={0.8}
                transparent
                opacity={0.85}
              />
            </Sphere>
          </Float>
        );
      })}
    </group>
  );
}

function CodeParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = new Float32Array(PARTICLE_POSITIONS.flatMap((p) => [p.x, p.y, p.z]));

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#00E5FF" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = 12;

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: nodes }).map((_, i) => {
        const angle = (i / nodes) * Math.PI * 2;
        const r = 3;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, Math.sin(i * 1.3) * 1.5, Math.sin(angle) * r]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#5B8CFF" emissive="#5B8CFF" emissiveIntensity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
}

function GalaxyNodes() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <group ref={ref}>
      {GALAXY_POSITIONS.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={pos.hue} emissive={pos.hue} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function CloudInfra() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <group ref={ref}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[i * 1.5 - 1.5, 0, 0]}>
          <boxGeometry args={[1, 0.6, 0.8]} />
          <meshStandardMaterial color="#101010" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function isOrbsScene(scene: SceneId) {
  return scene === 'hero' || scene === 'about';
}

function isNetworkScene(scene: SceneId) {
  return scene === 'projects' || scene === 'experience';
}

export default function SceneContent() {
  const { activeScene, mouse } = useScene();
  const lightRef = useRef<THREE.PointLight>(null);
  const reducedMotion = usePrefersReducedMotion();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = mouse.x * 5;
      lightRef.current.position.y = mouse.y * 5;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#050505', 8, 20]} />
      <ambientLight intensity={0.3} />
      <pointLight ref={lightRef} position={[5, 5, 5]} intensity={1} color="#5B8CFF" />
      <pointLight position={[-5, -3, -5]} intensity={0.4} color="#8A5CFF" />

      <SceneLayer active={isOrbsScene(activeScene)}>
        <FloatingOrbs />
      </SceneLayer>
      <SceneLayer active={activeScene === 'skills'}>
        <CodeParticles />
      </SceneLayer>
      <SceneLayer active={isNetworkScene(activeScene)}>
        <NetworkNodes />
      </SceneLayer>
      <SceneLayer active={activeScene === 'galaxy'}>
        <GalaxyNodes />
      </SceneLayer>
      <SceneLayer active={activeScene === 'contact'}>
        <CloudInfra />
      </SceneLayer>

      {!reducedMotion && <PostFX />}
    </>
  );
}
