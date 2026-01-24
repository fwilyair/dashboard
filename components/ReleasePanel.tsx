import React from 'react';
import { useTheme } from '../ThemeContext';
import { HourlyFlightChart } from './HourlyFlightChart';
import { HOURLY_FLIGHT_DATA_A, HOURLY_FLIGHT_DATA_B } from '../operationConstants';

export const ReleasePanel: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <div className="w-full h-full flex flex-col px-8 pb-4">
            {/* 顶部标题 + 图例 */}
            <div className="text-center mb-4 pt-2 flex-shrink-0">
                <h2 className={`text-6xl font-black leading-none tracking-wide ${isDark ? 'text-white' : 'text-slate-700'}`}>
                    放行看板
                </h2>

                {/* Shared Legend */}
                <div className="flex items-center justify-center gap-8 mt-4 text-sm font-bold">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className={`${isDark ? 'text-white' : 'text-blue-600'}`}>计划离港</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600/60 rounded-sm"></div>
                        <span className={`${isDark ? 'text-white' : 'text-blue-700'}`}>实际离港</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className={`${isDark ? 'text-white' : 'text-emerald-600'}`}>计划进港</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-600/60 rounded-sm"></div>
                        <span className={`${isDark ? 'text-white' : 'text-emerald-700'}`}>实际进港</span>
                    </div>
                </div>
            </div>

            {/* Charts Container - Minimized gap for axis */}
            <div className="flex-1 flex flex-col gap-1 min-h-0">
                {/* Airport A Chart */}
                <div className="flex-1 flex flex-col min-h-0">
                    <HourlyFlightChart
                        title="A 机场"
                        data={HOURLY_FLIGHT_DATA_A}
                        colorTheme="teal"
                        className="flex-1"
                        showXAxisLabels={false}
                        delayOffset={0}
                    />
                </div>

                {/* Shared Time Axis */}
                <div className="h-10 flex-shrink-0 w-full select-none">
                    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full">
                        {HOURLY_FLIGHT_DATA_A.map((d, i) => {
                            const width = 1200;
                            const padding = { left: 40, right: 40 };
                            const step = (width - padding.left - padding.right) / 24;
                            const x = padding.left + i * step + step / 2;

                            // Time Logic
                            const now = new Date();
                            let currentH = now.getHours();
                            if (currentH < 4) currentH += 24;
                            let dataH = parseInt(d.hour);
                            if (dataH < 4) dataH += 24;
                            const isPast = dataH <= currentH;

                            return (
                                <text
                                    key={i} x={x} y={28}
                                    textAnchor="middle"
                                    fill={isPast ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#64748b" : "#94a3b8")}
                                    fontSize="24"
                                    fontWeight={isPast ? "bold" : "normal"}
                                    className="tech-font"
                                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                                >{d.hour}</text>
                            );
                        })}
                    </svg>
                </div>

                {/* Airport B Chart */}
                <div className="flex-1 flex flex-col min-h-0">
                    <HourlyFlightChart
                        title="B 机场"
                        data={HOURLY_FLIGHT_DATA_B}
                        colorTheme="indigo"
                        className="flex-1"
                        showXAxisLabels={false}
                        titlePosition="bottom"
                        delayOffset={12}
                    />
                </div>
            </div>
        </div>
    );
};
