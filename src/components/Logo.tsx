import React from 'react';

/** Assets cropped from the official logo in public/assets/aistudio. */
// BASE_URL keeps these correct wherever the site is served from (domain
// root, subfolder, or add-on path) — hash routing keeps the base stable.
const ICON_SRC = `${import.meta.env.BASE_URL}assets/digivibz-icon.png`;
const WORDMARK_SRC = `${import.meta.env.BASE_URL}assets/digivibz-wordmark.png`;

interface LogoIconProps {
  className?: string;
  size?: number | string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ className = 'w-9 h-9', size }) => {
  return (
    <img
      src={ICON_SRC}
      alt="DIGIVIBZ"
      className={`object-contain select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    />
  );
};

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'lg', variant = 'light' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  };

  const wordHeights = {
    sm: 'h-3.5',
    md: 'h-4',
    lg: 'h-5',
    xl: 'h-6',
  };

  return (
    <div
      className={`flex items-center gap-2.5 select-none ${
        variant === 'dark' ? 'bg-white rounded-lg px-2.5 py-1.5' : ''
      } ${className}`}
    >
      <LogoIcon className={`${iconSizes[size]} shrink-0`} />
      <img
        src={WORDMARK_SRC}
        alt=""
        aria-hidden="true"
        className={`${wordHeights[size]} w-auto object-contain shrink-0`}
      />
    </div>
  );
};
