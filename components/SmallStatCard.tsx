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
    <div className={`flex flex-col justify-end h-full ${isRight ? 'items-end' : 'items-start'}`}>
      <div className={`flex items-end mb-6 ${isRight ? 'justify-end' : 'justify-start'} w-full`}>
        <span className={`text-4xl font-bold tracking-tight ${isDark
          ? (data.label.includes('国际') ? 'text-sky-400' : 'text-white')
          : (data.label.includes('国际') ? 'text-sky-600' : 'text-slate-600')
          }`}>{data.label}</span>
      </div>

      <div className={`flex items-baseline gap-3 mb-1 ${isRight ? 'justify-end' : 'justify-start'} w-full`}>
        <span className={`text-6xl lg:text-7xl font-black tech-font drop-shadow-pop tracking-tight leading-none ${isDark ? currentTheme.textDark : currentTheme.textLight
          }`}>
          {data.executed}
        </span>
        <span className={`text-2xl font-bold tech-font ${isDark ? 'text-white' : 'text-slate-400'}`}>/ {data.planned}</span>
      </div>

      {/* Increased height to h-4 for bolder look */}
      <div className={`w-full h-4 rounded-full overflow-hidden ${isDark ? 'bg-slate-600/50' : 'bg-slate-300'}`}>
        <div
          className={`h-4 rounded-full transition-all duration-1000 ease-out ${isDark
            ? `${currentTheme.barDark} shadow-[0_0_10px_currentColor]`
            : `${currentTheme.barLight} shadow-sm`
            }`}
          style={{ width: `${data.percentage}%` }}
        />
      </div>
    </div>
  );
};