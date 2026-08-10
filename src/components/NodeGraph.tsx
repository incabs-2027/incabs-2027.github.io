"use client";

import { useEffect, useRef } from "react";

// Decorative node-and-line field for the home hero, echoing the DNA/circuit
// motif in the logo mark. Purely ambient — aria-hidden, and it freezes on
// the first frame for anyone who prefers reduced motion.
export function NodeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const nodes = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
    }));

    let frame = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(18, 163, 148, 0.35)";
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.globalAlpha = 1 - dist / 150;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      for (const n of nodes) {
        ctx.fillStyle = "#c9a24b";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      if (!reduceMotion) frame = requestAnimationFrame(step);
    }

    draw();
    if (!reduceMotion) frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      width={640}
      height={420}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
    />
  );
}
