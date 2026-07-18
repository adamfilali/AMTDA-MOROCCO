import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function Logo({ className = "h-14", theme = 'light' }: LogoProps) {
  // Theme colors
  const greenHeadColor = "#0b4a34";
  const limeColor = "#a2d115";
  const orangeColor = "#ef6c00";
  const barColor = "#0b4a34";
  const textColor = theme === 'light' ? "#1e293b" : "#ffffff";
  const subtextColor = theme === 'light' ? "#1e3a8a" : "#cbd5e1";

  return (
    <svg 
      className={className} 
      viewBox="0 0 350 135" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. CHILD DRAWING (Icon on the left) */}
      <g id="child-icon" transform="translate(5, -12) scale(0.85)">
        {/* Head */}
        <circle cx="58" cy="55" r="11" fill={greenHeadColor} />
        
        {/* Rays */}
        {/* Ray 1: Horizontal Left */}
        <line x1="12" y1="55" x2="38" y2="55" stroke={limeColor} strokeWidth="5.5" strokeLinecap="round" />
        {/* Ray 2: Diagonal Top-Left */}
        <line x1="26" y1="23" x2="44" y2="41" stroke={limeColor} strokeWidth="5.5" strokeLinecap="round" />
        {/* Ray 3: Vertical Top */}
        <line x1="58" y1="12" x2="58" y2="37" stroke={limeColor} strokeWidth="5.5" strokeLinecap="round" />
        {/* Ray 4: Diagonal Top-Right */}
        <line x1="90" y1="23" x2="72" y2="41" stroke={limeColor} strokeWidth="5.5" strokeLinecap="round" />

        {/* Body (Star-child standing pose) */}
        <path 
          d="M 58,67 C 50,67 38,69 31,73 C 26,76 22,78 24,82 C 26,86 33,85 41,80 C 49,75 54,72 58,76 C 60,78 59,85 55,96 C 50,110 44,125 42,132 C 41,136 43,138 47,135 C 51,132 59,116 66,104 C 69,97 72,94 74,97 C 77,100 80,107 83,116 C 88,127 93,138 97,141 C 101,144 104,142 102,136 C 100,130 92,112 87,98 C 83,87 82,80 86,75 C 90,71 97,68 103,62 C 107,58 108,55 104,55 C 100,55 91,61 85,67 C 78,73 70,76 66,72 C 63,69 63,68 58,67 Z" 
          fill={limeColor} 
        />
      </g>

      {/* 2. TEXT AREA */}
      <g id="text-logo">
        {/* "AMTDA" text */}
        <text 
          x="116" 
          y="62" 
          fill={orangeColor} 
          fontSize="44" 
          fontFamily="'Arial Black', 'Impact', sans-serif" 
          fontWeight="900" 
          letterSpacing="-1.5"
        >
          AMTDA
        </text>

        {/* Green underline bar */}
        <rect x="116" y="70" width="170" height="5.5" rx="1" fill={greenHeadColor} />

        {/* Subtitle Line 1: "Association Marocaine" */}
        <text 
          x="166" 
          y="90" 
          fill={textColor} 
          fontSize="11.5" 
          fontFamily="'Inter', 'Helvetica', sans-serif" 
          fontWeight="800"
          letterSpacing="0.2"
        >
          Association Marocaine
        </text>

        {/* Subtitle Line 2: "des Troubles et Difficultés d'Apprentissage" */}
        <text 
          x="100" 
          y="106" 
          fill={textColor} 
          fontSize="9.8" 
          fontFamily="'Inter', 'Helvetica', sans-serif" 
          fontWeight="700"
          letterSpacing="-0.2"
        >
          des Troubles et Difficultés d'Apprentissage
        </text>
      </g>
    </svg>
  );
}
