'use client';

import { useState, useRef, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

/**
 * Read-only shader editor demo component
 * Shows a simple animated gradient shader with code preview
 */
export default function ShaderPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`.trim();

  const fragmentShader = `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uSheen;

varying vec2 vUv;

void main() {
  // Animated gradient
  float g = 0.5 + 0.5 * sin(uTime + vUv.x * 10.0);
  vec3 col = mix(uColorA, uColorB, g);
  
  // Subtle sheen effect
  float sheen = pow(max(0.0, dot(normalize(vec3(0.0, 0.0, 1.0)), vec3(0.0, 0.0, 1.0))), 12.0) * uSheen;
  
  gl_FragColor = vec4(col + sheen, 1.0);
}
`.trim();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Create shader
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (vsSource: string, fsSource: string) => {
      const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
      const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vertexShader || !fragmentShader) return null;

      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    };

    const program = createProgram(vertexShader, fragmentShader);
    if (!program) return;

    // Setup geometry
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      1, -1, 1, 1, -1, 1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    const timeLocation = gl.getUniformLocation(program, 'uTime');
    const colorALocation = gl.getUniformLocation(program, 'uColorA');
    const colorBLocation = gl.getUniformLocation(program, 'uColorB');
    const sheenLocation = gl.getUniformLocation(program, 'uSheen');

    const animate = () => {
      timeRef.current += 0.016; // ~60fps

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(timeLocation, timeRef.current);
      gl.uniform3f(colorALocation, 0.31, 0.27, 0.96);
      gl.uniform3f(colorBLocation, 0.01, 0.72, 0.82);
      gl.uniform1f(sheenLocation, 0.6);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Shader Playground
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Live preview of animated gradient shader.
      </p>

      {/* Canvas Preview */}
      <div className="relative w-full aspect-video bg-zinc-900 rounded overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={225}
          className="w-full h-full"
          aria-label="Shader preview canvas"
        />
      </div>

      {/* Code Viewer */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Vertex Shader</h4>
        <div className="rounded overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-900">
          <Highlight code={vertexShader} language="glsl" theme={themes.vsDark}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={{ ...style, padding: '1rem', margin: 0, fontSize: '0.875rem' }}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Fragment Shader</h4>
        <div className="rounded overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-900">
          <Highlight code={fragmentShader} language="glsl" theme={themes.vsDark}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={{ ...style, padding: '1rem', margin: 0, fontSize: '0.875rem' }}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-500">
        <p className="font-medium mb-1">Uniforms:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">uTime</code> - Animation time</li>
          <li><code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">uColorA</code> - Gradient start color</li>
          <li><code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">uColorB</code> - Gradient end color</li>
          <li><code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">uSheen</code> - Sheen intensity (adjustable)</li>
        </ul>
      </div>
    </div>
  );
}
