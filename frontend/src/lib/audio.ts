// Web Audio API ambient soundscape generator and UI micro-interaction sound effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Futuristic UI click/beep/curtain sound
  public playClick(type: "click" | "success" | "whoosh" = "click") {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      } else if (type === "success") {
        // Grand Opening Chime
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.12); // E5
        osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.24); // G5
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(261.63, this.ctx.currentTime); // C4 warm base
        gain2.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

        osc.start();
        osc2.start();
        osc.stop(this.ctx.currentTime + 0.6);
        osc2.stop(this.ctx.currentTime + 0.8);
      } else if (type === "whoosh") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(140, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.4);
      }
    } catch {
      // Audio context policy
    }
  }

  // Cinematic Grand Reveal soundscape
  public playReveal() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Deep Sub-bass swell
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(65, now);
      subOsc.frequency.exponentialRampToValueAtTime(110, now + 0.3);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 1.2);
      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.2);

      // 2. Golden Harmonic Chimes (C-maj9: C5, E5, G5, B5, D6)
      const notes = [523.25, 659.25, 783.99, 987.77, 1174.66];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const noteOsc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        noteOsc.type = "sine";
        noteOsc.frequency.setValueAtTime(freq, now + idx * 0.08);

        const startTime = now + idx * 0.08;
        noteGain.gain.setValueAtTime(0.001, startTime);
        noteGain.gain.linearRampToValueAtTime(0.06, startTime + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.4);

        noteOsc.connect(noteGain);
        noteGain.connect(this.ctx.destination);
        noteOsc.start(startTime);
        noteOsc.stop(startTime + 1.4);
      });
    } catch {
      // Audio policy
    }
  }
}

export const soundEngine = new SoundEngine();
