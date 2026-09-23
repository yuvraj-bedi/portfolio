import React from 'react';

interface SectionHeaderProps {
  index: string; // e.g. "01"
  title: string; // e.g. "ABOUT"
  tag: string; // e.g. "[THE OPERATOR]"
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  title,
  tag,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`mb-12 border-b border-[var(--border-hairline)] pb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs sm:text-sm text-cyan-400 font-semibold tracking-widest">
            {index} //
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-primary uppercase">
            {title}
          </h2>
        </div>
        <div className="font-mono text-[11px] sm:text-xs text-subdued tracking-wider uppercase">
          {tag}
        </div>
      </div>
      {subtitle && (
        <p className="mt-3 text-sm text-muted max-w-2xl font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};
