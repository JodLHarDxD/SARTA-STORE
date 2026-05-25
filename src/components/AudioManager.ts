/**
 * SARTA Atmospheric Audio Manager
 * Synthesises pure, high-end luxury ambient soundscapes in real-time.
 * 100% client-side Web Audio API — zero heavy asset downloads, zero network lag.
 */

class AudioManager {
  private ctx: AudioContext | null = null;
  private primaryOsc: OscillatorNode | null = null;
  private secondaryOsc: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  private isInitialized = false;
  private isAudioPlaying = false;
  private muted = true;

  public isPlaying(): boolean {
    return this.isAudioPlaying;
  }

  // Track target frequencies for smooth interpolation
  private targetFilterFreq = 320;
  private currentFilterFreq = 320;
  private animationFrameId: number | null = null;

  constructor() {
    // Check if running in browser
    if (typeof window !== "undefined") {
      this.muted = localStorage.getItem("sarta-muted") !== "false";
    }
  }

  public init() {
    if (this.isInitialized) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
      this.setupSynth();
      this.startInterpolationLoop();
    } catch (e) {
      console.warn("Web Audio API not supported in this browser:", e);
    }
  }

  private setupSynth() {
    if (!this.ctx) return;

    const ctx = this.ctx;

    // 1. Create Nodes
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, ctx.currentTime);

    this.filter = ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(320, ctx.currentTime);
    this.filter.Q.setValueAtTime(2.5, ctx.currentTime); // Subtle resonance bump

    // 2. Detuned Double Oscillators (Triangle waves for warm woodwinds/organ feel)
    this.primaryOsc = ctx.createOscillator();
    this.primaryOsc.type = "triangle";
    this.primaryOsc.frequency.setValueAtTime(110, ctx.currentTime); // A2

    this.secondaryOsc = ctx.createOscillator();
    this.secondaryOsc.type = "sine";
    this.secondaryOsc.frequency.setValueAtTime(165, ctx.currentTime); // E3 (fifth interval)
    this.secondaryOsc.detune.setValueAtTime(8, ctx.currentTime); // Slight organic detune

    // 3. Evolving LFO (Low-Frequency Oscillator) to pulse the sound gently
    this.lfo = ctx.createOscillator();
    this.lfo.type = "sine";
    this.lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // Evolving 12-second cycle

    this.lfoGain = ctx.createGain();
    this.lfoGain.gain.setValueAtTime(40, ctx.currentTime); // Modulate filter up/down by 40Hz

    // 4. Connection Network
    // Oscillators -> Filter -> Master Gain -> Destination
    this.primaryOsc.connect(this.filter);
    this.secondaryOsc.connect(this.filter);
    this.filter.connect(this.masterGain);
    this.masterGain.connect(ctx.destination);

    // LFO -> Filter frequency modulation
    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filter.frequency);

    // 5. Ignite Sources
    this.primaryOsc.start();
    this.secondaryOsc.start();
    this.lfo.start();
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("sarta-muted", String(muted));
    }

    if (muted) {
      this.fadeTo(0, 0.8);
    } else {
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      this.fadeTo(0.12, 1.2); // Soft ambient volume level
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public play() {
    this.init();
    if (!this.muted) {
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      this.fadeTo(0.12, 1.5);
    }
    this.isAudioPlaying = true;
  }

  public stop() {
    this.fadeTo(0, 0.5);
    this.isAudioPlaying = false;
  }

  private fadeTo(targetVolume: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.linearRampToValueAtTime(targetVolume, now + duration);
  }

  /**
   * Modulate synthesiser parameters in response to cursor position & scroll.
   * Creates the signature Indigo Laboratory "tactile sensory feedback" effect.
   */
  public update(clientX: number, clientY: number, scrollY: number) {
    if (!this.isInitialized || this.muted || !this.ctx || !this.filter || !this.secondaryOsc) return;

    const width = typeof window !== "undefined" ? window.innerWidth : 1920;
    const height = typeof window !== "undefined" ? window.innerHeight : 1080;

    // Normalise coordinates 0.0 - 1.0
    const normX = Math.min(Math.max(clientX / width, 0), 1);
    const normY = Math.min(Math.max(clientY / height, 0), 1);
    const scrollFactor = Math.min(scrollY / 3000, 1);

    // Target a smooth lowpass cutoff frequency (120Hz to 680Hz)
    // Vertical mouse position controls base frequency, scrolling elevates it
    this.targetFilterFreq = 160 + normY * 340 + scrollFactor * 220;

    // Horizontal mouse position modulates detune (organ grit/richness)
    const targetDetune = 3 + normX * 22;
    this.secondaryOsc.detune.setTargetAtTime(targetDetune, this.ctx.currentTime, 0.3);
  }

  /**
   * Animates the filter cutoff smoothly to prevent pops or rough transitions
   */
  private startInterpolationLoop() {
    const interpolate = () => {
      if (this.ctx && this.filter && !this.muted) {
        // Easing interpolation formula: Current = Current + (Target - Current) * EaseFactor
        this.currentFilterFreq += (this.targetFilterFreq - this.currentFilterFreq) * 0.06;
        this.filter.frequency.setValueAtTime(this.currentFilterFreq, this.ctx.currentTime);
      }
      this.animationFrameId = requestAnimationFrame(interpolate);
    };
    this.animationFrameId = requestAnimationFrame(interpolate);
  }

  /**
   * Premium micro-audio plink/tick.
   * Simulates the feeling of a refined metal switch.
   */
  public tick() {
    if (!this.isInitialized || this.muted || !this.ctx) return;

    try {
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // Extremely high-end, clean woodblock click (1200Hz cascading down)
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, ctx.currentTime); // Ultra-quiet
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Audio context might be restricted, silence error
    }
  }

  public destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.isInitialized = false;
  }
}

export const sartaAudio = new AudioManager();
