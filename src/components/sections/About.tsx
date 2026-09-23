import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { PERSONAL_DATA } from '../../data/personal';
import { Cpu, Terminal, Compass, Layers } from 'lucide-react';

interface AboutProps {
  playHover: () => void;
}

export const About: React.FC<AboutProps> = ({ playHover }) => {
  const pillars = [
    {
      icon: Terminal,
      title: "Core Computational Rigor",
      desc: "Deliberate focus on low-level memory mechanics, pointers, and performance-critical systems in C++.",
    },
    {
      icon: Layers,
      title: "Object-Oriented Modeling",
      desc: "Decomposing complex architectures into modular, extensible object structures using Java.",
    },
    {
      icon: Compass,
      title: "Algorithmic Precision",
      desc: "Continuous problem solving across trees, graphs, sorting, and asymptotic time-space analysis.",
    },
    {
      icon: Cpu,
      title: "Mathematical Foundations",
      desc: "Grounded in Discrete Mathematics, Linear Algebra, and Probability theory essential for computational logic.",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-hairline)] z-10 relative">
      <SectionHeader
        index="02"
        title="ABOUT"
        tag="[THE OPERATOR // PERSPECTIVE]"
        subtitle="A candid look into my engineering philosophy, academic journey, and computational curiosities."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Metadata Telemetry (4 cols) */}
        <div className="lg:col-span-4 space-y-6 font-mono text-xs">
          <div className="p-5 border border-[var(--border-hairline)] bg-surface/40 rounded-xs space-y-3">
            <div className="text-cyan-400 font-bold tracking-widest">[SYSTEM_SPECS // OPERATOR]</div>
            <div className="space-y-2 text-subdued border-t border-[var(--border-hairline)] pt-3">
              <div className="flex justify-between">
                <span>IDENTITY:</span>
                <span className="text-primary">{PERSONAL_DATA.name}</span>
              </div>
              <div className="flex justify-between">
                <span>EDUCATION:</span>
                <span className="text-primary">Bennett University</span>
              </div>
              <div className="flex justify-between">
                <span>DEGREE:</span>
                <span className="text-primary">B.Tech CSE (2025–2029)</span>
              </div>
              <div className="flex justify-between">
                <span>CURRENT PHASE:</span>
                <span className="text-cyan-400">Year 02 / Active</span>
              </div>
              <div className="flex justify-between">
                <span>DISCIPLINE:</span>
                <span className="text-primary">Software & Systems</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-[var(--border-hairline)]/60 bg-surface/20 rounded-xs text-subdued text-[11px] leading-relaxed">
            <span className="text-muted block mb-1 font-bold">[LAB_NOTE]</span>
            "No inflated claims or artificial titles. Just a driven 2nd-year CS student dedicating deliberate hours to the foundational architecture of computation."
          </div>
        </div>

        {/* Right Column: Editorial Essay & Pillars (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-5 text-base sm:text-lg font-sans text-muted leading-relaxed">
            <p className="text-primary font-display text-xl sm:text-2xl leading-snug">
              I treat software not merely as code execution, but as an experimental proving ground—investigating how discrete logic scales into resilient digital environments.
            </p>
            <p>
              Currently in my second year of Computer Science Engineering at <span className="text-primary font-medium">Bennett University</span>, my time is focused on building foundational depth before chasing surface-level abstractions. That means mastering memory allocation in C++, decomposing complex state in Java, and practicing algorithmic problem solving on a daily basis.
            </p>
            <p>
              I am intrigued by the harmony between low-level performance and elegant, reactive user interfaces. In parallel to core coursework, I explore modern web technologies and actively investigate how applied machine learning and artificial intelligence can enhance computational workflows.
            </p>
          </div>

          {/* Core Academic & Technical Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-hairline)]">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={playHover}
                  className="p-5 border border-[var(--border-hairline)] bg-surface/30 hover:border-cyan-500/30 hover:bg-surface/60 transition-all rounded-xs space-y-2 group"
                >
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                    <Icon className="w-4 h-4" />
                    <span className="tracking-wider uppercase font-semibold">{pillar.title}</span>
                  </div>
                  <p className="text-xs font-sans text-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
