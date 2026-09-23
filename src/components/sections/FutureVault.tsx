import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { VAULT_SECTORS } from '../../data/futureVault';
import { Radio, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface FutureVaultProps {
  playHover: () => void;
  playClick: () => void;
}

export const FutureVault: React.FC<FutureVaultProps> = ({ playHover, playClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="vault" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-hairline)] z-10 relative">
      <SectionHeader
        index="06"
        title="THE VAULT"
        tag="[RESERVED ARCHIVES // FUTURE SIGNALS]"
        subtitle="Un-fabricated empty state for upcoming hackathon builds, certifications, research, and field dispatches."
      />

      {/* Primary Standby Radar Box */}
      <div className="p-6 sm:p-8 border border-[var(--border-hairline)] bg-surface/30 rounded-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-semibold text-primary tracking-wider uppercase">
              ARCHIVE_STATUS: STANDBY // ZERO FABRICATIONS
            </span>
          </div>
          <Badge variant="neutral">
            [ALLOCATION: 100% ACADEMIC RIGOR]
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3 font-sans text-xs sm:text-sm text-muted leading-relaxed">
            <p className="text-primary font-medium">
              Currently directing all computational bandwidth toward foundational Computer Science coursework, data structures, and system mechanics at Bennett University.
            </p>
            <p>
              In alignment with strict engineering honesty, this vault does not contain inflated statistics or placeholder awards. Verified hackathons, certifications, and research publications will be logged into these archival nodes as they are completed.
            </p>
          </div>

          <div className="md:col-span-4 flex justify-start md:justify-end">
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsOpen(!isOpen);
              }}
              onMouseEnter={playHover}
              data-cursor="action"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs border border-[var(--border-hairline)] bg-surface/70 hover:border-cyan-500/40 text-primary font-mono text-xs tracking-wider uppercase transition-colors"
            >
              <span>{isOpen ? 'COLLAPSE NODES' : 'INSPECT RESERVED SECTORS'}</span>
              {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Reserved Sectors */}
        {isOpen && (
          <div className="pt-6 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-200">
            {VAULT_SECTORS.map((sector, idx) => (
              <div
                key={idx}
                className="p-4 border border-dashed border-[var(--border-hairline)] bg-surface/20 rounded-xs space-y-2 font-mono text-xs"
              >
                <div className="flex items-center justify-between text-subdued text-[10px]">
                  <span>{sector.tag}</span>
                  <span className="text-amber-400/80">[STANDBY]</span>
                </div>
                <div className="text-primary font-semibold font-display text-sm">
                  {sector.title}
                </div>
                <p className="text-muted text-[11px] font-sans leading-relaxed">
                  {sector.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 font-mono text-[10px] text-subdued pt-2">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          <span>ZERO SPECULATIVE CREDENTIALS // STRICT VERIFICATION PROTOCOL</span>
        </div>
      </div>
    </section>
  );
};
