"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { soundEngine } from "@/lib/audio";
import { ChevronRight, Sparkles, Check } from "lucide-react";

interface SlideButtonProps {
  onComplete: () => void;
  isDark: boolean;
}

export function SlideButton({ onComplete, isDark }: SlideButtonProps) {
  const [sliderPos, setSliderPos] = useState(0); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleComplete = () => {
    setIsCompleted(true);
    setSliderPos(100);
    soundEngine.playClick("success");

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#f59e0b", "#fbbf24", "#d97706", "#ffffff", "#3b82f6"],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onComplete();
      // Reset after a delay so it can be used again
      setTimeout(() => {
        setIsCompleted(false);
        setSliderPos(0);
      }, 1200);
    }, 400);
  };

  const handleTouchOrMouseDown = () => {
    if (isCompleted) return;
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !trackRef.current || isCompleted) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const relativeX = clientX - rect.left;
      const percentage = Math.min(Math.max((relativeX / rect.width) * 100, 0), 100);
      setSliderPos(percentage);

      if (percentage >= 80) {
        setIsDragging(false);
        handleComplete();
      }
    };

    const handleUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (sliderPos < 80) {
          setSliderPos(0); // Snap back if threshold not met
        }
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchend", handleUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, sliderPos, isCompleted]);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm select-none">
      {/* Outer Slider Capsule */}
      <div
        ref={trackRef}
        className={`relative h-14 sm:h-16 rounded-full p-1.5 flex items-center shadow-lg transition-all border ${
          isDark
            ? "bg-black/60 border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "bg-white/80 border-zinc-300 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl"
        }`}
      >
        {/* Animated Progress Fill */}
        <div
          className="absolute left-1.5 top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 transition-all duration-75 opacity-90 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
          style={{ width: `${Math.max(sliderPos, 14)}%` }}
        />

        {/* Center Label Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className={`text-xs sm:text-sm font-logo tracking-widest uppercase font-semibold flex items-center space-x-1.5 transition-opacity ${
              isCompleted
                ? "text-white font-bold"
                : isDark
                ? "text-zinc-300"
                : "text-zinc-700"
            }`}
          >
            {isCompleted ? (
              <span className="flex items-center space-x-1 text-white">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>UNVEILED</span>
              </span>
            ) : (
              <>
                <span>SLIDE TO UNVEIL</span>
                <ChevronRight className="w-4 h-4 animate-pulse opacity-70" />
                <ChevronRight className="w-4 h-4 animate-pulse opacity-40 -ml-2.5" />
              </>
            )}
          </span>
        </div>

        {/* Draggable Knob Handle */}
        <div
          onMouseDown={handleTouchOrMouseDown}
          onTouchStart={handleTouchOrMouseDown}
          className={`absolute top-1.5 bottom-1.5 w-11 sm:w-13 h-11 sm:h-13 rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing hover:scale-105 transition-transform z-10 ${
            isDark
              ? "bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 text-zinc-950 border border-white/60 shadow-[0_0_16px_rgba(245,158,11,0.6)]"
              : "bg-gradient-to-b from-zinc-900 to-zinc-800 text-white border border-zinc-700 shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
          }`}
          style={{
            left: `calc(${sliderPos}% * 0.85 + 6px)`,
          }}
        >
          {isCompleted ? (
            <Sparkles className="w-5 h-5 text-zinc-950 animate-spin" />
          ) : (
            <ChevronRight className="w-5 h-5 font-bold" />
          )}
        </div>
      </div>

      {/* Quick Tap/Click text below */}
      <div className="mt-2 text-center">
        <button
          onClick={handleComplete}
          className={`text-[11px] font-logo tracking-wider uppercase transition-colors cursor-pointer ${
            isDark
              ? "text-zinc-500 hover:text-amber-400"
              : "text-zinc-400 hover:text-zinc-800"
          }`}
        >
          Or click here for quick reveal
        </button>
      </div>
    </div>
  );
}
