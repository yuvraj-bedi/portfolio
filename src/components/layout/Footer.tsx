import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personal';
import { Magnetic } from '../common/Magnetic';

interface FooterProps {
  playHover: () => void;
  playClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ playHover, playClick }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as IST / UTC+05:30
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(now.toLocaleTimeString('en-US', options) + ' IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-hairline)] bg-surface/30 backdrop-blur-xs py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-xs text-subdued">
        {/* Left: Identity and institution */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-primary font-display font-semibold tracking-wider">
            <span>{PERSONAL_DATA.name.toUpperCase()}</span>
            <span className="text-subdued font-mono text-[10px]">({PERSONAL_DATA.timeline})</span>
          </div>
          <p className="text-[11px] text-muted">
            {PERSONAL_DATA.institution} — {PERSONAL_DATA.degree}
          </p>
        </div>

        {/* Center: Live Telemetry Status */}
        <div className="flex flex-wrap items-center gap-6 border-y md:border-y-0 md:border-x border-[var(--border-hairline)] py-3 md:py-0 md:px-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-muted tracking-wider">TELEMETRY: ACTIVE</span>
          </div>
          <div>
            <span className="text-muted">CLOCK: </span>
            <span className="text-cyan-400 font-mono">{timeStr || '20:20:00 IST'}</span>
          </div>
        </div>

        {/* Right: Scroll to top & copyright */}
        <div className="flex items-center justify-between w-full md:w-auto gap-6">
          <div className="text-[11px]">
            © {new Date().getFullYear()} {PERSONAL_DATA.name}
          </div>
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={playHover}
              data-cursor="action"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-hairline)] hover:border-cyan-500/40 text-muted hover:text-cyan-400 transition-colors rounded-xs"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};
