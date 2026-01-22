import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { AirportPanel, AirportAFooter } from './components/AirportPanel';
import { JointOpsPanel } from './components/JointOpsPanel';
import { OperationsPanel } from './components/OperationsPanel';
import { FluidBackground } from './components/FluidBackground';
import { AIRPORT_A_DATA, AIRPORT_B_DATA, JOINT_OPS_DATA } from './constants';
import { OPERATIONS_DATA } from './operationsConstants';
import { useTheme } from './ThemeContext';

const CAROUSEL_INTERVAL = 10000; // 10 seconds
const TOTAL_PAGES = 2;

const App: React.FC = () => {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);

  // Navigate to specific page
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Navigate to next/prev page
  const nextPage = useCallback(() => {
    setCurrentPage(prev => (prev + 1) % TOTAL_PAGES);
  }, []);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => (prev - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

  // Auto carousel effect
  useEffect(() => {
    const timer = setInterval(nextPage, CAROUSEL_INTERVAL);
    return () => clearInterval(timer);
  }, [nextPage]);

  return (
    <div className={`h-screen w-screen flex flex-col relative overflow-hidden ${isDark ? 'text-white' : 'text-slate-700'}`}>
      {/* Dynamic Background */}
      <FluidBackground />

      {/* Top Header */}
      <Header />

      {/* Main Dashboard Content */}
      <main className="w-full h-full p-3 pb-4 relative z-10 flex-1 overflow-hidden flex flex-col">

        {/* Page 0: Situation */}
        {currentPage === 0 && (
          <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
            {/* Left Column: Airport A */}
            <AirportPanel data={AIRPORT_A_DATA}>
              <AirportAFooter />
            </AirportPanel>

            {/* Middle Column: Joint Stats */}
            <JointOpsPanel data={JOINT_OPS_DATA} />

            {/* Right Column: Airport B */}
            <AirportPanel data={AIRPORT_B_DATA} />
          </div>
        )}

        {/* Page 1: Target */}
        {currentPage === 1 && (
          <div className="flex-1 min-h-0">
            <OperationsPanel data={OPERATIONS_DATA} />
          </div>
        )}

        {/* Bottom Alignment Decoration Line */}
        <div className={`w-full h-[2px] mt-2 bg-gradient-to-r from-transparent to-transparent shrink-0 ${isDark ? 'via-slate-600 opacity-50' : 'via-slate-300 opacity-60'}`}></div>

        {/* Page Indicator - Clickable */}
        <div className="flex justify-center items-center gap-3 mt-3">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${currentPage === index
                ? (isDark ? 'bg-sky-400 w-8' : 'bg-sky-600 w-8')
                : (isDark ? 'bg-slate-600 w-3 hover:bg-slate-500' : 'bg-slate-300 w-3 hover:bg-slate-400')
                }`}
              aria-label={`Switch to ${index === 0 ? 'Situation' : 'Target'}`}
            />
          ))}
          <span className={`ml-4 text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'} hidden`}>
            ← → 键盘切换
          </span>
        </div>
      </main>
    </div>
  );
};

export default App;