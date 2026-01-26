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
    barGradient: isTeal
      ? (isDark ? 'from-teal-500 to-teal-300' : 'from-teal-600 to-teal-400')
      : (isDark ? 'from-indigo-500 to-indigo-300' : 'from-indigo-600 to-indigo-400'),
    executedText: isDark
      ? (isTeal ? 'text-teal-300' : 'text-indigo-300')
      : (isTeal ? 'text-teal-600' : 'text-indigo-600'),
  };

  const liquidStyle: React.CSSProperties = {
    backgroundImage: isTeal
      ? (isDark
        ? 'linear-gradient(90deg, #5eead4 0%, #99f6e4 25%, #2dd4bf 50%, #99f6e4 75%, #5eead4 100%)'
        : 'linear-gradient(90deg, #0d9488 0%, #14b8a6 25%, #0f766e 50%, #14b8a6 75%, #0d9488 100%)')
      : (isDark
        ? 'linear-gradient(90deg, #a5b4fc 0%, #c7d2fe 25%, #818cf8 50%, #c7d2fe 75%, #a5b4fc 100%)'
        : 'linear-gradient(90deg, #4f46e5 0%, #6366f1 25%, #4338ca 50%, #6366f1 75%, #4f46e5 100%)'),
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

  return (
    <section className="col-span-12 lg:col-span-4 flex flex-col h-full min-h-0 px-6 pb-4 pt-16 justify-between relative">
      <style>
        {`
          @keyframes liquidFn {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}
      </style>
      <div className="flex flex-col gap-6 flex-shrink-0">
        <div className={`flex items-center gap-4 pb-4 ${isAirportA ? 'justify-end' : 'justify-start'}`}>
          <div className={`order-first w-2 h-10 rounded-full ${isTeal ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
          <div className={isAirportA ? 'text-right' : 'text-left'}>
            <h2 className={`text-[48px] font-black tracking-tight ${isDark ? 'text-white drop-shadow-md' : 'text-slate-700 drop-shadow-soft'}`}>{data.name}</h2> {/* Explicit 48px */}
          </div>
        </div>

        <div className="flex flex-col gap-2 py-0">
          <div className={`flex items-end gap-4 ${isAirportA ? 'justify-end' : 'justify-start'}`}>
            <span className="text-8xl lg:text-9xl font-black tech-font leading-none tracking-tighter drop-shadow-pop" style={liquidStyle}>
              {data.totalFlights.executed}
            </span>

            <div className={`flex flex-col pb-3 items-end`}>
              <span className="text-4xl lg:text-5xl font-bold tech-font" style={liquidStyleWhite}>
                / {data.totalFlights.planned}
              </span>
            </div>
          </div>

          <style>
            {`
              @keyframes progressFlow {
                0%, 100% { box-shadow: 0 0 10px currentColor, inset -4px 0 8px rgba(255,255,255,0.3); }
                50% { box-shadow: 0 0 20px currentColor, inset -8px 0 12px rgba(255,255,255,0.5); }
              }
              @keyframes liquidInternal {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              @keyframes liquidEdge {
                0%, 100% { border-top-right-radius: 40% 100%; border-bottom-right-radius: 60% 100%; }
                50% { border-top-right-radius: 60% 100%; border-bottom-right-radius: 40% 100%; }
              }
            `}
          </style>
          <div className={`w-full h-5 rounded-full mt-2 overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200/60'}`}>
            <div
              className={`bg-gradient-to-r ${themeClasses.barGradient} h-full transition-all duration-1000 ease-out rounded-l-full`}
              style={{
                width: `${data.totalFlights.percentage}%`,
                backgroundSize: '200% 200%',
                animation: isDark ? 'progressFlow 2s ease-in-out infinite, liquidInternal 5s ease-in-out infinite, liquidEdge 3s ease-in-out infinite' : undefined
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-12 flex-1 gap-y-12 pt-0 -mt-8 pb-8">
        <SmallStatCard data={data.metrics.domPax} colorTheme={data.colorTheme} align={isAirportA ? 'right' : 'left'} />
        <SmallStatCard data={data.metrics.domCgo} colorTheme={data.colorTheme} align={isAirportA ? 'right' : 'left'} />
        <SmallStatCard data={data.metrics.intPax} colorTheme={data.colorTheme} align={isAirportA ? 'right' : 'left'} />
        <SmallStatCard data={data.metrics.intCgo} colorTheme={data.colorTheme} align={isAirportA ? 'right' : 'left'} />
      </div>

      <div className={`mt-auto flex-shrink-0 pt-8 border-transparent`}>
        {children ? (
          children
        ) : (
          <div className="invisible select-none pb-2" aria-hidden="true">
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col">
                <span className="text-2xl font-black mb-6 tracking-wider">Placeholder</span>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl font-black tech-font leading-none tracking-tight">000</span>
                  <span className="text-lg tech-font font-bold">/ 000</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-600/50"></div>
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
                className={`h-full ${isDark ? agent.colorDark : agent.colorLight} bg-current ${isDark ? 'opacity-80' : 'opacity-70'} rounded-l-full`}
                style={{
                  width: `${(agent.val / agent.total) * 100}%`,
                  backgroundSize: '200% 200%',
                  animation: isDark ? 'progressFlow 2s ease-in-out infinite, liquidInternal 4s linear infinite, liquidEdge 3s ease-in-out infinite' : undefined
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};