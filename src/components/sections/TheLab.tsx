import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { PROJECTS_DATA } from '../../data/projects';
import { ExternalLink, Terminal, Cpu, Lock } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { Magnetic } from '../common/Magnetic';

import { Badge } from '../ui/Badge';

interface TheLabProps {
  playHover: () => void;
  playClick: () => void;
}

export const TheLab: React.FC<TheLabProps> = ({ playHover, playClick }) => {
  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-hairline)] z-10 relative">
      <div id="projects" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <SectionHeader
        index="03"
        title="WORK"
        tag="[SELECTED WORK // EXPERIMENTS]"
        subtitle="Architectural proving ground. Planned experimental projects currently incubating in the laboratory."
      />

      {/* Lab Blueprint Notice */}
      <div className="mb-8 p-4 border border-cyan-500/20 bg-cyan-500/5 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400">
          <Terminal className="w-4 h-4" />
          <span>SCHEMA_MODE: DECOUPLED // DROP-IN ARCHITECTURE READY</span>
        </div>
        <span className="text-subdued text-[11px]">
          SRC: src/data/projects.ts
        </span>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {PROJECTS_DATA.map(project => {
          const isComingSoon = project.status === 'coming_soon';

          return (
            <div
              key={project.id}
              data-cursor={isComingSoon ? 'coming_soon' : 'link'}
              onMouseEnter={playHover}
              className="p-6 sm:p-8 border border-[var(--border-hairline)] bg-surface/30 hover:border-cyan-500/40 hover:bg-surface/60 transition-all rounded-xs relative group"
            >
              {/* Card Header Telemetry */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-bold tracking-wider text-sm">
                    {project.index} //
                  </span>
                  <span className="text-primary font-semibold tracking-wider">
                    {project.codename}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={isComingSoon ? 'neutral' : 'pulse'}>
                    {project.archId}
                  </Badge>
                  {isComingSoon ? (
                    <span className="flex items-center gap-1.5 text-amber-400/90 text-[11px]">
                      <Lock className="w-3.5 h-3.5" />
                      INCUBATING
                    </span>
                  ) : (
                    <span className="text-emerald-400 text-[11px] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-start">
                <div className="lg:col-span-8 space-y-3">
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-primary">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  {/* Planned Metrics */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="p-2 border border-[var(--border-hairline)] bg-surface/40 rounded-xs font-mono text-[10px]">
                          <span className="text-subdued block uppercase">{m.label}</span>
                          <span className="text-primary font-medium">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Schematic Node / Status Wireframe */}
                <div className="lg:col-span-4 p-4 border border-dashed border-[var(--border-hairline)] bg-surface/20 rounded-xs flex flex-col justify-between h-full font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-subdued text-[10px]">
                    <span>STATUS_LOG</span>
                    <span>{isComingSoon ? 'STANDBY' : 'DEPLOYED'}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center py-4 text-center space-y-2">
                    <Cpu className="w-8 h-8 text-cyan-400/40 group-hover:text-cyan-400/80 transition-colors" />
                    <span className="text-xs text-muted">
                      {isComingSoon ? 'PROTOTYPING IN PROGRESS' : 'ACTIVE BUILD'}
                    </span>
                    <span className="text-[10px] text-cyan-400 tracking-widest uppercase">
                      {isComingSoon ? '[ COMING SOON // 2025 ]' : '[ CODEBASE AVAILABLE ]'}
                    </span>
                  </div>

                  <div className="text-[10px] text-subdued border-t border-[var(--border-hairline)] pt-2 text-center">
                    SLOT RESERVED FOR SYSTEM ARTIFACT
                  </div>
                </div>
              </div>

              {/* Card Footer: Tech Tags & Potential Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-subdued uppercase tracking-wider mr-1">
                    TECH:
                  </span>
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-xs font-mono text-[10px] border border-[var(--border-hairline)] bg-surface/70 text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Dynamic Links (Shown if project has URLs dropped into projects.ts) */}
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <Magnetic strength={0.3}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        data-cursor="link"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-hairline)] text-primary hover:border-cyan-400 font-mono text-xs rounded-xs"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>CODE</span>
                      </a>

                    </Magnetic>
                  )}
                  {project.liveUrl && (
                    <Magnetic strength={0.3}>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        data-cursor="link"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-400 text-cyan-400 font-mono text-xs rounded-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>DEMO</span>
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
