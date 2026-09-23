import React from 'react';
import { ArrowDownRight, Terminal } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personal';
import { LatticeCanvas } from '../3d/LatticeCanvas';
import { Magnetic } from '../common/Magnetic';
import { Badge } from '../ui/Badge';

interface HeroProps {
  isDark: boolean;
  playHover: () => void;
  playClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isDark, playHover, playClick }) => {
  return (
    <section
      id="intro"
      className="relative min-h-[90vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
    >
      <div id="hero" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      {/* Top Telemetry Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-3">
          <Badge variant="cyan">[SYS.INIT: 2025.BU]</Badge>
          <span className="text-subdued hidden sm:inline">
            COORDS: {PERSONAL_DATA.coordinates}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="pulse">{PERSONAL_DATA.currentYear} CSE</Badge>
          <span className="text-subdued hidden md:inline">
            TIMELINE: {PERSONAL_DATA.timeline}
          </span>
        </div>
      </div>

      {/* Hero Body: Grid with Typography & 3D Lattice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center my-auto py-10">
        {/* Left Column: Monumental Identity & Statement (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 tracking-widest uppercase">
              <Terminal className="w-3.5 h-3.5" />
              <span>THE OBSERVATORY // DIGITAL PROVING GROUND</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary leading-[0.95] uppercase">
              Yuvraj
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-cyan-400">
                Bedi
              </span>
            </h1>
          </div>

          <div className="space-y-4 max-w-xl">
            <p className="font-display text-lg sm:text-xl md:text-2xl text-primary font-medium tracking-tight">
              Computer Science Undergraduate & Systems Explorer at Bennett University.
            </p>
            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
              Building disciplined computational muscle across C++, Java, Data Structures, and modern web environments. Approaching software as an active experimental laboratory.
            </p>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Magnetic strength={0.3}>
              <a
                href="#work"
                onMouseEnter={playHover}
                onClick={playClick}
                data-cursor="explore"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xs bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 font-mono text-xs tracking-wider uppercase hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.15)]"
              >
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#connect"
                onMouseEnter={playHover}
                onClick={playClick}
                data-cursor="link"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xs border border-[var(--border-hairline)] bg-surface/50 text-muted font-mono text-xs tracking-wider uppercase hover:text-primary hover:border-cyan-500/30 transition-all"
              >
                <span>CONNECT</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Interactive 3D Algorithmic Lattice (5 Cols) */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div className="w-full relative">
            {/* Ambient Background Glow Behind 3D Mesh */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <LatticeCanvas isDark={isDark} />
            <div className="text-center font-mono text-[10px] text-subdued tracking-widest mt-2 uppercase">
              [ NODE: ALGORITHMIC_LATTICE // INTERACTIVE ]
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[var(--border-hairline)] pt-4 font-mono text-[11px] text-subdued">
        <div>
          <span className="block text-[9px] uppercase tracking-widest text-muted">INSTITUTION</span>
          <span className="text-primary font-medium">{PERSONAL_DATA.institution}</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-widest text-muted">ACADEMIC PHASE</span>
          <span className="text-cyan-400">{PERSONAL_DATA.currentYear} (CSE)</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-widest text-muted">DEGREE BATCH</span>
          <span className="text-primary">{PERSONAL_DATA.timeline}</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-widest text-muted">SYSTEM STATUS</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            OPERATIONAL
          </span>
        </div>
      </div>
    </section>
  );
};
