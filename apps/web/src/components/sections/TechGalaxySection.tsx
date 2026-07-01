'use client';

import { useEffect, useRef, useState } from 'react';
import { skills, galaxyConnections } from '@/content/skills';

interface Node {
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

export default function TechGalaxySection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#5B8CFF', '#8A5CFF', '#00E5FF', '#00FFB0'];
    const galaxySkills = skills.filter((s) =>
      galaxyConnections.some((c) => c.source === s.name || c.target === s.name)
    ).slice(0, 16);

    const nodes: Node[] = galaxySkills.map((s, i) => ({
      name: s.name,
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      color: colors[i % colors.length],
    }));

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMove);

    let raf: number;
    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((node) => {
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          node.vx -= (dx / dist) * 0.02;
          node.vy -= (dy / dist) * 0.02;
        }
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.99;
        node.vy *= 0.99;
        if (node.x < 30 || node.x > w - 30) node.vx *= -1;
        if (node.y < 30 || node.y > h - 30) node.vy *= -1;
      });

      galaxyConnections.forEach((conn) => {
        const a = nodes.find((n) => n.name === conn.source);
        const b = nodes.find((n) => n.name === conn.target);
        if (!a || !b) return;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(91, 140, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      nodes.forEach((node) => {
        const isSelected = selected === node.name;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isSelected ? 12 : 8, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isSelected ? 20 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + 20);
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const hit = nodes.find((n) => Math.hypot(n.x - x, n.y - y) < 15);
      setSelected(hit?.name ?? null);
    };
    canvas.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('click', onClick);
    };
  }, [selected]);

  const selectedSkill = skills.find((s) => s.name === selected);

  return (
    <section id="galaxy" data-section="galaxy" className="section-padding relative" aria-labelledby="galaxy-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" data-reveal>
        <p className="section-label mb-4">Tech Galaxy</p>
        <h2 id="galaxy-heading" className="text-4xl md:text-6xl font-heading font-bold mb-8">
          Connected <span className="gradient-text">Technologies</span>
        </h2>
        <p className="text-muted mb-8 max-w-xl">Click nodes to explore technology connections across projects.</p>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-[400px] md:h-[500px] rounded-2xl card-glass cursor-crosshair"
            aria-label="Interactive technology galaxy. Click nodes to select."
          />
          {selectedSkill && (
            <div className="absolute bottom-4 left-4 card-glass rounded-xl p-4 max-w-xs">
              <p className="font-semibold text-white">{selectedSkill.name}</p>
              <p className="text-sm text-accent">{selectedSkill.level} · {selectedSkill.category}</p>
              {selectedSkill.projects && (
                <p className="text-xs text-muted mt-1">Used in: {selectedSkill.projects.join(', ')}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
