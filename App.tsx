import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { AirportPanel, AirportAFooter } from './components/AirportPanel';
import { JointOpsPanel } from './components/JointOpsPanel';
import { OperationsPanel } from './components/OperationsPanel';
import { OperationPanel } from './components/OperationPanel';
import { ReleasePanel } from './components/ReleasePanel';
import { FluidBackground } from './components/FluidBackground';
import { AIRPORT_A_DATA, AIRPORT_B_DATA, JOINT_OPS_DATA } from './constants';
import { OPERATIONS_DATA } from './operationsConstants';
import { useTheme } from './ThemeContext';

const CAROUSEL_INTERVAL = 10000; // 10 seconds
const TOTAL_PAGES = 4;

// import { ResponsiveWrapper } from './components/ResponsiveWrapper';
import { cn } from './lib/utils';

const App: React.FC = () => {
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);

  // Transition State
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'in' | 'out'>('idle');

  // Handle Page Transition Sequence
  const handlePageTransition = useCallback((targetPage: number) => {
    if (isTransitioning || targetPage === currentPage) return;

    // Start Transition (In)
    setIsTransitioning(true);
    setTransitionStage('in');

    // Wait for cover (1500ms match CSS)
    setTimeout(() => {
      setCurrentPage(targetPage);
      setTransitionStage('out');

      // Wait for reveal (1500ms match CSS)
      setTimeout(() => {
        setTransitionStage('idle');
        setIsTransitioning(false);
      }, 1500);
    }, 1500);
  }, [currentPage, isTransitioning]);

  // Navigate to specific page
  const goToPage = useCallback((page: number) => {
    handlePageTransition(page);
  }, [handlePageTransition]);

  // Navigate to next/prev page
  const nextPage = useCallback(() => {
    handlePageTransition((currentPage + 1) % TOTAL_PAGES);
  }, [currentPage, handlePageTransition]);

  const prevPage = useCallback(() => {
    handlePageTransition((currentPage - 1 + TOTAL_PAGES) % TOTAL_PAGES);
  }, [currentPage, handlePageTransition]);

  // Auto carousel effect - Controlled by URL parameters
  useEffect(() => {
    // Parse URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    const autoParam = searchParams.get('auto'); // 'true' or 'false', default 'true'
    const intervalParam = searchParams.get('interval'); // seconds, default 10

    const shouldAutoPlay = autoParam !== 'false'; // Default to true if not specified as false
    const intervalSeconds = intervalParam ? parseInt(intervalParam, 10) : 10;
    const intervalMs = (isNaN(intervalSeconds) ? 10 : intervalSeconds) * 1000;

    if (!shouldAutoPlay) return;

    const timer = setInterval(nextPage, intervalMs);
    return () => clearInterval(timer);
  }, [nextPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return; // Block input during transition
      if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, isTransitioning]);

  // Debug: Toggle content visibility to observe background
  const SHOW_CONTENT = true;

  return (
    // <ResponsiveWrapper>
    <div className="w-screen h-screen overflow-hidden bg-[#0f172a]">
      <div className={cn(
        "w-full h-full flex flex-col relative overflow-hidden",
        isDark ? 'text-white' : 'text-slate-700'
      )}>

        {/* Dynamic Background (Persistent - Outside Transition) */}
        {/* Dynamic Background (Persistent - Outside Transition) */}
        {/* <FluidBackground /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#020617] z-0" />

        {SHOW_CONTENT && (
          <>
            {/* Top Header */}
            <Header />

            {/* Main Dashboard Content - Applies Fade Transition HERE */}
            <main
              className="w-full h-full p-3 pb-4 relative z-10 flex-1 overflow-hidden flex flex-col transition-opacity duration-[1500ms] ease-in-out"
              style={{
                opacity: transitionStage === 'in' ? 0 : 1,
              }}
            >
              {/* Inner Content - Pages */}
              {currentPage === 0 && (
                <div className="grid grid-cols-12 gap-3 flex-1 min-h-0 animate-in fade-in zoom-in-95 duration-500">
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
                <div className="flex-1 min-h-0 animate-in fade-in zoom-in-95 duration-500">
                  <OperationsPanel data={OPERATIONS_DATA} />
                </div>
              )}

              {/* Page 2: Operation */}
              {currentPage === 2 && (
                <div className="flex-1 min-h-0 animate-in fade-in zoom-in-95 duration-500">
                  <OperationPanel />
                </div>
              )}

              {/* Page 3: Release */}
              {currentPage === 3 && (
                <div className="flex-1 min-h-0 animate-in fade-in zoom-in-95 duration-500">
                  <ReleasePanel />
                </div>
              )}

            </main>

            {/* Bottom Alignment Decoration Line */}


            {/* Page Indicator - Liquid Glass Style (No Background) */}
            <div className="flex justify-center items-center mt-3 mb-1">
              <div className="flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-500">
                {[0, 1, 2, 3].map((index) => {
                  const isActive = currentPage === index;
                  return (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`
                        relative rounded-full transition-all duration-[1500ms] cubic-bezier(0.25, 0.8, 0.25, 1) cursor-pointer overflow-hidden
                        ${isActive
                          ? 'w-8 h-3 bg-gradient-to-br from-sky-400 to-blue-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]'
                          : `w-3 h-3 ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'} shadow-inner`}
                      `}
                      aria-label={`Switch to page ${index + 1}`}
                    >
                      {/* Liquid Glare Effect for Active State */}
                      <div className={`absolute top-[1px] left-[2px] right-[2px] h-[40%] bg-gradient-to-b from-white/80 to-transparent rounded-full opacity-60 transition-opacity duration-300 ${isActive ? 'opacity-60' : 'opacity-0'}`}></div>
                    </button>
                  );
                })}
              </div>
              <span className={`ml-4 text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'} hidden`}>
                ← → 键盘切换
              </span>
            </div>
          </>
        )}
      </div>
    </div>
    // </ResponsiveWrapper>
  );
};

export default App;