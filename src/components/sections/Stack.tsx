import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { SKILL_GROUPS } from '../../data/skills';
import { Terminal, Database, Code, Wrench, Binary } from 'lucide-react';

interface StackProps {
  playHover: () => void;
}

export const Stack: React.FC<StackProps> = ({ playHover }) => {
  const getIcon = (tag: string) => {
    switch (tag) {
      case 'SYS_CORE':
        return Code;
      case 'WEB_FRONT':
        return Terminal;
      case 'DATA_LAYER':
        return Database;
      case 'ENV_TOOLING':
        return Wrench;
      default:
        return Binary;
    }
  };

  return (
    <section id="stack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-hairline)] z-10 relative">
      <SectionHeader
        index="SYS"
        title="INSTRUMENTATION"
        tag="[STACK // CAPABILITIES]"
        subtitle="Hardware and software tooling actively employed in coursework and systems experimentation."
      />

      <div className="space-y-6">
        {SKILL_GROUPS.map((group, idx) => {
          const Icon = getIcon(group.tag);

          return (
            <div
              key={idx}
              className="p-6 sm:p-8 border border-[var(--border-hairline)] bg-surface/30 rounded-xs space-y-4 hover:border-cyan-500/30 transition-all"
            >
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-3">
                <div className="flex items-center gap-2.5 text-primary font-display font-semibold text-sm sm:text-base tracking-wide uppercase">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{group.category}</span>
                </div>
                <span className="font-mono text-[10px] text-subdued uppercase tracking-widest">
                  [{group.tag}]
                </span>
              </div>

              {/* Skills Pills Matrix (No fake percentage bars) */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    onMouseEnter={playHover}
                    data-cursor="action"
                    className="group flex items-center gap-2 px-3.5 py-2 rounded-xs border border-[var(--border-hairline)] bg-surface/70 hover:border-cyan-400 hover:bg-cyan-500/5 transition-all cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 transition-colors" />
                    <span className="font-mono text-xs sm:text-sm text-primary tracking-wide">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Philosophical Note on Skills */}
      <div className="mt-8 p-4 border border-[var(--border-hairline)] bg-surface/20 rounded-xs flex items-center justify-between font-mono text-[11px] text-subdued">
        <span>[POLICY // PROFICIENCY]</span>
        <span className="text-right">
          Proficiency is demonstrated through engineering output, not arbitrary percentage bars.
        </span>
      </div>
    </section>
  );
};
