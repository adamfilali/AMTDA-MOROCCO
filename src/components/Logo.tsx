import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function Logo({ className = "h-14", theme = 'light' }: LogoProps) {
  const filterStyle = theme === 'dark' ? { filter: 'brightness(0) invert(1)' } : {};

  return (
    <img 
      src="/logo.svg" 
      alt="Logo AMTDA" 
      className={`${className} w-auto object-contain`}
      style={filterStyle}
    />
  );
}
