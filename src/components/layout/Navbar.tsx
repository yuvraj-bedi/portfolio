import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { Magnetic } from '../common/Magnetic';
import { PERSONAL_DATA } from '../../data/personal';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  soundEnabled,
  toggleSound,
  playHover,
  playClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'INTRO', num: '01', href: '#intro' },
    { label: 'ABOUT', num: '02', href: '#about' },
    { label: 'WORK', num: '03', href: '#work' },
    { label: 'LAB', num: '04', href: '#lab' },
    { label: 'JOURNEY', num: '05', href: '#journey' },
    { label: 'CONNECT', num: '06', href: '#connect' },
  ];

  const handleNavClick = () => {
    playClick();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-canvas/80 backdrop-blur-md border-b border-[var(--border-hairline)] shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo / System ID */}
          <Magnetic strength={0.2}>
            <a
              href="#"
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex items-center gap-2.5 group"
              data-cursor="action"
            >
              <div className="w-8 h-8 rounded-xs border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 group-hover:border-cyan-400 transition-colors">
                YB
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-semibold text-xs tracking-wider text-primary group-hover:text-cyan-400 transition-colors">
                  {PERSONAL_DATA.name.toUpperCase()}
                </span>
                <span className="font-mono text-[9px] text-subdued tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SYS.ONLINE
                </span>
              </div>
            </a>
          </Magnetic>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map(link => (
              <Magnetic key={link.num} strength={0.25}>
                <a
                  href={link.href}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  data-cursor="link"
                  className="font-mono text-xs tracking-wider text-muted hover:text-cyan-400 transition-colors py-1 px-1.5 flex items-center gap-1.5"
                >
                  <span className="text-[10px] text-subdued">{link.num}</span>
                  <span>{link.label}</span>
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* Control Toggles: Audio & Theme */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => {
                  toggleSound();
                }}
                onMouseEnter={playHover}
                data-cursor="action"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xs border border-[var(--border-hairline)] bg-surface/60 hover:border-cyan-500/40 text-muted hover:text-cyan-400 font-mono text-[11px] tracking-wider transition-colors"
                title={soundEnabled ? 'Disable Audio FX' : 'Enable Audio FX'}
                aria-label="Toggle Sound Effects"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span className="hidden sm:inline text-cyan-400">AUDIO ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-subdued" />
                    <span className="hidden sm:inline">AUDIO OFF</span>
                  </>
                )}
              </button>
            </Magnetic>

            {/* Theme Toggle */}
            <Magnetic strength={0.3}>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  toggleTheme();
                }}
                onMouseEnter={playHover}
                data-cursor="action"
                className="w-9 h-9 rounded-xs border border-[var(--border-hairline)] bg-surface/60 hover:border-cyan-500/40 flex items-center justify-center text-muted hover:text-cyan-400 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                aria-label="Toggle Dark and Light Mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Moon className="w-4 h-4 text-cyan-600" />
                )}
              </button>
            </Magnetic>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden w-9 h-9 rounded-xs border border-[var(--border-hairline)] bg-surface/60 flex items-center justify-center text-primary"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-canvas/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 border-b border-[var(--border-hairline)] animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs text-cyan-400 tracking-widest border-b border-[var(--border-hairline)] pb-3">
              [SYSTEM_NAVIGATION // DIRECTORY]
            </span>
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <a
                  key={link.num}
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex items-center justify-between text-lg font-display tracking-tight text-primary hover:text-cyan-400 py-2 border-b border-[var(--border-hairline)]/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-subdued">{link.num}</span>
                    <span>{link.label}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-subdued" />
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-[var(--border-hairline)] flex flex-col gap-3 font-mono text-xs text-subdued">
            <div className="flex justify-between items-center">
              <span>INSTITUTION</span>
              <span className="text-primary">{PERSONAL_DATA.institution}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>STATUS</span>
              <span className="text-cyan-400">{PERSONAL_DATA.currentYear} CSE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
