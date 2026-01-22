import React from 'react';
import { AirportData } from '../types';
import { SmallStatCard } from './SmallStatCard';
import { useTheme } from '../ThemeContext';

interface AirportPanelProps {
  data: AirportData;
  children?: React.ReactNode;
}

export const AirportPanel: React.FC<AirportPanelProps> = ({ data, children }) => {
  const { isDark } = useTheme();
  const isTeal = data.colorTheme === 'teal';
  const isAirportA = data.id === 'A';

  const themeClasses = {
    title: isTeal ? 'text-teal-700' : 'text-indigo-700',
    barGradient: isTeal ? 'from-teal-400 to-teal-600' : 'from-indigo-400 to-indigo-600',
    executedText: isDark
      ? (isTeal ? 'text-teal-300' : 'text-indigo-300')
      : (isTeal ? 'text-teal-600' : 'text-indigo-600'),
  };

  return (
    <section className="col-span-12 lg:col-span-4 flex flex-col h-full min-h-0 px-6 pb-4 pt-16 justify-between relative">
      <div className="flex flex-col gap-6 flex-shrink-0">
        <div className={`flex items-center gap-4 border-b pb-4 ${isAirportA ? 'justify-end' : 'justify-start'} ${isDark ? 'border-white/10' : 'border-slate-200/60'}`}>
          <div className={`order-first w-2 h-10 rounded-full ${isTeal ? 'bg-emerald-500' : 'bg-sky-500'}`}></div>
          <div className={isAirportA ? 'text-right' : 'text-left'}>
            <h2 className={`text-[48px] font-black tracking-tight ${isDark ? 'text-white drop-shadow-md' : 'text-slate-700 drop-shadow-soft'}`}>{data.name}</h2> {/* Explicit 48px */}
          </div>
        </div>

        <div className="flex flex-col gap-2 py-2">
          <div className={`flex items-end gap-4 ${isAirportA ? 'justify-end' : 'justify-start'}`}>
            <span className={`text-8xl lg:text-9xl font-black tech-font ${themeClasses.executedText} leading-none tracking-tighter drop-shadow-pop`}>
              {data.totalFlights.executed}
            </span>

            <div className={`flex flex-col pb-3 items-end`}>
              <span className={`text-4xl lg:text-5xl font-bold tech-font ${isDark ? 'text-white' : 'text-slate-400'}`}>
                / {data.totalFlights.planned}
              </span>
            </div>
          </div>

          <div className={`w-full h-5 rounded-full mt-2 overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200/60'}`}>
            <div
              className={`bg-gradient-to-r ${themeClasses.barGradient} h-full transition-all duration-1000 ease-out ${isDark ? 'shadow-[0_0_15px_currentColor]' : 'shadow-sm'}`}
              style={{ width: `${data.totalFlights.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-12 flex-1 content-start gap-y-12 py-12">
        <SmallStatCard data={data.metrics.domPax} colorTheme={data.colorTheme} align={isAirportA ? 'right' : 'left'} />
        <SmallStatCard data={data.metrics.domCgo} colorTheme={data.colorTheme} align={isAirportA ? 'right' : 'left'} />
        <SmallStatCard data={data.metrics.intPax} colorTheme={data.colorTheme} align={isAirportA ? 'right' : 'left'} />
        <SmallStatCard data={data.metrics.intCgo} colorTheme={data.colorTheme} align={isAirportA ? 'right' : 'left'} />
      </div>

      <div className={`mt-auto flex-shrink-0 pt-8 border-t ${children ? (isDark ? 'border-white/10' : 'border-slate-200/60') : 'border-transparent'}`}>
        {children ? (
          children
        ) : (
          <div className="invisible select-none" aria-hidden="true">
            <h3 className="text-2xl font-bold uppercase mb-6 tracking-wider">Placeholder</h3>
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col">
                <span className="text-xs font-bold mb-2">Spacer</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tech-font">000</span>
                </div>
                <div className="h-2 w-full mt-3"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const AirportAFooter: React.FC = () => {
  const { isDark } = useTheme();

  const agents = [
    { name: '地服客运', val: 200, total: 220, colorLight: 'text-emerald-600', colorDark: 'text-emerald-400' },
    { name: '祥鹏代理', val: 150, total: 180, colorLight: 'text-amber-600', colorDark: 'text-amber-400' },
    { name: '东航代理', val: 300, total: 400, colorLight: 'text-sky-600', colorDark: 'text-blue-400' }
  ];

  return (
    <div className="pb-2">
      <div className="grid grid-cols-3 gap-8">
        {agents.map((agent) => (
          <div key={agent.name} className="flex flex-col">
            <span className={`text-2xl font-black mb-6 tracking-wider ${isDark ? 'text-white drop-shadow-sm' : 'text-slate-700 drop-shadow-soft'}`}>{agent.name}</span>
            <div className="flex items-baseline gap-2 mb-3">
              <span className={`text-5xl font-black tech-font ${isDark ? agent.colorDark : agent.colorLight} ${isDark ? 'drop-shadow-md' : 'drop-shadow-soft'} leading-none tracking-tight`}>{agent.val}</span>
              <span className={`text-lg tech-font font-bold ${isDark ? 'text-white' : 'text-slate-400'}`}>/ {agent.total}</span>
            </div>
            <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-600/50' : 'bg-slate-300'}`}>
              <div
                className={`h-full ${isDark ? agent.colorDark : agent.colorLight} bg-current ${isDark ? 'opacity-80 shadow-[0_0_8px_currentColor]' : 'opacity-70'} rounded-full`}
                style={{ width: `${(agent.val / agent.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};