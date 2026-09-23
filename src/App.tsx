import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import { useSoundEffects } from './hooks/useSoundEffects';
import { BootLoader } from './components/sections/BootLoader';
import { CustomCursor } from './components/common/CustomCursor';
import { ParticlesCanvas } from './components/common/ParticlesCanvas';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { CurrentlyLearning } from './components/sections/CurrentlyLearning';
import { TheLab } from './components/sections/TheLab';
import { Stack } from './components/sections/Stack';
import { Timeline } from './components/sections/Timeline';
import { FutureVault } from './components/sections/FutureVault';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

export function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { soundEnabled, toggleSound, playHover, playClick } = useSoundEffects();
  const [, setBooted] = useState(false);

  // Initialize Lenis Smooth Scroll (respects prefers-reduced-motion)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-canvas text-primary selection:bg-cyan-500/25 selection:text-cyan-300 font-sans transition-colors duration-400">
      {/* 00 // Boot Sequence Telemetry Screen */}
      <BootLoader onComplete={() => setBooted(true)} playClick={playClick} />

      {/* Contextual Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Background Subtle Particle Network */}
      <ParticlesCanvas isDark={isDark} />

      {/* Architectural Grid Watermark */}
      <div className="fixed inset-0 lab-grid-pattern opacity-40 pointer-events-none z-0" aria-hidden="true" />

      {/* Fixed HUD Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        playHover={playHover}
        playClick={playClick}
      />

      {/* Main Observatory Content Stream */}
      <main className="relative z-10">
        <Hero isDark={isDark} playHover={playHover} playClick={playClick} />
        <About playHover={playHover} />
        <TheLab playHover={playHover} playClick={playClick} />
        <CurrentlyLearning playHover={playHover} />
        <Stack playHover={playHover} />
        <Timeline playHover={playHover} />
        <FutureVault playHover={playHover} playClick={playClick} />
        <Contact playHover={playHover} playClick={playClick} />
      </main>

      {/* System Telemetry Footer */}
      <Footer playHover={playHover} playClick={playClick} />
    </div>
  );
}

export default App;
