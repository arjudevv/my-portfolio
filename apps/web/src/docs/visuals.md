# Visual Effects Documentation

This document describes the visual effects system implemented in the portfolio, including post-processing effects, shaders, and performance optimization strategies.

## Overview

The portfolio includes advanced visual effects powered by Three.js, React Three Fiber, and post-processing libraries. All effects are toggleable and respect user preferences for reduced motion and low-power devices.

## Effects

### Post-Processing Effects

#### Bloom
- **Description**: Adds a glowing, luminous effect to bright areas of the scene
- **Intensity**: Adjustable via Visual Controls (0.0 - 1.0)
- **Default**: 0.25
- **Performance Impact**: Medium
- **Tuning**: 
  - Lower `luminanceThreshold` (0.4-0.6) for more bloom
  - Increase `luminanceSmoothing` (0.8-0.95) for smoother transitions
  - Higher `intensity` for stronger glow

#### Chromatic Aberration
- **Description**: Simulates color separation at edges (like a camera lens)
- **Offset**: [0.001, 0.002] (subtle effect)
- **Performance Impact**: Low
- **Tuning**: Increase offset values for stronger effect (max ~0.01)

#### Vignette
- **Description**: Darkens edges of the scene for focus
- **Settings**: 
  - `offset`: 0.5 (center position)
  - `darkness`: 0.5 (strength)
- **Performance Impact**: Very Low
- **Tuning**: Increase `darkness` (0.3-0.8) for stronger vignette

#### Film Grain / Noise
- **Description**: Adds subtle texture overlay
- **Opacity**: 0.02 (very subtle)
- **Performance Impact**: Very Low
- **Tuning**: Increase opacity (0.01-0.05) for more visible grain

#### SMAA (Subpixel Morphological Anti-Aliasing)
- **Description**: Smooths jagged edges
- **Performance Impact**: Low
- **Note**: Always enabled when post-processing is active

### Shader Effects

#### Animated Gradient Sheen
- **Description**: Custom GLSL shader with animated gradient and iridescent sheen
- **Uniforms**:
  - `uTime`: Animation time (automatically updated)
  - `uColorA`: Start color (indigo: [0.31, 0.27, 0.96])
  - `uColorB`: End color (cyan: [0.01, 0.72, 0.82])
  - `uSheen`: Sheen intensity (adjustable via Visual Controls, 0.0 - 1.0)
- **Performance Impact**: Low (when enabled)
- **Tuning**:
  - Adjust `uSheen` for sheen intensity
  - Modify gradient colors in `HeroSceneShape.tsx`
  - Change animation speed by modifying time multiplier in fragment shader

### Audio-Reactive Effects

- **Description**: Visual effects respond to microphone input
- **Implementation**: Web Audio API analyzes audio amplitude
- **Usage**: Drives bloom intensity based on audio levels
- **Privacy**: Requires explicit user permission (opt-in)
- **Performance Impact**: Medium (when enabled)
- **Tuning**: Audio boost multiplier in `HeroSceneContent.tsx` (currently 0.5)

## Performance Optimization

### Automatic Fallbacks

The system automatically disables heavy effects when:

1. **prefers-reduced-motion**: All animations and time-based effects are disabled
2. **Low device memory** (≤2GB): Post-processing and shaders are disabled by default
3. **Low Quality Mode**: Enabled via Visual Controls, uses CSS fallbacks

### Performance Toggle

The "Polish Effects" toggle in the navbar allows users to:
- Enable/disable all post-processing effects
- Enable/disable shader animations
- Persist preference to localStorage

### Low Quality Mode

When enabled:
- Replaces 3D scene with CSS gradient fallback
- Disables all post-processing
- Uses static images instead of animated shaders
- Significantly reduces CPU/GPU usage

## Compression Tips

### GLTF Models

1. **Use Draco compression**: Reduces file size by 70-90%
   ```tsx
   useGLTF('/models/model.glb', true) // Second param enables Draco
   ```

2. **Optimize geometry**: Reduce polygon count for non-critical models
   - Use tools like Blender's Decimate modifier
   - Target: <50k triangles for hero models

3. **Texture optimization**:
   - Use WebP or AVIF formats
   - Compress textures (512x512 or 1024x1024 for most cases)
   - Use texture atlases when possible

4. **Lazy loading**: Use `useLazyGLTF` hook for models below the fold
   ```tsx
   const { gltf, elementRef } = useLazyGLTF('/models/model.glb', true);
   ```

### Shader Optimization

1. **Reduce uniform updates**: Only update when values change
2. **Simplify calculations**: Use simpler math operations when possible
3. **Limit texture lookups**: Minimize texture sampling in shaders

## Disabling for Low-Power Devices

### Automatic Detection

The system checks:
- `navigator.deviceMemory` (if available)
- `prefers-reduced-motion` media query
- User's explicit preference in localStorage

### Manual Disable

Users can:
1. Toggle "Polish Effects" off in navbar
2. Enable "Low Quality Mode" in Visual Controls
3. Settings persist across sessions

### Programmatic Disable

```tsx
import { usePolish } from '@/context/PolishContext';

function MyComponent() {
  const { settings } = usePolish();
  
  if (!settings.polishEnabled) {
    // Render fallback
  }
}
```

## Tuning Values

### Recommended Settings

**High-End Devices**:
- Polish: On
- Bloom Intensity: 0.4-0.6
- Sheen Strength: 0.6-0.8
- Audio Reactive: Optional

**Mid-Range Devices**:
- Polish: On
- Bloom Intensity: 0.2-0.4
- Sheen Strength: 0.4-0.6
- Audio Reactive: Off

**Low-Power Devices**:
- Polish: Off (automatic)
- Low Quality Mode: On
- All effects disabled

### Sample Tuning

```tsx
// In HeroSceneContent.tsx
<Bloom
  luminanceThreshold={0.5}  // Lower = more bloom
  luminanceSmoothing={0.9}  // Higher = smoother
  intensity={0.3}           // Adjustable via controls
/>

// In HeroSceneShape.tsx shader
uSheen: 0.7  // Stronger sheen (0.0 - 1.0)
```

## Accessibility

All visual effects include:
- Keyboard-accessible controls
- ARIA labels and descriptions
- Screen reader fallbacks
- Respect for `prefers-reduced-motion`
- Textual descriptions of visual content

## Troubleshooting

### Effects Not Showing

1. Check if "Polish Effects" is enabled
2. Verify WebGL support: `checkWebGLSupport()`
3. Check browser console for errors
4. Ensure post-processing libraries are loaded

### Performance Issues

1. Enable "Low Quality Mode"
2. Disable "Audio Reactive" if enabled
3. Reduce bloom intensity
4. Check device memory and GPU capabilities

### Shader Compilation Errors

1. Verify GLSL syntax in shader strings
2. Check browser WebGL support
3. Ensure uniforms are properly defined
4. Check console for specific error messages

## Future Enhancements

- Additional post-processing effects (SSAO, depth of field)
- More shader presets
- Performance profiling tools
- Advanced audio-reactive patterns
- Custom shader editor (beyond read-only preview)
