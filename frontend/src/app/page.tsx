"use client";

import React, { useState, useEffect } from "react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { InteractiveDottedGrid } from "@/components/InteractiveDottedGrid";
import { Sun, Moon, Mail, Copy, Check, Wheat, Milk, Waves } from "lucide-react";
import { soundEngine } from "@/lib/audio";

// =============================================================================
// PREVIOUS COMPONENT IMPORTS (KEPT FOR QUICK RESTORATION - DO NOT REMOVE)
// =============================================================================
// import { RibbonWaveCanvas } from "@/components/RibbonWaveCanvas";
// import { FloatingSpheres } from "@/components/FloatingSpheres";
// import { BlackScreenIntro } from "@/components/BlackScreenIntro";
// import { BriefingModal, SignUpModal } from "@/components/TeaserModals";
// import { ArrowUpRight, RotateCcw } from "lucide-react";

export default function Home() {
  // Default is WHITE / Light theme as requested (can be toggled to dark anytime)
  const [isDark, setIsDark] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeSector, setActiveSector] = useState<number | null>(null);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("contact@steamandgrain.tech");
      try {
        soundEngine.playClick("click");
      } catch {}
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sectors = [
    {
      id: "agri",
      icon: Wheat,
      name: "Agri-Tech",
      tagline: "Precision Grain & Crop Science",
      color: "amber",
      borderDark: "border-amber-400/30 hover:border-amber-400/80 hover:bg-amber-400/10",
      borderLight: "border-amber-200 hover:border-amber-400 hover:bg-amber-50/80",
      textDark: "text-amber-400",
      textLight: "text-amber-700",
    },
    {
      id: "dairy",
      icon: Milk,
      name: "Dairy-Tech",
      tagline: "Smart Processing & Cold Chain",
      color: "sky",
      borderDark: "border-sky-400/30 hover:border-sky-400/80 hover:bg-sky-400/10",
      borderLight: "border-sky-200 hover:border-sky-400 hover:bg-sky-50/80",
      textDark: "text-sky-400",
      textLight: "text-sky-700",
    },
    {
      id: "aqua",
      icon: Waves,
      name: "Aqua-Tech",
      tagline: "Aquatic Intelligence & Biomass",
      color: "emerald",
      borderDark: "border-emerald-400/30 hover:border-emerald-400/80 hover:bg-emerald-400/10",
      borderLight: "border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/80",
      textDark: "text-emerald-400",
      textLight: "text-emerald-700",
    },
  ];

  return (
    <div
      className={`relative min-h-screen w-full overflow-x-hidden transition-colors duration-700 flex flex-col justify-between ${
        isDark ? "bg-[#090b10] text-slate-100" : "bg-[#f8fafc] text-slate-900"
      }`}
    >
      {/* 1. INTERACTIVE SHIMMERING DOTTED GRID CANVAS (PURE SMOOTH DOT GLOW WITH SLATE-BLUE & LOGO-GOLD GRADIENT) */}
      <InteractiveDottedGrid isDark={isDark} />

      {/* Subtle luxury ambient dual-gradient background glows (Slate-Blue & Logo-Gold) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 z-[1]"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(30, 58, 138, 0.20), transparent 70%), radial-gradient(ellipse 65% 45% at 50% 28%, rgba(245, 158, 11, 0.10), transparent 65%)"
            : "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(56, 189, 248, 0.08), transparent 70%), radial-gradient(ellipse 65% 45% at 50% 28%, rgba(217, 119, 6, 0.045), transparent 65%)",
        }}
      />

      {/* ======================================================================= */}
      {/* TOP HEADER: BRAND STATUS & THEME SWITCHER                              */}
      {/* ======================================================================= */}
      <header className="relative z-20 w-full px-4 sm:px-12 md:px-16 pt-5 sm:pt-8 pb-3 sm:pb-4 flex items-center justify-between">
        {/* Subtle Brand Tag */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span
            className={`text-xs font-logo tracking-widest uppercase font-semibold ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            STEM &amp; GRAIN
          </span>
          <span
            className={`hidden sm:inline-block text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-medium border ${
              isDark
                ? "bg-white/[0.04] border-white/10 text-slate-400"
                : "bg-slate-100 border-slate-200 text-slate-600"
            }`}
          >
            Private Portal
          </span>
        </div>

        {/* Theme Toggle (Default White -> Dark mode toggleable) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsDark(!isDark)}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
            className={`group flex items-center space-x-1.5 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-[11px] sm:text-xs font-logo tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              isDark
                ? "bg-white/[0.05] border-white/20 text-slate-300 hover:bg-white/10 hover:border-amber-400/60 hover:text-white"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 shadow-sm"
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700 transition-transform duration-300 group-hover:-rotate-12" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ======================================================================= */}
      {/* MAIN VIEW: MASSIVE LOGO & "UNDER CONSTRUCTION" HERO                    */}
      {/* ======================================================================= */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 flex-1 flex flex-col items-center justify-center text-center py-3 sm:py-6">
        {/* 1. HUGE PROMINENT BRAND LOGO WITH SMOOTH 3D TILT */}
        <div className="w-full flex items-center justify-center mt-2 sm:mt-6 mb-1.5 sm:mb-2 transition-transform duration-500">
          <AnimatedLogo
            isDark={isDark}
            size="massive"
            align="center"
            className="drop-shadow-lg"
          />
        </div>

        {/* 2. REFINED LUXURY DIVIDER WITH GOLD ACCENT */}
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 my-1.5 sm:my-2 w-full max-w-[200px] sm:max-w-md mx-auto">
          <div
            className={`h-[1px] flex-1 ${
              isDark
                ? "bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
                : "bg-gradient-to-r from-transparent via-slate-300 to-transparent"
            }`}
          />
          <span
            className={`text-xs tracking-widest font-serif ${
              isDark ? "text-amber-400" : "text-amber-600"
            }`}
          >
            ◈
          </span>
          <div
            className={`h-[1px] flex-1 ${
              isDark
                ? "bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
                : "bg-gradient-to-r from-transparent via-slate-300 to-transparent"
            }`}
          />
        </div>

        {/* 3. HERO CONTENT SECTION (CLEAN, SOBER & PROFESSIONAL) */}
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 flex flex-col items-center text-center mt-2 sm:mt-4 mb-4 sm:mb-6">
          {/* Paragraph 1: Headline / Core Vision */}
          <h1
            className={`text-[17px] xs:text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] font-bold tracking-tight leading-snug sm:leading-relaxed transition-colors duration-500 mb-3.5 sm:mb-5 max-w-4xl mx-auto ${
              isDark
                ? "text-slate-100 drop-shadow-[0_4px_30px_rgba(255,255,255,0.08)]"
                : "text-slate-900"
            }`}
          >
            <span className="block mb-1 sm:mb-1.5 font-medium">
              Unique, high-tech and advanced
            </span>
            <span className="block sm:whitespace-nowrap">
              technologies in{" "}
              <span
                className={`font-extrabold ${
                  isDark ? "text-amber-400" : "text-amber-600"
                }`}
              >
                Agri, Dairy and Aqua
              </span>{" "}
              <span className="inline-block sm:inline">sectors are on the way.</span>
            </span>
          </h1>

          {/* 3 Interactive High-Tech Sector Pillars (Agri, Dairy, Aqua) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 w-full max-w-3xl my-1.5 sm:my-2 mb-3.5 sm:mb-5">
            {sectors.map((sector, idx) => {
              const Icon = sector.icon;
              const isActive = activeSector === idx;
              return (
                <div
                  key={sector.id}
                  onMouseEnter={() => {
                    setActiveSector(idx);
                    try { soundEngine.playClick("click"); } catch {}
                  }}
                  onMouseLeave={() => setActiveSector(null)}
                  className={`group relative p-3 sm:p-4 rounded-xl border text-left transition-all duration-300 cursor-default backdrop-blur-md ${
                    isDark
                      ? `bg-white/[0.03] ${sector.borderDark} ${isActive ? "bg-white/[0.06] shadow-[0_0_25px_rgba(245,158,11,0.12)] scale-[1.01]" : "border-white/10"}`
                      : `bg-white/80 ${sector.borderLight} ${isActive ? "bg-white shadow-md scale-[1.01]" : "border-slate-200/90"}`
                  }`}
                >
                  <div className="flex items-center space-x-2.5 mb-1 sm:mb-1.5">
                    <div
                      className={`p-1.5 rounded-lg border ${
                        isDark ? "bg-white/[0.05] border-white/10" : "bg-slate-100/80 border-slate-200"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isDark ? sector.textDark : sector.textLight}`} />
                    </div>
                    <span
                      className={`text-xs font-logo uppercase tracking-wider font-bold ${
                        isDark ? sector.textDark : sector.textLight
                      }`}
                    >
                      {sector.name}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] leading-snug font-medium ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {sector.tagline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Paragraph 2: Launch Announcement (Clean text, no stars) */}
          <div className="flex items-center justify-center space-x-2.5 sm:space-x-3 my-2 sm:my-3 mb-3 sm:mb-5">
            <div className={`h-[1px] w-6 sm:w-14 ${isDark ? "bg-amber-400/25" : "bg-slate-300"}`} />
            <p
              className={`text-[11px] xs:text-xs sm:text-sm font-logo uppercase tracking-[0.14em] sm:tracking-[0.22em] font-semibold transition-colors duration-500 ${
                isDark ? "text-amber-300/90" : "text-amber-700/90"
              }`}
            >
              Our brand new website is launching shortly.
            </p>
            <div className={`h-[1px] w-6 sm:w-14 ${isDark ? "bg-amber-400/25" : "bg-slate-300"}`} />
          </div>

          {/* Paragraph 3: Sober, Executive Notification & Contact Card (No input field) */}
          <div
            className={`w-full max-w-2xl mx-auto px-4 py-3 sm:px-6 sm:py-4.5 rounded-2xl border transition-all duration-300 backdrop-blur-xl ${
              isDark
                ? "bg-white/[0.03] border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:border-amber-400/30"
                : "bg-white/80 border-slate-200/90 shadow-sm hover:border-slate-300"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 sm:gap-4 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                <div
                  className={`p-2 sm:p-2.5 rounded-xl border flex-shrink-0 ${
                    isDark
                      ? "bg-amber-400/10 border-amber-400/20 text-amber-400"
                      : "bg-amber-50 border-amber-200 text-amber-700"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p
                    className={`text-xs sm:text-sm font-semibold tracking-wide ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    Want to be the first to know?
                  </p>
                  <p
                    className={`text-[11px] sm:text-xs leading-relaxed mt-0.5 ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Drop your email at{" "}
                    <a
                      href="mailto:contact@steamandgrain.tech"
                      className={`font-semibold underline underline-offset-2 break-all transition-colors ${
                        isDark
                          ? "text-amber-400 hover:text-amber-300"
                          : "text-amber-700 hover:text-amber-800"
                      }`}
                    >
                      contact@steamandgrain.tech
                    </a>{" "}
                    and we&apos;ll notify you the moment we launch.
                  </p>
                </div>
              </div>

              {/* Quick One-Click Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`w-full sm:w-auto justify-center flex items-center space-x-1.5 px-4 py-2 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  copied
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : isDark
                    ? "bg-white/[0.05] border-white/10 text-slate-300 hover:bg-white/10 hover:border-amber-400/40 hover:text-white"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4. LUXURY STATUS PILL BADGE */}
        <div
          className={`inline-flex items-center justify-center space-x-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border text-[11px] sm:text-xs font-logo tracking-widest uppercase transition-all duration-300 mx-auto mt-3 sm:mt-0 mb-4 sm:mb-2 ${
            isDark
              ? "bg-white/[0.04] border-amber-500/30 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              : "bg-white/80 border-slate-200 text-slate-800 shadow-sm backdrop-blur-sm"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Crafting In Progress • Stay Tuned</span>
        </div>
      </main>

      {/* ======================================================================= */}
      {/* FOOTER: MINIMALIST BRANDING & TECH GRID                                */}
      {/* ======================================================================= */}
      <footer className="relative z-20 w-full px-4 sm:px-12 md:px-16 pb-12 sm:pb-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center sm:text-left">
        {/* Brand Copyright */}
        <div
          className={`font-logo tracking-widest uppercase ${
            isDark ? "text-slate-500" : "text-slate-500"
          }`}
        >
          &copy; 2026 STEM &amp; GRAIN. ALL RIGHTS RESERVED.
        </div>

        {/* Tech Dot Matrix Grid (As in original design) */}
        <div className="flex flex-col space-y-1.5 opacity-40 hover:opacity-80 transition-opacity">
          {Array.from({ length: 3 }).map((_, row) => (
            <div key={row} className="flex space-x-2">
              {Array.from({ length: 12 }).map((_, col) => (
                <span
                  key={col}
                  className={`w-1 h-1 rounded-full ${
                    isDark ? "bg-slate-400" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </footer>

      {/* ======================================================================= */}
      {/* PREVIOUS FULL INTERACTIVE GATEWAY & LANDING PAGE (COMMENTED OUT)       */}
      {/* To restore everything back, simply un-comment this entire block below! */}
      {/* ======================================================================= */}
      {/*
      <div className="previous-code-preserved-for-future-use">
        {/* 1. BLACK SCREEN INTRO GATEWAY (Center Logo + Slider) */}
      {/*
        {!isRevealed && (
          <BlackScreenIntro onReveal={() => setIsRevealed(true)} />
        )}
        */}

      {/* 2. MAIN LANDING PAGE (REVEALED AFTER SLIDER) */}
      {/* 3D Animated Ribbon Vector Soundwave matching reference */}
      {/* <RibbonWaveCanvas isDark={isDark} /> */}

      {/* Floating Gradient Planetary Spheres / Orbs */}
      {/* <FloatingSpheres isDark={isDark} /> */}

      {/* TOP NAVIGATION BAR */}
      {/*
        <header className="relative z-20 w-full px-6 sm:px-12 md:px-16 pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center">
            <AnimatedLogo
              isDark={isDark}
              size="header"
              onClick={() => setIsBriefingOpen(true)}
            />
          </div>

          <div className="flex items-center space-x-4 sm:space-x-8">
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-12 text-sm sm:text-base font-logo tracking-widest uppercase">
              <button
                onClick={() => setIsBriefingOpen(true)}
                className={`transition-colors cursor-pointer ${
                  isDark ? "text-zinc-300 hover:text-white" : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                HOME
              </button>
              <button
                onClick={() => setIsBriefingOpen(true)}
                className={`transition-colors cursor-pointer ${
                  isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                ABOUT US
              </button>
              <button
                onClick={() => setIsBriefingOpen(true)}
                className={`transition-colors cursor-pointer ${
                  isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                GALLERY
              </button>
              <button
                onClick={() => setIsSignUpOpen(true)}
                className={`transition-colors cursor-pointer ${
                  isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-950"
                }`}
              >
                CONTACT US
              </button>
            </nav>

            <button
              onClick={() => setIsBriefingOpen(true)}
              className={`pill-button px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-logo tracking-widest uppercase font-medium transition-all border cursor-pointer ${
                isDark
                  ? "bg-white/[0.03] border-white/30 text-white hover:bg-white/10 hover:border-white/60 shadow-sm shadow-white/5"
                  : "bg-zinc-900/[0.04] border-zinc-800 text-zinc-900 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              learn more
            </button>

            <button
              onClick={() => setIsRevealed(false)}
              title="Replay Intro Slider"
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-full border text-xs font-logo tracking-wider uppercase transition-all cursor-pointer ${
                isDark
                  ? "bg-white/[0.04] border-white/20 text-zinc-300 hover:text-white hover:border-amber-400/60"
                  : "bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span className="hidden lg:inline">REPLAY INTRO</span>
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                isDark
                  ? "bg-white/[0.06] border-white/20 text-amber-400 hover:bg-white/[0.12]"
                  : "bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>
        */}

      {/* HERO SECTION / CENTER TYPOGRAPHY */}
      {/*
        <main className="relative z-10 w-full px-6 sm:px-12 md:px-16 my-auto max-w-4xl">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-logo tracking-wide uppercase leading-[0.95] mb-6 drop-shadow-lg">
            <span className="block">Something Big</span>
            <span
              className={`block bg-clip-text text-transparent ${
                isDark
                  ? "bg-gradient-to-r from-white via-zinc-200 to-zinc-400"
                  : "bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-600"
              }`}
            >
              Is In The Making.
            </span>
          </h1>

          <p
            className={`text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-8 font-sans ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            A monumental standard is taking shape behind closed doors.
            Driven by relentless ambition, refined mastery, and an obsession with the extraordinary.
            The world will soon witness.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsBriefingOpen(true)}
              className={`px-7 py-3 rounded-full text-xs sm:text-sm font-logo tracking-widest uppercase font-semibold transition-all border flex items-center space-x-2.5 cursor-pointer ${
                isDark
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 border-amber-300/40 shadow-[0_0_24px_rgba(245,158,11,0.35)]"
                  : "bg-zinc-950 hover:bg-zinc-800 text-white border-zinc-900 shadow-md"
              }`}
            >
              <span>DISCOVER THE VISION</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsSignUpOpen(true)}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-logo tracking-widest uppercase font-medium transition-all border cursor-pointer ${
                isDark
                  ? "bg-white/[0.04] border-white/25 text-zinc-300 hover:bg-white/10 hover:text-white hover:border-white/50"
                  : "bg-white border-zinc-300 text-zinc-800 hover:bg-zinc-100"
              }`}
            >
              <span>REQUEST EXCLUSIVE ACCESS</span>
            </button>
          </div>
        </main>
        */}

      {/* FOOTER & BOTTOM RIGHT DOT MATRIX GRID */}
      {/*
        <footer className="relative z-20 w-full px-6 sm:px-12 md:px-16 pb-8 flex items-end justify-between">
          <div className="flex items-center space-x-2.5 text-xs font-logo tracking-widest uppercase opacity-80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>STEM & GRAIN</span>
          </div>

          <div className="flex flex-col space-y-1.5 opacity-40 hover:opacity-80 transition-opacity">
            {Array.from({ length: 4 }).map((_, row) => (
              <div key={row} className="flex space-x-2">
                {Array.from({ length: 14 }).map((_, col) => (
                  <span
                    key={col}
                    className={`w-1 h-1 rounded-full ${
                      isDark ? "bg-white" : "bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </footer>
        */}

      {/* Modals */}
      {/*
        <BriefingModal
          isOpen={isBriefingOpen}
          onClose={() => setIsBriefingOpen(false)}
          isDark={isDark}
        />
        <SignUpModal
          isOpen={isSignUpOpen}
          onClose={() => setIsSignUpOpen(false)}
          isDark={isDark}
        />
        */}
      {/* </div> */}
      {/* */}
    </div>
  );
}
