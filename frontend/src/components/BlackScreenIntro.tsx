"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { soundEngine } from "@/lib/audio";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { ChevronRight, Sparkles, Check } from "lucide-react";

interface BlackScreenIntroProps {
  onReveal: () => void;
}

export function BlackScreenIntro({ onReveal }: BlackScreenIntroProps) {
  const [sliderPos, setSliderPos] = useState(0); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleComplete = () => {
    if (isCompleted || isExiting) return;
    setIsCompleted(true);
    setSliderPos(100);

    // 1. Play cinematic soundscape
    soundEngine.playReveal();

    // 2. Fire luxury golden starburst confetti
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.58 },
        colors: ["#f59e0b", "#fbbf24", "#d97706", "#ffffff", "#e0e7ff"],
      });
    } catch {
      // ignore
    }

    // 3. Initiate cinematic dimensional zoom exit
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onReveal();
      }, 750);
    }, 450);
  };

  const handleTouchOrMouseDown = () => {
    if (isCompleted || isExiting) return;
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !trackRef.current || isCompleted || isExiting) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const relativeX = clientX - rect.left;
      const percentage = Math.min(Math.max((relativeX / rect.width) * 100, 0), 100);
      setSliderPos(percentage);

      if (percentage >= 78) {
        setIsDragging(false);
        handleComplete();
      }
    };

    const handleUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (sliderPos < 78) {
          setSliderPos(0);
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
  }, [isDragging, sliderPos, isCompleted, isExiting]);

  return (
    <div
      className={`fixed inset-0 z-50 w-screen h-screen bg-[#020204] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting
          ? "opacity-0 scale-110 blur-xl pointer-events-none"
          : "opacity-100 scale-100 blur-0"
      }`}
    >
      {/* Ultra-Subtle Deep Ambient Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%)",
        }}
      />

      {/* Center Stage Container */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center px-4 transition-all duration-500 ${
          isExiting ? "scale-105 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Prominent Center Logo with 3D perspective tilt & star sparkle */}
        <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
          <AnimatedLogo
            isDark={true}
            size="intro"
            align="center"
            className="mx-auto"
            onClick={handleComplete}
          />
        </div>

        {/* Minimalist Subtitle */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-logo tracking-[0.35em] text-zinc-400 uppercase">
            A MONUMENTAL VISION IN THE MAKING
          </p>
        </div>

        {/* State-of-the-Art Luxury Capsule Slide Button */}
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <div
            ref={trackRef}
            className="relative h-15 sm:h-16 rounded-full p-1.5 flex items-center bg-black/80 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.15)] backdrop-blur-2xl transition-all"
          >
            {/* Animated Golden Progress Fill */}
            <div
              className="absolute left-1.5 top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 transition-all duration-75 opacity-90 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
              style={{ width: `${Math.max(sliderPos, 14)}%` }}
            />

            {/* Center Label Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs sm:text-sm font-logo tracking-widest uppercase font-semibold flex items-center space-x-1.5 text-zinc-300">
                {isCompleted ? (
                  <span className="flex items-center space-x-1.5 text-white">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>UNVEILING...</span>
                  </span>
                ) : (
                  <>
                    <span className="text-white drop-shadow">SLIDE TO UNVEIL</span>
                    <ChevronRight className="w-4 h-4 text-amber-300 animate-pulse opacity-90" />
                    <ChevronRight className="w-4 h-4 text-amber-400 animate-pulse opacity-60 -ml-2.5" />
                  </>
                )}
              </span>
            </div>

            {/* Draggable Golden Knob Handle */}
            <div
              onMouseDown={handleTouchOrMouseDown}
              onTouchStart={handleTouchOrMouseDown}
              className="absolute top-1.5 bottom-1.5 w-12 sm:w-13 h-12 sm:h-13 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-105 transition-transform z-10 bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 text-zinc-950 border border-white/70 shadow-[0_0_20px_rgba(245,158,11,0.7)]"
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

          {/* Quick Direct Tap/Click */}
          <div className="mt-4 text-center">
            <button
              onClick={handleComplete}
              className="text-[11px] sm:text-xs font-logo tracking-widest uppercase text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Or click here to unveil directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
