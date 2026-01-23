import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 z-50 flex-shrink-0 relative mt-2">
      <div className="flex items-center gap-4">
        {/* Removed Icon */}
        <div>
          <h1 className={`text-3xl font-black tracking-tight leading-tight ${isDark ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-slate-700 drop-shadow-soft'}`}>地服公司两场生产运行态势</h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button - Hidden ... */}

        <div className={`flex items-center gap-3 px-5 py-2 rounded-full ${isDark ? 'bg-slate-800/40' : 'glass-card'}`}>
          <span className={`text-2xl font-bold font-mono tabular-nums tracking-wide ${isDark ? 'text-white' : 'text-slate-600'}`}>{formatTime(currentTime)}</span>
        </div>
      </div>
    </header>
  );
};