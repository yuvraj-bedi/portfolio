import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier (default 0.3)
  className?: string;
  onClick?: () => void;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.35,
  className = '',
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
