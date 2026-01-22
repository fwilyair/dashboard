import React from 'react';
import { Metric } from '../types';
import { useTheme } from '../ThemeContext';

interface SmallStatCardProps {
  data: Metric;
  colorTheme: 'teal' | 'indigo';
  align?: 'left' | 'right';
}

export const SmallStatCard: React.FC<SmallStatCardProps> = ({ data, colorTheme, align = 'left' }) => {
  const { isDark } = useTheme();

  const themeColors = {
    teal: {
      barLight: 'bg-teal-500',
      barDark: 'bg-teal-400',
      textLight: 'text-teal-600',
      textDark: 'text-teal-300',
    },
    indigo: {
      barLight: 'bg-indigo-500',
      barDark: 'bg-indigo-400',
      textLight: 'text-indigo-600',
      textDark: 'text-indigo-300',
    }
  };

  const currentTheme = themeColors[colorTheme];
  const isRight = align === 'right';

  return (
    <div className={`flex flex-col justify-between group ${isRight ? 'items-end' : 'items-start'}`}>
      <div className={`flex items-end mb-3 ${isRight ? 'justify-end' : 'justify-start'} w-full`}>
        <span className={`text-3xl font-bold tracking-tight transition-colors ${isDark
          ? 'text-white group-hover:text-white/100'
          : 'text-slate-600 group-hover:text-slate-700'
          }`}>{data.label}</span>
      </div>

      <div className={`flex items-baseline gap-2 mb-2 ${isRight ? 'justify-end' : 'justify-start'} w-full`}>
        <span className={`text-5xl lg:text-6xl font-black tech-font drop-shadow-pop tracking-tight leading-none ${isDark ? currentTheme.textDark : currentTheme.textLight
          }`}>
          {data.executed}
        </span>
        <span className={`text-lg font-bold tech-font ${isDark ? 'text-white' : 'text-slate-400'}`}>/ {data.planned}</span>
      </div>

      {/* Increased height to h-3 for bolder look */}
      <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200/60'}`}>
        <div
          className={`h-3 rounded-full transition-all duration-1000 ease-out ${isDark
            ? `${currentTheme.barDark} shadow-[0_0_10px_currentColor]`
            : `${currentTheme.barLight} shadow-sm`
            }`}
          style={{ width: `${data.percentage}%` }}
        />
      </div>
    </div>
  );
};