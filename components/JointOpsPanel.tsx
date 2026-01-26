import React from 'react';
import { JointOpsData } from '../types';
import { useTheme } from '../ThemeContext';

interface JointOpsPanelProps {
  data: JointOpsData;
}

export const JointOpsPanel: React.FC<JointOpsPanelProps> = ({ data }) => {
  const { isDark } = useTheme();

  const liquidStyle: React.CSSProperties = {
    backgroundImage: isDark
      ? 'linear-gradient(90deg, #7dd3fc 0%, #38bdf8 25%, #bae6fd 50%, #38bdf8 75%, #7dd3fc 100%)'
      : 'linear-gradient(90deg, #0284c7 0%, #0ea5e9 25%, #7dd3fc 50%, #0ea5e9 75%, #0284c7 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    animation: 'liquidFn 4s ease-in-out infinite'
  };

  const liquidStyleWhite: React.CSSProperties = {
    backgroundImage: isDark
      ? 'linear-gradient(90deg, #ffffff 0%, #e2e8f0 25%, #94a3b8 50%, #e2e8f0 75%, #ffffff 100%)'
      : 'linear-gradient(90deg, #94a3b8 0%, #cbd5e1 25%, #e2e8f0 50%, #cbd5e1 75%, #94a3b8 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    animation: 'liquidFn 4s ease-in-out infinite'
  };

  const liquidStyleOrange: React.CSSProperties = {
    backgroundImage: isDark
      ? 'linear-gradient(90deg, #fb923c 0%, #fdba74 25%, #fed7aa 50%, #fdba74 75%, #fb923c 100%)'
      : 'linear-gradient(90deg, #ea580c 0%, #fb923c 25%, #fdba74 50%, #fb923c 75%, #ea580c 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    animation: 'liquidFn 4s ease-in-out infinite'
  };

  return (
    <section className="col-span-12 lg:col-span-4 h-full flex flex-col min-h-0 px-4 pt-2 justify-start gap-6 pb-24 relative z-20">
      <style>
        {`
          @keyframes liquidFn {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}
      </style>

      {/* Top Stats Area */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="text-center">
          <h2 className={`text-6xl font-black leading-none mb-2 tracking-wide ${isDark ? 'text-white' : 'text-slate-700'}`}>态势看板</h2>
        </div>

        {/* Numbers and labels container - Grid layout */}
        {/* Numbers and labels container - Flex layout for shared gradient */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-8xl lg:text-9xl font-black tech-font tracking-tighter drop-shadow-pop leading-none text-right" style={liquidStyle}>
              {data.totalExecuted}
            </span>
            <span className="text-6xl lg:text-7xl font-bold tech-font tracking-tight leading-none" style={liquidStyleWhite}>
              / {data.totalPlanned}
            </span>
          </div>

          <div className="flex justify-center gap-8 w-full">
            <span className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-[#7DD3FC]' : 'text-sky-700/70'}`}>总执行</span>
            <span className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-400'}`}>总计划</span>
          </div>
        </div>
      </div>

      {/* Gap Analysis List - Horizontal Data Layout */}
      <div className="flex flex-col min-h-0 justify-start w-full px-8">
        <div className="flex flex-col gap-10">
          {data.gaps.map((gap, index) => (
            <div
              key={index}
              className={`flex items-center justify-between py-5 rounded-lg px-2`}
            >
              {/* Label Section - aligned with numbers baseline */}
              <div className="flex-shrink-0 flex items-center">
                <span className={`text-5xl font-black tracking-tight leading-none ${isDark
                  ? (gap.label.includes('国际') ? 'text-sky-400 drop-shadow-md' : 'text-white drop-shadow-md')
                  : (gap.label.includes('国际') ? 'text-sky-600 drop-shadow-soft' : 'text-slate-600 drop-shadow-soft')
                  }`}>
                  {gap.label}
                </span>
              </div>

              {/* Horizontal Data Layout - Numbers only */}
              {/* Horizontal Data Layout - Numbers only */}
              <div className="grid grid-cols-[auto_min-content] gap-x-8 gap-y-1 justify-end justify-items-end flex-1 items-baseline">
                {/* Executed / Planned Numbers */}
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tech-font tracking-tighter drop-shadow-pop leading-none" style={{
                    ...liquidStyle,
                    animationDelay: `${-(index * 2.3) % 4}s` // Randomized/Staggered start
                  }}>
                    {gap.act}
                  </span>
                  <span className="text-3xl font-bold tech-font leading-none" style={{
                    ...liquidStyleWhite,
                    animationDelay: `${-(index * 2.3) % 4}s`
                  }}>
                    / {gap.plan}
                  </span>
                </div>

                {/* Not Executed Number */}
                <span className="text-[30px] font-bold tech-font leading-none opacity-90 min-w-[3.5rem] text-right" style={{
                  ...liquidStyleOrange,
                  animationDelay: `${-(index * 2.3) % 4}s`
                }}>
                  {Math.max(0, gap.plan - gap.act)}
                </span>

                {/* Executed / Planned Label - Color matched */}
                <div className="flex items-center gap-1 text-xs font-bold tracking-wider">
                  <span className={`${isDark ? 'text-sky-300' : 'text-sky-600'}`}>已执行</span>
                  <span className={`${isDark ? 'text-white/60' : 'text-slate-400'}`}>/</span>
                  <span className={`${isDark ? 'text-white' : 'text-slate-400'}`}>计划</span>
                </div>

                {/* Not Executed Label - Color matched */}
                <span className={`text-xs font-bold tracking-wider text-right ${isDark ? 'text-[#FB923C]' : 'text-orange-600'}`}>
                  待执行
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section >
  );
};