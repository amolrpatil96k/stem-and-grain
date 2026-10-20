"use client";

import React, { useEffect, useRef } from "react";

interface InteractiveDottedGridProps {
  isDark?: boolean;
}

interface GridDot {
  x: number;
  y: number;
  intensity: number; // 0 (dormant) to 1 (full glow under cursor)
}

export function InteractiveDottedGrid({ isDark = false }: InteractiveDottedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    isActive: false,
  });
  const dotsRef = useRef<GridDot[]>([]);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const spacing = 28; // Generous architectural grid spacing so dots never crowd
    const spotlightRadius = 160; // Focused proximity - only dots immediately near cursor respond
    const spotlightRadiusSq = spotlightRadius * spotlightRadius;

    // Handle resize & Retina / 4K displays
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rebuild pristine dot matrix
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % spacing) / 2;

      const newDots: GridDot[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          newDots.push({
            x: offsetX + c * spacing,
            y: offsetY + r * spacing,
            intensity: 0,
          });
        }
      }
      dotsRef.current = newDots;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Track mouse with smooth lerp
    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isActive = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.isActive = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseleave", handlePointerLeave);

    // Pure chromatic calculation:
    // Transitions cleanly from Logo Gold (center) -> Luminous Champagne/White (mid) -> Slate-Blue (outer)
    // Eliminates all murky/muddy green bleed completely!
    const getDotRGB = (proximity: number, isDarkMode: boolean): [number, number, number] => {
      if (isDarkMode) {
        if (proximity > 0.6) {
          // Center core: Logo Warm Gold (#fbbf24 to #f59e0b)
          const t = (proximity - 0.6) / 0.4;
          const r = Math.round(251 * t + 245 * (1 - t));
          const g = Math.round(191 * t + 158 * (1 - t));
          const b = Math.round(36 * t + 11 * (1 - t));
          return [r, g, b];
        } else if (proximity > 0.3) {
          // Mid zone: Crisp Luminous Champagne / Silver-Gold (#fef3c7 to #e0f2fe)
          const t = (proximity - 0.3) / 0.3;
          const r = Math.round(245 * t + 125 * (1 - t));
          const g = Math.round(158 * t + 185 * (1 - t));
          const b = Math.round(11 * t + 248 * (1 - t));
          return [r, g, b];
        } else {
          // Outer edge: Crisp Slate-Blue / Sky (#38bdf8 to #0ea5e9)
          const t = proximity / 0.3;
          const r = Math.round(56 * t + 14 * (1 - t));
          const g = Math.round(189 * t + 165 * (1 - t));
          const b = Math.round(248 * t + 233 * (1 - t));
          return [r, g, b];
        }
      } else {
        // Light Mode: High-contrast luxury pigments
        if (proximity > 0.6) {
          // Center core: Deep Stem & Grain Logo Gold (#d97706 to #b45309)
          const t = (proximity - 0.6) / 0.4;
          const r = Math.round(217 * t + 180 * (1 - t));
          const g = Math.round(119 * t + 83 * (1 - t));
          const b = Math.round(6 * t + 9 * (1 - t));
          return [r, g, b];
        } else if (proximity > 0.3) {
          // Mid zone: Warm Bronze to Deep Slate-Indigo transition
          const t = (proximity - 0.3) / 0.3;
          const r = Math.round(180 * t + 67 * (1 - t));
          const g = Math.round(83 * t + 56 * (1 - t));
          const b = Math.round(9 * t + 202 * (1 - t));
          return [r, g, b];
        } else {
          // Outer edge: Deep Ocean Slate-Blue (#0284c7)
          const t = proximity / 0.3;
          const r = Math.round(67 * t + 2 * (1 - t));
          const g = Math.round(56 * t + 132 * (1 - t));
          const b = Math.round(202 * t + 199 * (1 - t));
          return [r, g, b];
        }
      }
    };

    // 60fps Render Loop
    const render = () => {
      const mouse = mouseRef.current;

      // Silky mouse tracking
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.24;
        mouse.y += (mouse.targetY - mouse.y) * 0.24;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.08;
        mouse.y += (-1000 - mouse.y) * 0.08;
      }

      ctx.clearRect(0, 0, width, height);

      // Resting dot settings: Ultra-clean, subtle, stationary
      const restingRadius = 1.0;
      const restingAlpha = isDark ? 0.08 : 0.16;
      const restingColor = isDark
        ? `rgba(148, 163, 184, ${restingAlpha})` // Slate-400
        : `rgba(100, 116, 139, ${restingAlpha})`; // Slate-500

      const dots = dotsRef.current;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Proximity calculation
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distSq = dx * dx + dy * dy;

        let targetIntensity = 0;
        let proximity = 0;

        if (mouse.isActive && distSq < spotlightRadiusSq) {
          const dist = Math.sqrt(distSq);
          proximity = 1 - dist / spotlightRadius; // 1 at cursor center, 0 at outer edge
          // Crisp parabolic falloff for sharp contrast (prevents fuzzy wide color wash)
          targetIntensity = Math.pow(proximity, 1.8);
        }

        // Smooth interpolation (fast silky fade-in, smooth decay)
        const lerpRate = targetIntensity > dot.intensity ? 0.35 : 0.09;
        dot.intensity += (targetIntensity - dot.intensity) * lerpRate;

        if (dot.intensity > 0.01) {
          // ===================================================================
          // ACTIVE ILLUMINATED DOT (CRISP, RAZOR-SHARP, ZERO FOGGY BLEED)
          // ===================================================================
          // Scale dot cleanly up to 2.1px max (pure circle)
          const activeRadius = restingRadius + dot.intensity * 1.1;
          const [r, g, b] = getDotRGB(dot.intensity, isDark);
          const alpha = Math.min(1, restingAlpha + dot.intensity * 0.88);

          // TIGHT MICRO-GLOW (Kept strictly within 4px of dot center so adjacent dots never bleed)
          if (dot.intensity > 0.15) {
            const tightGlowRadius = activeRadius + 2.2 * dot.intensity;
            const microHalo = ctx.createRadialGradient(
              dot.x,
              dot.y,
              activeRadius * 0.6,
              dot.x,
              dot.y,
              tightGlowRadius
            );
            microHalo.addColorStop(
              0,
              `rgba(${r}, ${g}, ${b}, ${dot.intensity * (isDark ? 0.35 : 0.28)})`
            );
            microHalo.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, tightGlowRadius, 0, Math.PI * 2);
            ctx.fillStyle = microHalo;
            ctx.fill();
          }

          // Main pure circular dot
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, activeRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
        } else {
          // ===================================================================
          // RESTING ARCHITECTURAL DOT
          // ===================================================================
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, restingRadius, 0, Math.PI * 2);
          ctx.fillStyle = restingColor;
          ctx.fill();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
    />
  );
}
