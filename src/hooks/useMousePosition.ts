import { useState, useEffect } from 'react';

export interface MousePos {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  targetType: string | null; // e.g. "link", "card", "button", "copy"
  targetText?: string;
}

export function useMousePosition() {
  const [mousePos, setMousePos] = useState<MousePos>({
    x: -100,
    y: -100,
    normalizedX: 0,
    normalizedY: 0,
    targetType: null,
  });

  useEffect(() => {
    // Only track on fine pointers (desktop)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(clientY / window.innerHeight) * 2 + 1;

      // Check contextual hover target
      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      const targetType = target ? target.getAttribute('data-cursor') : null;
      const targetText = target ? target.getAttribute('data-cursor-text') || undefined : undefined;

      setMousePos({
        x: clientX,
        y: clientY,
        normalizedX,
        normalizedY,
        targetType,
        targetText,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePos;
}
