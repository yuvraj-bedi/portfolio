import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BootLoaderProps {
  onComplete: () => void;
  playClick?: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete, playClick }) => {
  const [progress, setProgress] = useState(0);
  const [bootPhase, setBootPhase] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // If already booted this session, shorten or skip
    const alreadyBooted = sessionStorage.getItem('yb_booted');
    const stepDuration = alreadyBooted ? 8 : 14;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDismissed(true);
            sessionStorage.setItem('yb_booted', 'true');
            onComplete();
          }, 350);
          return 100;
        }
        return prev + 2;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 30 && bootPhase < 1) setBootPhase(1);
    if (progress > 65 && bootPhase < 2) setBootPhase(2);
    if (progress > 90 && bootPhase < 3) setBootPhase(3);
  }, [progress, bootPhase]);

  const handleSkip = () => {
    if (playClick) playClick();
    setIsDismissed(true);
    sessionStorage.setItem('yb_booted', 'true');
    onComplete();
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleSkip}
          className="fixed inset-0 z-50 bg-[#0B0C0E] text-[#EDEDED] flex flex-col justify-between p-6 sm:p-12 cursor-pointer font-mono select-none"
          title="Click to skip telemetry boot"
        >
          {/* Top Telemetry Header */}
          <div className="flex justify-between items-center text-xs text-[#8E929B] border-b border-white/10 pb-4">
            <span className="text-cyan-400 font-bold">[SYS.BOOT // v2.6]</span>
            <span className="hidden sm:inline">BENNETT UNIVERSITY // CSE_YEAR_02</span>
            <span className="text-[10px] text-cyan-400/80 animate-pulse">[CLICK TO ENTER]</span>
          </div>

          {/* Central Terminal Telemetry Output */}
          <div className="max-w-xl mx-auto w-full flex flex-col gap-3 text-xs sm:text-sm">
            <div className="text-subdued text-[11px] mb-2">INITIALIZING COMPUTATIONAL WORKBENCH...</div>

            <div className="space-y-1.5 text-muted">
              <div className="flex items-center justify-between">
                <span className="text-[#EDEDED]">&gt; ALLOC_BUFFER: MEM_0x7FFE</span>
                <span className="text-cyan-400">[READY]</span>
              </div>

              {bootPhase >= 1 && (
                <div className="flex items-center justify-between animate-in fade-in">
                  <span className="text-[#EDEDED]">&gt; MOUNT_REPOSITORY: /yuvrajbedi/digital_lab</span>
                  <span className="text-emerald-400">[MOUNTED]</span>
                </div>
              )}

              {bootPhase >= 2 && (
                <div className="flex items-center justify-between animate-in fade-in">
                  <span className="text-[#EDEDED]">&gt; LOAD_ACADEMIC_TELEMETRY: BU_CSE_2025_2029</span>
                  <span className="text-cyan-400">[ONLINE]</span>
                </div>
              )}

              {bootPhase >= 3 && (
                <div className="flex items-center justify-between animate-in fade-in">
                  <span className="text-[#EDEDED]">&gt; RENDER_3D_LATTICE: SHADER_PIPELINE</span>
                  <span className="text-cyan-400">[COMPILED]</span>
                </div>
              )}
            </div>

            {/* Progress Bar & Percentage */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted tracking-wider">COMPILING INTERFACE</span>
                <span className="text-cyan-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-cyan-400 transition-all duration-75 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Footer Prompt */}
          <div className="text-center text-[11px] text-[#4E525C] tracking-widest uppercase">
            [ TAP ANYWHERE OR SCROLL TO ENTER OBSERVATORY ]
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
