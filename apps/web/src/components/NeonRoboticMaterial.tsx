'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

/**
 * Custom shader material for neon robotic shimmer effect
 * Creates a cyberpunk-style animated edge glow
 */
class NeonRoboticMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 0 },
        uColor1: { value: new THREE.Color(0x00ffff) }, // Cyan
        uColor2: { value: new THREE.Color(0xff00ff) }, // Magenta
        uColor3: { value: new THREE.Color(0x00ff00) }, // Green
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uIntensity;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          // Calculate fresnel effect for edge detection
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);
          
          // Create animated scan lines
          float scanLine = sin(vUv.y * 20.0 + uTime * 3.0) * 0.5 + 0.5;
          
          // Create animated shimmer wave
          float shimmer = sin(vUv.x * 10.0 + vUv.y * 10.0 + uTime * 2.0) * 0.5 + 0.5;
          
          // Combine effects
          float edgeGlow = fresnel * uIntensity;
          float scanEffect = scanLine * shimmer * uIntensity * 0.3;
          
          // Mix colors for robotic effect
          vec3 color1 = mix(uColor1, uColor2, shimmer);
          vec3 color2 = mix(color1, uColor3, scanLine);
          
          // Final color with glow
          vec3 finalColor = color2 * (edgeGlow + scanEffect);
          
          // Add base color with reduced opacity when not hovering
          vec3 baseColor = vec3(0.9, 0.9, 0.95);
          finalColor = mix(baseColor, finalColor, uIntensity);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }

  get time() {
    return this.uniforms.uTime.value;
  }

  set time(value: number) {
    this.uniforms.uTime.value = value;
  }

  get intensity() {
    return this.uniforms.uIntensity.value;
  }

  set intensity(value: number) {
    this.uniforms.uIntensity.value = value;
  }
}

extend({ NeonRoboticMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      neonRoboticMaterial: any;
    }
  }
}

/**
 * React component wrapper for the neon robotic material
 */
export function NeonRoboticMaterialComponent({ 
  intensity = 0,
  time = 0 
}: { 
  intensity?: number;
  time?: number;
}) {
  const materialRef = useRef<NeonRoboticMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      // Smoothly interpolate intensity
      materialRef.current.intensity += (intensity - materialRef.current.intensity) * 0.1;
    }
  });

  return (
    <neonRoboticMaterial ref={materialRef} />
  );
}
