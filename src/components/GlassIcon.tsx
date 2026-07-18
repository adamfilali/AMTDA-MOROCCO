/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GlassIconProps {
  icon: LucideIcon;
  color?: 'emerald' | 'orange' | 'blue' | 'purple' | 'rose' | 'amber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function GlassIcon({ 
  icon: Icon, 
  color = 'emerald', 
  size = 'md',
  className = '' 
}: GlassIconProps) {
  
  const colorSchemes = {
    emerald: {
      bg: 'from-emerald-500/15 to-teal-500/5',
      border: 'border-emerald-500/25',
      text: 'text-emerald-600 dark:text-emerald-400',
      glow: 'shadow-[0_8px_32px_rgba(16,185,129,0.12)]',
      hoverGlow: 'hover:shadow-[0_8px_32px_rgba(16,185,129,0.22)] hover:border-emerald-500/40',
      dot: 'bg-emerald-400',
    },
    orange: {
      bg: 'from-orange-500/15 to-amber-500/5',
      border: 'border-orange-500/25',
      text: 'text-orange-600 dark:text-orange-400',
      glow: 'shadow-[0_8px_32px_rgba(249,115,22,0.12)]',
      hoverGlow: 'hover:shadow-[0_8px_32px_rgba(249,115,22,0.22)] hover:border-orange-500/40',
      dot: 'bg-orange-400',
    },
    blue: {
      bg: 'from-blue-500/15 to-indigo-500/5',
      border: 'border-blue-500/25',
      text: 'text-blue-600 dark:text-blue-400',
      glow: 'shadow-[0_8px_32px_rgba(59,130,246,0.12)]',
      hoverGlow: 'hover:shadow-[0_8px_32px_rgba(59,130,246,0.22)] hover:border-blue-500/40',
      dot: 'bg-blue-400',
    },
    purple: {
      bg: 'from-purple-500/15 to-fuchsia-500/5',
      border: 'border-purple-500/25',
      text: 'text-purple-600 dark:text-purple-400',
      glow: 'shadow-[0_8px_32px_rgba(168,85,247,0.12)]',
      hoverGlow: 'hover:shadow-[0_8px_32px_rgba(168,85,247,0.22)] hover:border-purple-500/40',
      dot: 'bg-purple-400',
    },
    rose: {
      bg: 'from-rose-500/15 to-pink-500/5',
      border: 'border-rose-500/25',
      text: 'text-rose-600 dark:text-rose-400',
      glow: 'shadow-[0_8px_32px_rgba(244,63,94,0.12)]',
      hoverGlow: 'hover:shadow-[0_8px_32px_rgba(244,63,94,0.22)] hover:border-rose-500/40',
      dot: 'bg-rose-400',
    },
    amber: {
      bg: 'from-amber-500/15 to-yellow-500/5',
      border: 'border-amber-500/25',
      text: 'text-amber-600 dark:text-amber-400',
      glow: 'shadow-[0_8px_32px_rgba(245,158,11,0.12)]',
      hoverGlow: 'hover:shadow-[0_8px_32px_rgba(245,158,11,0.22)] hover:border-amber-500/40',
      dot: 'bg-amber-400',
    }
  };

  const sizes = {
    sm: {
      container: 'w-10 h-10 rounded-xl p-2.5',
      icon: 'w-4 h-4',
      dot: 'w-1.5 h-1.5 -top-0.5 -right-0.5'
    },
    md: {
      container: 'w-12 h-12 rounded-2xl p-3',
      icon: 'w-5.5 h-5.5',
      dot: 'w-2 h-2 -top-0.5 -right-0.5'
    },
    lg: {
      container: 'w-14 h-14 rounded-2xl p-3.5',
      icon: 'w-7 h-7',
      dot: 'w-2.5 h-2.5 -top-1 -right-1'
    },
    xl: {
      container: 'w-16 h-16 rounded-[20px] p-4.5',
      icon: 'w-8 h-8',
      dot: 'w-3 h-3 -top-1 -right-1'
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.emerald;
  const sizeStyle = sizes[size] || sizes.md;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Glow shadow ring and background element */}
      <div 
        className={`
          flex items-center justify-center
          bg-gradient-to-br ${scheme.bg}
          backdrop-blur-md border ${scheme.border}
          ${scheme.glow} ${scheme.hoverGlow}
          ${sizeStyle.container}
          transition-all duration-300 ease-out transform hover:scale-105 active:scale-95
        `}
      >
        <Icon className={`${sizeStyle.icon} ${scheme.text} transition-transform duration-300 hover:rotate-6`} strokeWidth={1.5} />
      </div>
      
      {/* Small trend element - fluid floating dot */}
      <span className={`absolute rounded-full animate-pulse opacity-70 ${scheme.dot} ${sizeStyle.dot}`} />
    </div>
  );
}
