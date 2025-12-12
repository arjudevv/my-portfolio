/**
 * GLSL shader helper utilities
 * Provides tagged template literal for GLSL strings
 */

/**
 * Tagged template for GLSL shader strings
 * This allows syntax highlighting and validation in editors
 */
export function glsl(strings: TemplateStringsArray, ...values: any[]): string {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? '');
  }, '');
}

/**
 * Default vertex shader for basic materials
 */
export const defaultVertexShader = glsl`
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Helper to create shader uniforms object
 */
export function createShaderUniforms<T extends Record<string, any>>(uniforms: T): T {
  return uniforms;
}

/**
 * Type guard for checking if a material has shader uniforms
 */
export function hasShaderUniforms(
  material: any
): material is { uniforms: Record<string, { value: any }> } {
  return material && typeof material === 'object' && 'uniforms' in material;
}
