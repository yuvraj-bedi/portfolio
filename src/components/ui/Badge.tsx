import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'neutral' | 'pulse';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'cyan':
        return 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5';
      case 'pulse':
        return 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10';
      default:
        return 'border-[var(--border-hairline)] text-muted bg-surface/50';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase border rounded-xs transition-colors ${getStyles()} ${className}`}
    >
      {variant === 'pulse' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      )}
      {children}
    </span>
  );
};
