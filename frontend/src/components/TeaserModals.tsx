"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, Sparkles, Check, ArrowRight } from "lucide-react";
import { AnimatedLogo } from "./AnimatedLogo";

interface BriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export function BriefingModal({ isOpen, onClose, isDark }: BriefingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-3xl p-8 sm:p-12 shadow-2xl transition-all border text-center ${
          isDark
            ? "bg-[#0c0d16] border-white/[0.12] text-white"
            : "bg-white border-zinc-200 text-zinc-900"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-6 right-6 p-2 rounded-full transition-colors cursor-pointer ${
            isDark
              ? "text-zinc-400 hover:text-white bg-white/[0.05]"
              : "text-zinc-500 hover:text-zinc-900 bg-zinc-100"
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Large Prominent Animated Logo in Modal */}
        <div className="mb-8 flex justify-center">
          <AnimatedLogo isDark={isDark} size="modal" />
        </div>

        {/* Grand Vision Heading */}
        <h3 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight mb-4">
          A Grand Vision In Motion.
        </h3>

        {/* Pure Enigmatic Vision Copy - Zero Spoilers */}
        <div
          className={`space-y-4 text-sm sm:text-base leading-relaxed max-w-md mx-auto ${
            isDark ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          <p>
            True monumental work demands focus, patience, and absolute silence.
          </p>
          <p>
            We are engineering something unprecedented. No shortcuts, no compromises.
            When the time arrives, everything will speak for itself.
          </p>
        </div>

        {/* Clean Footer */}
        <div className="mt-10 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>STEM & GRAIN</span>
          <span>COMING SOON</span>
        </div>
      </div>
    </div>
  );
}

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export function SignUpModal({ isOpen, onClose, isDark }: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#ec4899", "#3b82f6", "#10b981"],
      });
    } catch {
      // ignore
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-md rounded-3xl p-8 sm:p-10 shadow-2xl transition-all border text-center ${
          isDark
            ? "bg-[#0c0d16] border-white/[0.12] text-white"
            : "bg-white border-zinc-200 text-zinc-900"
        }`}
      >
        <button
          onClick={handleClose}
          className={`absolute top-6 right-6 p-2 rounded-full transition-colors cursor-pointer ${
            isDark
              ? "text-zinc-400 hover:text-white bg-white/[0.05]"
              : "text-zinc-500 hover:text-zinc-900 bg-zinc-100"
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6 flex flex-col items-center">
              <AnimatedLogo isDark={isDark} size="modal" className="mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight">
                Be The First To Know
              </h3>
              <p className={`text-xs sm:text-sm mt-2 max-w-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Leave your email to receive early access when the unveiling begins.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 rounded-xl text-sm font-sans border focus:outline-none transition-colors ${
                  isDark
                    ? "bg-black/50 border-white/[0.15] text-white placeholder-zinc-500 focus:border-amber-400"
                    : "bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-zinc-800"
                }`}
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-full font-sans text-sm font-semibold tracking-wider transition-all shadow-md cursor-pointer bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white hover:opacity-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>JOIN PRIVATE WAITLIST</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-sans mb-2">You Are On The List</h3>
            <p className={`text-xs max-w-xs mx-auto leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              Your priority notification is confirmed. We will reach out when the curtain rises.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
