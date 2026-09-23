import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { PERSONAL_DATA } from '../../data/personal';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { Magnetic } from '../common/Magnetic';


interface ContactProps {
  playHover: () => void;
  playClick: () => void;
}

export const Contact: React.FC<ContactProps> = ({ playHover, playClick }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    navigator.clipboard.writeText(PERSONAL_DATA.socials.email.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="connect" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-hairline)] z-10 relative">
      <div id="contact" className="absolute -top-24 pointer-events-none" aria-hidden="true" />
      <SectionHeader
        index="06"
        title="CONNECT"
        tag="[INIT_CONTACT // DIRECT LINK]"
        subtitle="Open for technical collaboration, software research discussions, and engineering opportunities."
      />

      <div className="space-y-12">
        {/* Monumental Statement */}
        <div className="space-y-4">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary uppercase leading-[0.95]">
            Let's Make
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-cyan-400">
              Something.
            </span>
          </h2>
          <p className="font-sans text-muted text-sm sm:text-base max-w-xl">
            Whether you have an inquiry about computational systems, an open-source initiative, or an internship opportunity, my inbox is open.
          </p>
        </div>

        {/* Primary Interactive Direct Email Bar */}
        <div className="p-6 sm:p-8 border border-[var(--border-hairline)] bg-surface/40 rounded-xs space-y-4">
          <div className="font-mono text-xs text-subdued uppercase tracking-widest flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>PRIMARY DISPATCH // ELECTRONIC MAIL</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <a
              href={PERSONAL_DATA.socials.email.url}
              onClick={playClick}
              onMouseEnter={playHover}
              data-cursor="link"
              className="font-mono text-base sm:text-xl md:text-2xl text-primary hover:text-cyan-400 transition-colors font-medium break-all"
            >
              {PERSONAL_DATA.socials.email.address}
            </a>

            <div className="flex items-center gap-3">
              <Magnetic strength={0.3}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  onMouseEnter={playHover}
                  data-cursor={copied ? 'copied' : 'copy'}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xs border border-[var(--border-hairline)] bg-surface hover:border-cyan-500/40 text-muted hover:text-cyan-400 font-mono text-xs tracking-wider uppercase transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href={PERSONAL_DATA.socials.email.url}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xs bg-cyan-500/10 border border-cyan-400 text-cyan-400 font-mono text-xs tracking-wider uppercase hover:bg-cyan-500/20 transition-all"
                >
                  <span>LAUNCH MAILTO</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Verified Social Networks Grid (Only GitHub & LinkedIn) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* GitHub Card */}
          <Magnetic strength={0.2} className="w-full">
            <a
              href={PERSONAL_DATA.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              data-cursor="link"
              className="p-6 border border-[var(--border-hairline)] bg-surface/30 hover:border-cyan-500/40 hover:bg-surface/60 transition-all rounded-xs flex items-center justify-between group block"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs text-subdued uppercase">
                  <GithubIcon className="w-4 h-4 text-primary group-hover:text-cyan-400 transition-colors" />
                  <span>CODE REPOSITORY</span>
                </div>
                <div className="font-display font-semibold text-lg text-primary group-hover:text-cyan-400 transition-colors">
                  {PERSONAL_DATA.socials.github.handle}
                </div>
                <div className="font-mono text-[11px] text-muted">
                  github.com/{PERSONAL_DATA.socials.github.handle}
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-subdued group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </Magnetic>

          {/* LinkedIn Card */}
          <Magnetic strength={0.2} className="w-full">
            <a
              href={PERSONAL_DATA.socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              data-cursor="link"
              className="p-6 border border-[var(--border-hairline)] bg-surface/30 hover:border-cyan-500/40 hover:bg-surface/60 transition-all rounded-xs flex items-center justify-between group block"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs text-subdued uppercase">
                  <LinkedinIcon className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  <span>PROFESSIONAL NETWORK</span>
                </div>
                <div className="font-display font-semibold text-lg text-primary group-hover:text-cyan-400 transition-colors">
                  {PERSONAL_DATA.name}
                </div>
                <div className="font-mono text-[11px] text-muted">
                  linkedin.com/in/{PERSONAL_DATA.socials.linkedin.handle}
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-subdued group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};
