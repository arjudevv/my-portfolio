# 3D Models Directory

This directory contains GLTF/GLB models used in the portfolio.

## Sample Model

Replace `lowpoly-draco.glb` with your own optimized GLTF model.

### Requirements

- **Format**: GLTF (.gltf) or GLB (.glb) - GLB preferred for single-file deployment
- **Compression**: Use Draco compression for smaller file sizes
- **Size**: Keep hero models under 2MB when compressed
- **Polygons**: Target <50k triangles for smooth performance

### Compression Tools

1. **glTF-Pipeline** (recommended):
   ```bash
   npm install -g gltf-pipeline
   gltf-pipeline -i model.gltf -o model-draco.glb -d
   ```

2. **Blender**:
   - Export as GLTF
   - Enable "Draco" compression in export settings
   - Reduce quality if needed (6-8 is usually good)

3. **Online Tools**:
   - https://glb-packer.glitch.me/
   - https://products.aspose.app/3d/compression/gltf

### Usage

```tsx
import { useGLTF } from '@react-three/drei';

// With Draco compression
const { scene } = useGLTF('/models/lowpoly-draco.glb', true);

// Or use lazy loading
import { useLazyGLTF } from '@/lib/useLazyGLTF';
const { gltf, elementRef } = useLazyGLTF('/models/lowpoly-draco.glb', true);
```

### Example Model Sources

- [Sketchfab](https://sketchfab.com/) - Free models available
- [Poly Haven](https://polyhaven.com/models) - CC0 models
- [Quaternius](https://quaternius.com/) - Low-poly models

### Notes

- Models are lazy-loaded by default (only when visible)
- Draco compression is recommended for all models
- Test performance on target devices
- Provide fallback images for low-power devices

## Face Models

For creating custom 3D face animations, see the comprehensive guide:
- **Guide**: `/src/docs/3D_FACE_ANIMATIONS_GUIDE.md`
- **Example Component**: `/src/components/HeroFaceModel.tsx`

### Quick Start for Face Models

1. **Get your face model** using one of these methods:
   - **Mobile Apps**: Polycam, Scaniverse, RealityScan
   - **Web Tools**: Ready Player Me, Loom.ai, Rodin
   - **AI Tools**: Masterpiece Studio, MetaHuman Creator
   - **Manual**: Blender, ZBrush, Maya

2. **Optimize your model**:
   ```bash
   # Reduce polygons, then compress with Draco
   gltf-pipeline -i face-model.glb -o face-model-draco.glb -d
   ```

3. **Place in models directory**:
   ```
   public/models/face-model-draco.glb
   ```

4. **Use in your scene**:
   ```tsx
   import HeroFaceModel from '@/components/HeroFaceModel';
   
   // In HeroSceneContent.tsx
   <HeroFaceModel modelPath="/models/face-model-draco.glb" />
   ```

### Face Model Requirements

- **Format**: GLB (preferred) or GLTF
- **Polygons**: <50k triangles
- **Size**: <2MB compressed
- **Compression**: Draco enabled
- **Textures**: 512x512 or 1024x1024 max
- **Morph Targets**: Optional (for facial expressions)
- **Bones/Armature**: Optional (for skeletal animation)
