import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useMousePosition } from '../../hooks/useMousePosition';

export const CustomCursor: React.FC = () => {
  const { x, y, targetType, targetText } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkTouch);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isTouchDevice || !isVisible || x < 0 || y < 0) {
    return null;
  }

  // Determine badge text
  let cursorLabel = targetText;
  let isExpanded = false;

  if (targetType === 'coming_soon') {
    cursorLabel = cursorLabel || 'COMING SOON';
    isExpanded = true;
  } else if (targetType === 'link') {
    cursorLabel = cursorLabel || 'VISIT ↗';
    isExpanded = true;
  } else if (targetType === 'copy') {
    cursorLabel = cursorLabel || 'COPY';
    isExpanded = true;
  } else if (targetType === 'copied') {
    cursorLabel = cursorLabel || 'COPIED ✓';
    isExpanded = true;
  } else if (targetType === 'explore') {
    cursorLabel = cursorLabel || 'EXPLORE';
    isExpanded = true;
  } else if (targetType === 'action') {
    isExpanded = true;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(0,240,255,0.8)]"
        animate={{
          x,
          y,
          opacity: isExpanded ? 0 : 1,
          scale: isExpanded ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Contextual Hairline Ring / Badge */}
      <motion.div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[10px] tracking-wider font-semibold border ${
          isExpanded
            ? 'px-3 py-1.5 rounded-full bg-cyan-500/10 border-cyan-400 text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.3)]'
            : 'w-8 h-8 rounded-full border-cyan-400/40 bg-transparent'
        }`}
        animate={{
          x,
          y,
          scale: isExpanded ? 1.05 : 1,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 280, mass: 0.2 }}
      >
        {isExpanded && cursorLabel && <span>{cursorLabel}</span>}
      </motion.div>
    </div>
  );
};
