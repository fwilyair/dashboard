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

        {/* Numbers and labels container - Grid layout */}
        <div className="grid grid-cols-[auto_auto] gap-x-2 gap-y-2 justify-center items-baseline">
          {/* Row 1: Numbers */}
          <span className={`text-8xl lg:text-9xl font-black tech-font tracking-tighter drop-shadow-pop leading-none text-right ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
            {data.totalExecuted}
          </span>
          <div className="flex items-baseline">
            <span className={`text-6xl lg:text-7xl font-bold tech-font tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-400'}`}>/</span>
            <span className={`text-6xl lg:text-7xl font-bold tech-font tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-400'}`}>
              {data.totalPlanned}
            </span>
          </div>
          {/* Row 2: Labels - aligned right under their numbers */}
          <span className={`text-sm font-bold uppercase tracking-widest text-right ${isDark ? 'text-[#7DD3FC]' : 'text-sky-700/70'}`}>总执行</span>
          <span className={`text-sm font-bold uppercase tracking-widest text-right ${isDark ? 'text-white' : 'text-slate-400'}`}>总计划</span>
        </div>
      </div>

      {/* Gap Analysis List - Horizontal Data Layout */}
      <div className="flex flex-col min-h-0 justify-start w-full px-8">
        <div className="flex flex-col gap-10">
          {data.gaps.map((gap, index) => (
            <div
              key={index}
              className={`flex items-center justify-between border-b py-5 last:border-0 rounded-lg px-2 ${isDark
                ? 'border-white/5'
                : 'border-slate-200/60'
                }`}
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