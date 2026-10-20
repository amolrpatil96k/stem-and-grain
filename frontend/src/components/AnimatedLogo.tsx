"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface AnimatedLogoProps {
  isDark: boolean;
  size?: "header" | "hero" | "modal" | "intro" | "massive";
  align?: "left" | "center";
  className?: string;
  onClick?: () => void;
}

export function AnimatedLogo({
  isDark,
  size = "header",
  align = "left",
  className = "",
  onClick,
}: AnimatedLogoProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dimension presets - Generously sized and high-impact
  const sizeClasses = {
    header: "h-16 sm:h-20 md:h-24 w-72 sm:w-96 md:w-[420px]",
    hero: "h-24 sm:h-28 md:h-32 w-88 sm:w-[460px] md:w-[540px]",
    modal: "h-20 sm:h-24 w-80 sm:w-96 md:w-[420px]",
    intro: "h-28 sm:h-36 md:h-44 w-[310px] sm:w-[500px] md:w-[620px]",
    massive: "w-[320px] sm:w-[560px] md:w-[760px] lg:w-[940px] xl:w-[1100px] max-w-[94vw] aspect-[7815/1745] h-auto",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 14, y: x * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer transition-transform duration-300 ease-out select-none ${sizeClasses[size]} ${className}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.04 : 1
          })`,
      }}
    >
      {/* Main Image Logo - Clean, Pristine, Professional */}
      <div className="relative w-full h-full">
        <Image
          src="/Stem and Grain Brown.png"
          alt="Stem & Grain Logo"
          fill
          sizes="(max-width: 768px) 94vw, (max-width: 1200px) 940px, 1100px"
          className={`object-contain ${align === "center" ? "object-center" : "object-left"
            } transition-all duration-300 ${isDark
              ? "drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              : "drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            }`}
          priority
        />
      </div>
    </div>
  );
}
