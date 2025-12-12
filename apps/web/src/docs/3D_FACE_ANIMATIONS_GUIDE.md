# Guide: Creating Custom 3D Face Animations for Hero Scene

This guide explains how to create and integrate custom 3D face animations into your portfolio hero section.

## Table of Contents

1. [Getting Your 3D Face Model](#getting-your-3d-face-model)
2. [Optimizing Your Model](#optimizing-your-model)
3. [Integrating into React Three Fiber](#integrating-into-react-three-fiber)
4. [Adding Animations](#adding-animations)
5. [Performance Tips](#performance-tips)

## Getting Your 3D Face Model

### Option 1: 3D Scanning Apps (Easiest)

**Mobile Apps:**
- **Polycam** (iOS/Android) - Photogrammetry scanning
- **Scaniverse** (iOS) - LiDAR scanning (iPhone Pro models)
- **RealityScan** (iOS) - Epic Games' scanning app
- **3D Scanner App** (iOS) - Simple scanning

**Web-Based:**
- **Ready Player Me** - Avatar creation from selfie
- **Loom.ai** - Face scanning and animation
- **Rodin** - AI-powered 3D generation

**Desktop Software:**
- **Agisoft Metashape** - Professional photogrammetry
- **RealityCapture** - High-quality scanning
- **Meshroom** - Free open-source photogrammetry

### Option 2: AI Generation Tools

- **Masterpiece Studio** - AI avatar generation
- **MetaHuman Creator** (Unreal Engine) - High-quality digital humans
- **Character Creator 3** - Professional character creation
- **Daz3D** - 3D character creation

### Option 3: Manual Modeling

If you're comfortable with 3D software:
- **Blender** (Free) - Full-featured 3D modeling
- **ZBrush** - Professional sculpting
- **Maya** - Industry-standard modeling

### Option 4: Commission

- **Fiverr** - Affordable 3D modeling services
- **Upwork** - Professional 3D artists
- **Sketchfab** - Marketplace for 3D models

## Optimizing Your Model

### Step 1: Export to GLTF/GLB

Your model should be exported as `.gltf` or `.glb` format:

**In Blender:**
1. File → Export → glTF 2.0
2. Format: GLB (binary, single file)
3. Include: Selected Objects
4. Transform: +Y Up
5. Geometry: Apply Modifiers

### Step 2: Reduce Polygon Count

Target: **<50,000 triangles** for smooth web performance

**In Blender:**
1. Select your model
2. Modifiers → Add Modifier → Decimate
3. Ratio: 0.3-0.5 (reduces to 30-50% of original)
4. Apply modifier

**Online Tools:**
- [Meshlab](https://www.meshlab.net/) - Free mesh processing
- [Simplygon](https://www.simplygon.com/) - Professional optimization

### Step 3: Compress with Draco

Draco compression reduces file size by 70-90%:

```bash
# Install gltf-pipeline
npm install -g gltf-pipeline

# Compress your model
gltf-pipeline -i face-model.glb -o face-model-draco.glb -d
```

**In Blender:**
1. Export → glTF 2.0
2. Format: GLB
3. Compression: Enable Draco
4. Compression Level: 6-8 (balance between size and quality)

**Online Tools:**
- [glb-packer.glitch.me](https://glb-packer.glitch.me/)
- [products.aspose.app/3d/compression/gltf](https://products.aspose.app/3d/compression/gltf)

### Step 4: Optimize Textures

- **Resolution**: 512x512 or 1024x1024 (avoid 4K+)
- **Format**: WebP or JPEG (not PNG)
- **Compression**: Use texture compression tools

## Integrating into React Three Fiber

### Basic Setup

1. **Place your model** in `/public/models/`:
   ```
   public/
     models/
       face-model-draco.glb
   ```

2. **Create a component** (see `HeroFaceModel.tsx` example)

3. **Use in your scene**:
   ```tsx
   import HeroFaceModel from './HeroFaceModel';
   
   // In HeroSceneContent.tsx
   <HeroFaceModel />
   ```

### Loading the Model

```tsx
import { useGLTF } from '@react-three/drei';

function FaceModel() {
  const { scene } = useGLTF('/models/face-model-draco.glb', true);
  
  return <primitive object={scene} />;
}
```

### Lazy Loading (Recommended)

For better performance, use lazy loading:

```tsx
import { useLazyGLTF } from '@/lib/useLazyGLTF';

function FaceModel() {
  const { gltf } = useLazyGLTF('/models/face-model-draco.glb', true);
  
  if (!gltf) return null;
  
  return <primitive object={gltf.scene} />;
}
```

## Adding Animations

### 1. Rotation Animation

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function FaceModel() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Slow rotation
    meshRef.current.rotation.y += 0.005;
    
    // Bob up and down
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });
  
  return (
    <group ref={meshRef}>
      <primitive object={scene} />
    </group>
  );
}
```

### 2. Morph Target Animations (Facial Expressions)

If your model has morph targets (blend shapes):

```tsx
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

function FaceModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF('/models/face-model-draco.glb', true);
  
  useEffect(() => {
    // Find the mesh with morph targets
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.morphTargetInfluences) {
        meshRef.current = child;
      }
    });
  }, [scene]);
  
  useFrame((state) => {
    if (!meshRef.current?.morphTargetInfluences) return;
    
    // Animate smile (assuming morph target index 0 is smile)
    const smileIntensity = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
    meshRef.current.morphTargetInfluences[0] = smileIntensity;
  });
  
  return <primitive object={scene} />;
}
```

### 3. Skeletal Animations

If your model has bones/armature:

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';

function FaceModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/face-model-draco.glb', true);
  const { actions } = useAnimations(animations, groupRef);
  
  useEffect(() => {
    // Play animation if available
    if (actions['AnimationName']) {
      actions['AnimationName'].play();
    }
  }, [actions]);
  
  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}
```

### 4. Interactive Animations

Respond to user interaction:

```tsx
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

function FaceModel() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Follow mouse
    const x = (state.mouse.x * viewport.width) / 2;
    const y = (state.mouse.y * viewport.height) / 2;
    
    meshRef.current.rotation.y = x * 0.1;
    meshRef.current.rotation.x = -y * 0.1;
    
    // Scale on hover
    meshRef.current.scale.lerp(
      new THREE.Vector3(hovered ? 1.1 : 1, hovered ? 1.1 : 1, hovered ? 1.1 : 1),
      0.1
    );
  });
  
  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />
    </group>
  );
}
```

## Performance Tips

### 1. Model Optimization Checklist

- ✅ Polygon count < 50k triangles
- ✅ File size < 2MB (compressed)
- ✅ Draco compression enabled
- ✅ Textures optimized (512x512 or 1024x1024)
- ✅ Unused materials/textures removed

### 2. Rendering Optimization

```tsx
// Use instancing for multiple faces
import { Instances, Instance } from '@react-three/drei';

// Use LOD (Level of Detail) for distance-based quality
import { useLOD } from '@react-three/drei';

// Disable shadows if not needed
<primitive object={scene} castShadow={false} receiveShadow={false} />
```

### 3. Animation Performance

- Use `useFrame` efficiently (avoid heavy calculations)
- Respect `prefers-reduced-motion`
- Use `useMemo` for expensive computations
- Limit animation complexity on mobile devices

### 4. Loading Strategy

```tsx
// Preload critical models
import { preloadGLTF } from '@/lib/useLazyGLTF';

preloadGLTF('/models/face-model-draco.glb', true);

// Use Suspense for loading states
<Suspense fallback={<LoadingSpinner />}>
  <FaceModel />
</Suspense>
```

## Example: Complete Animated Face Component

See `HeroFaceModel.tsx` for a complete example with:
- Model loading
- Rotation and floating animations
- Prefers-reduced-motion support
- Performance optimizations

## Troubleshooting

### Model Not Loading
- Check file path: `/models/your-model.glb`
- Verify file format: GLB or GLTF
- Check browser console for errors

### Model Too Large
- Reduce polygon count
- Compress with Draco
- Optimize textures
- Remove unused geometry

### Animations Not Working
- Verify model has morph targets/bones
- Check animation names match
- Ensure `useFrame` is properly set up

### Performance Issues
- Reduce polygon count
- Lower texture resolution
- Disable unnecessary post-processing
- Use lazy loading

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Library](https://github.com/pmndrs/drei)
- [glTF Specification](https://www.khronos.org/gltf/)
- [Blender Export Guide](https://docs.blender.org/manual/en/latest/addons/io_scene_gltf2.html)

## Next Steps

1. Get/create your 3D face model
2. Optimize it using the steps above
3. Integrate using the example component
4. Customize animations to match your style
5. Test on various devices for performance
