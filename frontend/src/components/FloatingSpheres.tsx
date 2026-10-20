"use client";

import React from "react";

interface FloatingSpheresProps {
  isDark: boolean;
}

export function FloatingSpheres({ isDark }: FloatingSpheresProps) {
  // Spheres positioned matching the reference image layout
  const spheres = [
    {
      id: "sphere-1",
      className: "w-20 h-20 top-[18%] left-[28%] animate-float-slow",
      gradientDark: "radial-gradient(circle at 35% 35%, #9333ea 0%, #dc2626 55%, #1e1b4b 100%)",
      gradientLight: "radial-gradient(circle at 35% 35%, #c084fc 0%, #f87171 60%, #fed7aa 100%)",
      shadowDark: "0 0 35px rgba(220, 38, 38, 0.4)",
      shadowLight: "0 10px 25px rgba(220, 38, 38, 0.2)",
    },
    {
      id: "sphere-2",
      className: "w-16 h-16 top-[22%] right-[12%] animate-float-medium",
      gradientDark: "radial-gradient(circle at 30% 30%, #3b82f6 0%, #ec4899 50%, #1e1b4b 100%)",
      gradientLight: "radial-gradient(circle at 30% 30%, #60a5fa 0%, #f472b6 60%, #e0e7ff 100%)",
      shadowDark: "0 0 30px rgba(236, 72, 153, 0.4)",
      shadowLight: "0 10px 20px rgba(236, 72, 153, 0.2)",
    },
    {
      id: "sphere-3",
      className: "w-24 h-24 bottom-[16%] left-[6%] animate-float-medium",
      gradientDark: "radial-gradient(circle at 35% 35%, #2563eb 0%, #db2777 55%, #0f172a 100%)",
      gradientLight: "radial-gradient(circle at 35% 35%, #93c5fd 0%, #f43f5e 60%, #fed7aa 100%)",
      shadowDark: "0 0 40px rgba(37, 99, 235, 0.35)",
      shadowLight: "0 15px 30px rgba(37, 99, 235, 0.15)",
    },
    {
      id: "sphere-4",
      className: "w-36 h-36 bottom-[22%] left-[62%] animate-float-slow",
      gradientDark: "radial-gradient(circle at 35% 35%, #3b82f6 0%, #ef4444 60%, #030712 100%)",
      gradientLight: "radial-gradient(circle at 35% 35%, #93c5fd 0%, #fb7185 60%, #ffedd5 100%)",
      shadowDark: "0 0 50px rgba(239, 68, 68, 0.45)",
      shadowLight: "0 20px 40px rgba(239, 68, 68, 0.2)",
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {spheres.map((s) => (
        <div
          key={s.id}
          className={`absolute rounded-full transition-all duration-700 ${s.className}`}
          style={{
            background: isDark ? s.gradientDark : s.gradientLight,
            boxShadow: isDark ? s.shadowDark : s.shadowLight,
            filter: "contrast(1.15) brightness(1.05)",
          }}
        />
      ))}
    </div>
  );
}
