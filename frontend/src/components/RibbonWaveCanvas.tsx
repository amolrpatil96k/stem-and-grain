"use client";

import React, { useEffect, useRef } from "react";

interface RibbonWaveCanvasProps {
  isDark: boolean;
}

export function RibbonWaveCanvas({ isDark }: RibbonWaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const lineCount = 48; // Dense ribbon lines like reference image

    const render = () => {
      time += 0.012;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Create flowing linear gradient across the screen width matching the reference
      const gradient = ctx.createLinearGradient(0, height * 0.4, width, height * 0.6);
      if (isDark) {
        gradient.addColorStop(0.0, "rgba(59, 130, 246, 0.75)"); // Electric Blue
        gradient.addColorStop(0.18, "rgba(139, 92, 246, 0.85)"); // Royal Violet
        gradient.addColorStop(0.38, "rgba(236, 72, 153, 0.9)"); // Hot Pink/Magenta
        gradient.addColorStop(0.58, "rgba(239, 68, 68, 0.95)"); // Radiant Coral Red
        gradient.addColorStop(0.78, "rgba(249, 115, 22, 0.9)"); // Fiery Orange
        gradient.addColorStop(0.92, "rgba(234, 179, 8, 0.85)"); // Golden Amber
        gradient.addColorStop(1.0, "rgba(45, 212, 191, 0.7)"); // Aquamarine/Teal
      } else {
        gradient.addColorStop(0.0, "rgba(37, 99, 235, 0.8)"); // Deep Blue
        gradient.addColorStop(0.2, "rgba(124, 58, 237, 0.85)"); // Purple
        gradient.addColorStop(0.4, "rgba(219, 39, 119, 0.9)"); // Rose Magenta
        gradient.addColorStop(0.65, "rgba(225, 29, 72, 0.9)"); // Crimson
        gradient.addColorStop(0.85, "rgba(217, 119, 6, 0.85)"); // Amber
        gradient.addColorStop(1.0, "rgba(13, 148, 136, 0.8)"); // Teal
      }

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.25;

      const mouseInfluenceY = ((mouseY / height) - 0.5) * 60;
      const mouseInfluenceX = ((mouseX / width) - 0.5) * 40;

      // Draw each strand of the volumetric ribbon wave
      for (let i = 0; i < lineCount; i++) {
        const offset = (i - lineCount / 2) * 2.8;
        const phaseShift = (i / lineCount) * 0.6;

        ctx.beginPath();

        const stepCount = 90;
        for (let s = 0; s <= stepCount; s++) {
          const progress = s / stepCount;
          const x = progress * width;

          // Base vertical position (centered slightly below middle)
          const baseCenterY = height * 0.54 + mouseInfluenceY;

          // Multiple harmonic sine waves to create the exact undulating flow from reference
          const wave1 = Math.sin(progress * Math.PI * 2.4 - time + phaseShift) * (height * 0.16);
          const wave2 = Math.cos(progress * Math.PI * 3.8 + time * 0.7 - phaseShift * 1.5) * (height * 0.09);
          const wave3 = Math.sin(progress * Math.PI * 1.2 + time * 0.5) * (height * 0.05);

          // Envelope shaping: tight at left edge, expands dramatically in center and right, tapers at edge
          const envelope = Math.sin(progress * Math.PI) * (1 + 0.3 * Math.sin(progress * 4 + time));

          // Fan out lines towards the right side of the wave as shown in the reference
          const fanning = Math.pow(progress, 1.4) * offset * 2.2;

          const y = baseCenterY + (wave1 + wave2 + wave3) * envelope + offset + fanning;

          if (s === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Variable opacity for 3D depth illusion
        const alpha = 0.25 + 0.65 * (1 - Math.abs(i - lineCount / 2) / (lineCount / 2));
        ctx.globalAlpha = alpha;
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
