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
      <style>
        {`
          @keyframes progressFlow {
            0%, 100% { box-shadow: 0 0 8px currentColor, inset -4px 0 8px rgba(255,255,255,0.3); }
            50% { box-shadow: 0 0 16px currentColor, inset -8px 0 12px rgba(255,255,255,0.5); }
          }
          @keyframes liquidInternal {
            0% { background-position: 10% 10%; }
            25% { background-position: 90% 30%; }
            50% { background-position: 20% 80%; }
            75% { background-position: 80% 60%; }
            100% { background-position: 10% 10%; }
          }
          @keyframes liquidEdge {
            0%, 100% { border-top-right-radius: 40% 100%; border-bottom-right-radius: 60% 100%; }
            50% { border-top-right-radius: 60% 100%; border-bottom-right-radius: 40% 100%; }
          }
        `}
      </style>
      <div className={`w-full h-4 rounded-full overflow-hidden ${isDark ? 'bg-slate-600/50' : 'bg-slate-300'}`}>
        <div
          className={`h-4 rounded-l-full transition-all duration-1000 ease-out ${isDark
            ? `${currentTheme.barDark}`
            : `${currentTheme.barLight} shadow-sm`
            }`}
          style={{
            width: `${data.percentage}%`,
            backgroundSize: '400% 400%',
            animation: isDark ? 'progressFlow 2s ease-in-out infinite, liquidInternal 10s ease-in-out infinite, liquidEdge 3s ease-in-out infinite' : undefined
          }}
        />
      </div>
    </div>
  );
};