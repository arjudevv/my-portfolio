'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated 3D face model component for hero scene
 * 
 * Usage:
 * 1. Place your face model at /public/models/face-model.glb
 * 2. Import and use: <HeroFaceModel modelPath="/models/face-model.glb" />
 * 
 * Features:
 * - Smooth rotation and floating animations
 * - Respects prefers-reduced-motion
 * - Optimized for performance
 * - Supports morph targets (facial expressions)
 */
interface HeroFaceModelProps {
  /** Path to the GLB/GLTF model file */
  modelPath?: string;
  /** Scale of the model (default: 1) */
  scale?: number | [number, number, number];
  /** Position offset (default: [0, 0, 0]) */
  position?: [number, number, number];
  /** Enable rotation animation (default: true) */
  enableRotation?: boolean;
  /** Enable floating animation (default: true) */
  enableFloating?: boolean;
  /** Rotation speed (default: 0.005) */
  rotationSpeed?: number;
  /** Floating intensity (default: 0.1) */
  floatingIntensity?: number;
  /** Floating speed (default: 1) */
  floatingSpeed?: number;
  /** Enable Draco compression (default: true). Set to false if your model doesn't have Draco compression */
  draco?: boolean;
  /** Hover state for neon effect */
  hovered?: boolean;
  /** Limit rotation to front view only (default: false) */
  frontViewOnly?: boolean;
  /** Hologram strength: 'none' | 'subtle' | 'strong' (default: 'strong') */
  hologramStrength?: 'none' | 'subtle' | 'strong';
}

export default function HeroFaceModel({
  modelPath = '/models/face-model.glb',
  scale = 1,
  position = [0, 0, 0],
  enableRotation = true,
  enableFloating = true,
  rotationSpeed = 0.005,
  floatingIntensity = 0.1,
  floatingSpeed = 1,
  draco = true,
  hovered = false,
  frontViewOnly = false,
  hologramStrength = 'none',
}: HeroFaceModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Load the model with optional Draco compression
  const { scene } = useGLTF(modelPath, draco);

  // Clone the scene to avoid mutating the original
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    meshRefs.current = [];
    
    // Find all meshes and prepare them for holographic effect
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshRefs.current.push(child);
        
        // Optimize rendering
        child.castShadow = false;
        child.receiveShadow = false;
        
        // Enable morph targets if available
        if (child.morphTargetInfluences) {
          child.morphTargetInfluences.fill(0);
        }
        
        // Store original material
        if (!(child.userData as any).originalMaterial) {
          (child.userData as any).originalMaterial = child.material;
        }
        
        // Create a holographic material but handle multi-material meshes and preserve texture encoding.
        const originalMat = (child.userData as any).originalMaterial as
          | THREE.Material
          | THREE.Material[]
          | undefined;

        // helper to tune a MeshStandardMaterial without dropping its maps
        const tuneStandard = (m: THREE.MeshStandardMaterial) => {
          // ensure texture uses sRGB for color textures so colors render correctly
          if (m.map) {
            // newer three.js uses colorSpace instead of encoding
            (m.map as any).colorSpace = (THREE as any).SRGBColorSpace ?? (THREE as any).sRGBEncoding;
            (m.map as any).needsUpdate = true;
          }
          if (m.emissiveMap) {
            (m.emissiveMap as any).colorSpace = (THREE as any).SRGBColorSpace ?? (THREE as any).sRGBEncoding;
            (m.emissiveMap as any).needsUpdate = true;
          }

          const hm = m;
          // set emissive color (cyan) but intensity depends on requested hologramStrength
          hm.emissive = new THREE.Color(0x00ffff);
          const isTextured = !!hm.map;
          // pick base intensity by hologramStrength and whether the material has a color map
          if (hologramStrength === 'strong') {
            hm.emissiveIntensity = isTextured ? 1.2 : 2.4;
          } else if (hologramStrength === 'subtle') {
            hm.emissiveIntensity = isTextured ? 0.18 : 0.4;
          } else {
            // 'none'
            hm.emissiveIntensity = 0;
          }
          hm.metalness = 0.0;
          hm.roughness = 0.45;

          // Respect original transparency if present, otherwise keep opaque
          if (typeof hm.opacity === 'number' && hm.opacity < 1) {
            hm.transparent = true;
          } else {
            hm.transparent = false;
            hm.opacity = 1;
          }

          return hm;
        };

        let holoMaterial: THREE.Material | THREE.Material[];

        if (Array.isArray(originalMat)) {
          // multi-material mesh: clone each material individually
          holoMaterial = originalMat.map((m) => {
            if ((m as any).isMeshStandardMaterial) {
              const cloned = (m as any).clone() as THREE.MeshStandardMaterial;
              return tuneStandard(cloned);
            }
            // fallback clone
            return (m as any).clone ? (m as any).clone() : new THREE.MeshStandardMaterial();
          });
        } else if (originalMat && (originalMat as any).isMeshStandardMaterial) {
          // single material: clone and tune
          const cloned = (originalMat as any).clone() as THREE.MeshStandardMaterial;
          holoMaterial = tuneStandard(cloned);
        } else if (originalMat) {
          // unknown material type: attempt to clone
          holoMaterial = (originalMat as any).clone ? (originalMat as any).clone() : new THREE.MeshStandardMaterial({ color: 0x111111 });
        } else {
          // no original material found - create a gentle standard fallback
          holoMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,
            emissive: 0x00ffff,
            emissiveIntensity: 0.25,
            metalness: 0.0,
            roughness: 0.6,
            transparent: false,
            opacity: 1,
          });
        }

        // Store material reference for animation
        (child.userData as any).holoMaterial = holoMaterial;
        // assign the cloned/tweaked material preserving multi-material arrays where needed
        child.material = holoMaterial as any;
      }
    });
    
    return cloned;
  }, [scene]);


  // Debug helper: log first mesh + material details to console so we can inspect why a blue tint is applied
  useEffect(() => {
    // small timeout to ensure meshes are registered into meshRefs
    setTimeout(() => {
      const first = meshRefs.current && meshRefs.current[0];
      if (!first) {
        console.warn('DEBUG: no mesh found in meshRefs.current');
        return;
      }

      console.log('DEBUG: first mesh', first);
      const mat = first.material;
      if (Array.isArray(mat)) {
        mat.forEach((m, i) => {
          console.log(`DEBUG: material[${i}]`, {
            type: m.type,
            map: (m as any).map,
            mapEncoding: (m as any).map ? (m as any).map.encoding : null,
            emissive: (m as any).emissive,
            emissiveIntensity: (m as any).emissiveIntensity,
            opacity: (m as any).opacity,
            transparent: (m as any).transparent,
          });
        });
      } else {
        console.log('DEBUG: material', {
          type: (mat as any).type,
          map: (mat as any).map,
          mapEncoding: (mat as any).map ? (mat as any).map.encoding : null,
          emissive: (mat as any).emissive,
          emissiveIntensity: (mat as any).emissiveIntensity,
          opacity: (mat as any).opacity,
          transparent: (mat as any).transparent,
        });
      }
    }, 600);
  }, []);


  // Animation loop
  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;

    const time = state.clock.elapsedTime;

    // Rotation animation - limited to front view if frontViewOnly is true
    if (enableRotation) {
      if (frontViewOnly) {
        // Only subtle micro-movements, keep facing front
        groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1 - 0.4; // Turned left on Y axis
        groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.05 + 0.2; // Tilted left on X axis
        groupRef.current.rotation.z = Math.sin(time * 0.15) * 0.03;
      } else {
        groupRef.current.rotation.y = -0.4 + (rotationSpeed * time); // Turned left on Y axis
        groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.05 + 0.2; // Tilted left on X axis
        groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.03;
      }
    }

    // Floating animation
    if (enableFloating) {
      groupRef.current.position.y =
        position[1] + Math.sin(time * floatingSpeed) * floatingIntensity;
      
      // Slight horizontal drift
      groupRef.current.position.x =
        position[0] + Math.cos(time * floatingSpeed * 0.7) * floatingIntensity * 0.3;
    }

    // Animate holographic material - color shifting and scan lines effect
    meshRefs.current.forEach((mesh) => {
      const isTextured = !!(mesh.material as any).map;
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        const hue = (time * 0.8) % 1;
        const color = new THREE.Color().setHSL(hue, 1, 0.7);
        const positionHue = (mesh.position.y * 0.3 + time * 0.3) % 1;
        const positionColor = new THREE.Color().setHSL(positionHue, 0.5, 0.3);

        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          // animate emissive color (holographic shimmer) but don't overwrite the base color or map
          // compute dynamic intensity based on hologramStrength, hover state, and whether material has a map
          const baseIntensity = (() => {
            if (hologramStrength === 'strong') return isTextured ? 1.2 : 2.4;
            if (hologramStrength === 'subtle') return isTextured ? 0.18 : 0.4;
            return 0;
          })();

          // smooth pulse for shimmer (disabled if user prefers reduced motion)
          const pulse = prefersReducedMotion ? 0 : Math.max(0, Math.sin(time * 3 + mesh.position.y * 6) * 0.5 + 0.5);
          const hoverBoost = hovered ? 1.6 : 1.0;
          mat.emissive.copy(color);
          mat.emissiveIntensity = baseIntensity * (0.6 + 0.6 * pulse) * hoverBoost;

          // increase scan-line visibility for strong mode, keep conservative for subtle
          const scanLine = hologramStrength === 'strong'
            ? Math.max(0.65, Math.sin(time * 6 + mesh.position.y * 20) * 0.25 + 0.85)
            : Math.max(0.85, Math.sin(time * 5 + mesh.position.y * 20) * 0.12 + 0.92);
          mat.opacity = scanLine;

          // subtle tinting: lerp the material color slightly toward positionColor so texture still shows
          const currentColor = mat.color.clone();
          currentColor.lerp(positionColor, hologramStrength === 'strong' ? 0.14 : 0.06);
          mat.color.copy(currentColor);

          mat.needsUpdate = true;
        }
      }
    });

    // Optional: Morph target animations (facial expressions)
    meshRefs.current.forEach((mesh) => {
      if (mesh.morphTargetInfluences) {
        const smileIntensity = Math.sin(time * 2) * 0.2 + 0.3;
        if (mesh.morphTargetInfluences.length > 0) {
          mesh.morphTargetInfluences[0] = smileIntensity;
        }
      }
    });
  });

  // Scale can be a number or array
  const scaleVector = useMemo(() => {
    if (Array.isArray(scale)) {
      return scale as [number, number, number];
    }
    return [scale, scale, scale] as [number, number, number];
  }, [scale]);

  return (
    <group ref={groupRef} position={position} scale={scaleVector}>
      <primitive object={clonedScene} />
    </group>
  );
}

/**
 * Preload the face model for better performance
 * Call this in your page component or layout
 */
export function preloadFaceModel(modelPath: string = '/models/face-model.glb', draco: boolean = true) {
  if (typeof window !== 'undefined') {
    import('@react-three/drei').then(({ useGLTF }) => {
      useGLTF.preload(modelPath, draco);
    });
  }
}

// Make the model available for preloading
if (typeof window !== 'undefined') {
  // Preload the default model (try with draco first, fallback to false if it fails)
  preloadFaceModel('/models/face-model.glb', true);
}
