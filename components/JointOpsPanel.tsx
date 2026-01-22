import React from 'react';
import { JointOpsData } from '../types';
import { useTheme } from '../ThemeContext';

interface JointOpsPanelProps {
  data: JointOpsData;
}

export const JointOpsPanel: React.FC<JointOpsPanelProps> = ({ data }) => {
  const { isDark } = useTheme();

  return (
    <section className="col-span-12 lg:col-span-4 h-full flex flex-col min-h-0 px-4 pt-2 justify-start gap-6 pb-24 relative z-20">

      {/* Top Stats Area */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="text-center">
          <h2 className={`text-6xl font-black leading-none mb-2 tracking-wide ${isDark ? 'text-white' : 'text-slate-700'}`}>态势看板</h2>
        </div>

        {/* Flex container with bottom alignment for numbers */}
        <div className="flex justify-center items-end gap-4 w-full text-center">
          <div className="flex flex-col gap-1 items-center">
            <span className={`text-8xl lg:text-9xl font-black tech-font tracking-tighter drop-shadow-pop leading-none ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
              {data.totalExecuted.toLocaleString()}
            </span>
            <span className={`text-sm font-bold uppercase tracking-widest mt-2 ${isDark ? 'text-sky-200/80' : 'text-sky-700/70'}`}>已执行总计</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="flex items-end gap-2">
              <span className="text-6xl lg:text-7xl font-bold tech-font text-slate-400 tracking-tight leading-none">/</span>
              <span className={`text-6xl lg:text-7xl font-bold tech-font tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-400'}`}> {/* Plan to White */}
                {data.totalPlanned.toLocaleString()}
              </span>
            </div>
            <span className={`text-sm font-bold uppercase tracking-widest mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>总计划</span>
          </div>
        </div>
      </div>

      {/* Gap Analysis List - Horizontal Data Layout */}
      <div className="flex flex-col min-h-0 justify-start w-full px-2">
        <div className="flex flex-col gap-6">
          {data.gaps.map((gap, index) => (
            <div
              key={index}
              className={`flex items-center justify-between group border-b py-5 last:border-0 transition-colors rounded-lg px-2 ${isDark
                ? 'border-white/5 hover:bg-white/[0.02]'
                : 'border-slate-200/60 hover:bg-white/40'
                }`}
            >
              {/* Label Section - Large Font 48px */}
              <div className="flex-shrink-0">
                <span className={`text-[48px] font-black tracking-tight transition-colors ${isDark
                  ? 'text-white group-hover:text-sky-200 drop-shadow-md'
                  : 'text-slate-600 group-hover:text-sky-700 drop-shadow-soft'
                  }`}> {/* Explicit 48px */}
                  {gap.label}
                </span>
              </div>

              {/* Horizontal Data Layout - Two Row Structure */}
              <div className="flex flex-col items-end gap-1 flex-1">
                {/* Row 1: Numbers aligned by baseline */}
                <div className="flex items-baseline justify-end gap-10 w-full">
                  {/* Executed / Planned Numbers */}
                  <div className="flex items-baseline gap-2">
                    <span className={`text-6xl font-black tech-font tracking-tighter drop-shadow-pop leading-none ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                      {gap.act}
                    </span>
                    <span className={`text-3xl font-bold tech-font leading-none ${isDark ? 'text-white' : 'text-slate-400'}`}>
                      / {gap.plan}
                    </span>
                  </div>

                  {/* Not Executed Number */}
                  <span className={`text-[30px] font-bold tech-font leading-none opacity-90 min-w-[3.5rem] text-right ${isDark ? 'text-[#FB923C]' : 'text-orange-600'}`}>
                    {Math.max(0, gap.plan - gap.act)}
                  </span>
                </div>

                {/* Row 2: Labels */}
                <div className="flex justify-end gap-10 w-full">
                  <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>已执行 / 计划</span>
                  <span className={`text-xs font-bold uppercase tracking-widest min-w-[3.5rem] text-right ${isDark ? 'text-[#FB923C]' : 'text-orange-600/60'}`}>未执行</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};