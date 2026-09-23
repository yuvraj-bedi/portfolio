import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { LEARNING_ITEMS } from '../../data/learning';
import { Radio, Search, CheckCircle2, Sparkles } from 'lucide-react';

interface CurrentlyLearningProps {
  playHover: () => void;
}

export const CurrentlyLearning: React.FC<CurrentlyLearningProps> = ({ playHover }) => {
  const coreItems = LEARNING_ITEMS.filter(item => item.domain === 'core');
  const exploratoryItems = LEARNING_ITEMS.filter(item => item.domain === 'exploratory');

  return (
    <section id="lab" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-hairline)] z-10 relative">
      <div id="learning" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <div id="radar" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <SectionHeader
        index="04"
        title="LAB"
        tag="[ACTIVE RADAR // RESEARCH INQUIRY]"
        subtitle="Transparent partition between daily committed academic practice and exploratory research inquiries."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Rigor Panel */}
        <div className="border border-[var(--border-hairline)] bg-surface/30 p-6 sm:p-8 rounded-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-primary">
                CORE RIGOR // ACTIVE DISCIPLINE
              </h3>
            </div>
            <span className="font-mono text-[10px] text-cyan-400 tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded-xs border border-cyan-500/20">
              COMMITTED
            </span>
          </div>

          <p className="text-xs text-muted leading-relaxed font-sans">
            High-intensity university coursework and daily hands-on implementation. Building intuition from syntax to architectural patterns.
          </p>

          <div className="space-y-4">
            {coreItems.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={playHover}
                className="p-4 border border-[var(--border-hairline)] bg-surface/50 hover:border-cyan-500/30 transition-all rounded-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-xs font-semibold text-primary">{item.name}</span>
                  </div>
                  <span className="font-mono text-[9px] text-subdued uppercase">[{item.tag}]</span>
                </div>
                <p className="text-xs text-muted font-sans pl-6">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-2 font-mono text-[10px] text-subdued border-t border-[var(--border-hairline)]">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>DAILY DELIBERATE PRACTICE &amp; BENCHMARKING</span>
          </div>
        </div>

        {/* Exploratory Inquiry Panel */}
        <div className="border border-[var(--border-hairline)] bg-surface/30 p-6 sm:p-8 rounded-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-primary">
                EXPLORATORY INQUIRY // RESEARCH
              </h3>
            </div>
            <span className="font-mono text-[10px] text-amber-400 tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-xs border border-amber-500/20">
              EXPLORING
            </span>
          </div>

          <p className="text-xs text-muted leading-relaxed font-sans">
            Domains of active curiosity and literature review. Investigating concepts and architectural prototypes without false claims of mastery.
          </p>

          <div className="space-y-4">
            {exploratoryItems.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={playHover}
                className="p-4 border border-[var(--border-hairline)] bg-surface/50 hover:border-amber-500/30 transition-all rounded-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-xs font-semibold text-primary">{item.name}</span>
                  </div>
                  <span className="font-mono text-[9px] text-subdued uppercase">[{item.tag}]</span>
                </div>
                <p className="text-xs text-muted font-sans pl-6">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 border border-amber-500/20 bg-amber-500/5 rounded-xs text-[11px] font-mono text-muted flex items-start gap-2">
            <span className="text-amber-400 font-bold">NOTE:</span>
            <span>
              Explicitly categorizing these as exploratory interests in AI/ML fundamentals rather than professional expertise.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
