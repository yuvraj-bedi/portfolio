import { useState, useEffect, useRef, useCallback } from 'react';

export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('yb_sound') === 'true';
    }
    return false; // Default OFF, never autoplay
  });

  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    localStorage.setItem('yb_sound', soundEnabled.toString());
  }, [soundEnabled]);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const toggleSound = useCallback(() => {
    initAudio();
    setSoundEnabled(prev => {
      const next = !prev;
      if (next && audioCtxRef.current) {
        // Play gentle confirmation chime
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      }
      return next;
    });
  }, [initAudio]);

  const playHover = useCallback(() => {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtxRef.current) return;

    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio context silenced or blocked
    }
  }, [soundEnabled, initAudio]);

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtxRef.current) return;

    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Silent error handling
    }
  }, [soundEnabled, initAudio]);

  return { soundEnabled, toggleSound, playHover, playClick };
}
