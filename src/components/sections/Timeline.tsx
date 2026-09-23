import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { TIMELINE_DATA } from '../../data/timeline';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface TimelineProps {
  playHover: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({ playHover }) => {
  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-hairline)] z-10 relative">
      <div id="timeline" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <SectionHeader
        index="05"
        title="JOURNEY"
        tag="[ACADEMIC TELEMETRY // EDUCATION]"
        subtitle="Chronological milestones and current academic roadmap at Bennett University."
      />

      <div className="space-y-8">
        {TIMELINE_DATA.map((milestone, idx) => (
          <div
            key={idx}
            onMouseEnter={playHover}
            className="p-6 sm:p-8 border border-[var(--border-hairline)] bg-surface/30 rounded-xs space-y-6 hover:border-cyan-500/30 transition-all"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-hairline)] pb-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span className="font-display font-bold text-lg sm:text-xl text-primary tracking-tight">
                  {milestone.institution.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="cyan">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {milestone.yearRange}
                </Badge>
                <Badge variant="pulse">
                  {milestone.currentStatus}
                </Badge>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-display font-semibold text-primary text-base sm:text-lg">
                  {milestone.degree}
                </span>
                <span className="font-mono text-xs text-subdued flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {milestone.coordinates}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                {milestone.description}
              </p>

              {/* Coursework Focus Matrix */}
              <div className="pt-4 border-t border-[var(--border-hairline)] space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-subdued uppercase">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>KEY COURSEWORK &amp; THEORETICAL MODULES:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {milestone.coursework.map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-2.5 py-1 text-[11px] font-mono border border-[var(--border-hairline)] bg-surface/60 rounded-xs text-muted"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
