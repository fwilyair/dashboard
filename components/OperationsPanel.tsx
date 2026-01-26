import React, { useMemo } from 'react';
import { OperationsPageData } from '../operationsTypes';
import { METRIC_LABELS } from '../operationsConstants';
import { useTheme } from '../ThemeContext';

interface OperationsPanelProps {
    data: OperationsPageData;
}

// Get Unified Bar Gradient (Fixed Theme - kept for progress bars)
const getUnifiedBarGradient = (airportTheme: 'teal' | 'indigo', isDark: boolean) => {
    if (airportTheme === 'teal') return isDark ? 'from-teal-500 to-teal-300' : 'from-teal-600 to-teal-400';
    return isDark ? 'from-indigo-500 to-indigo-300' : 'from-indigo-600 to-indigo-400';
};

// Metric Cell Component
const MetricValueCell: React.FC<{
    value: number;
    isDark: boolean;
    airportTheme: 'teal' | 'indigo';
    rowMin: number;
    rowMax: number;
}> = ({ value, isDark, airportTheme, rowMin, rowMax }) => {
    let barGradient = '';
    let textColorClass = '';

    if (value === rowMax) {
        textColorClass = isDark ? 'text-orange-400' : 'text-orange-600';
        barGradient = isDark ? 'from-orange-500 to-orange-300' : 'from-orange-600 to-orange-400';
    } else if (value === rowMin) {
        textColorClass = isDark ? 'text-cyan-400' : 'text-cyan-600';
        barGradient = isDark ? 'from-cyan-500 to-cyan-300' : 'from-cyan-600 to-cyan-400';
    } else {
        // Rest - White (Dark) or Slate (Light)
        textColorClass = isDark ? 'text-white' : 'text-slate-600';
        barGradient = isDark ? 'from-slate-100 to-slate-300' : 'from-slate-500 to-slate-400'; // White-ish gradient
    }

    return (
        <div className="flex flex-col items-center justify-end w-full px-2">
            {/* Value Number */}
            <span
                className={`text-6xl lg:text-7xl font-black tech-font mb-1 leading-none ${textColorClass} ${isDark ? 'drop-shadow-md' : 'drop-shadow-soft'}`}
                style={value === rowMax ? { animation: 'textBreathe 4s ease-in-out infinite', display: 'inline-block' } : {}}
            >
                {value.toFixed(1)}<span className="text-4xl ml-[2px]">%</span>
            </span>


        </div>
    );
};

export const OperationsPanel: React.FC<OperationsPanelProps> = ({ data }) => {
    const { isDark } = useTheme();

    const metricKeys: (keyof typeof METRIC_LABELS)[] = [
        'takeoffRate',
        'departureRate',
        'releaseRate',
        'peakDepartureRate',
        'cabinDoorRate',
        'cargoDoorRate'
    ];

    return (
        <div className="w-full h-full flex flex-col px-8">
            <style>
                {`
                    @keyframes textBreathe {
                        0%, 100% { filter: brightness(1); text-shadow: 0 0 0px transparent; }
                        50% { filter: brightness(1.3); text-shadow: 0 0 15px rgba(251, 146, 60, 0.8); }
                    }
                `}
            </style>
            {/* 顶部标题 */}
            <div className="text-center mb-6 pt-2">
                <h2 className={`text-6xl font-black leading-none mb-2 tracking-wide ${isDark ? 'text-white' : 'text-slate-700'}`}>
                    指标看板
                </h2>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-h-0 flex flex-col pb-4">

                {/* Header Row */}
                <div className="flex items-end pb-2 mb-2"> {/* Reduced pb-6 to pb-2 */}
                    <div className="w-[420px] flex-shrink-0"></div>

                    {/* A 机场 Header */}
                    <div className="flex-[4] flex flex-col px-6">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-2 h-10 rounded-full bg-emerald-500"></div>
                            <h3 className={`text-[48px] font-black tracking-tight text-left ${isDark ? 'text-white drop-shadow-lg' : 'text-slate-800'}`}>
                                {data.airportA.name}
                            </h3>
                        </div>
                        <div className="flex justify-around gap-4">
                            {data.airportA.agents.map((agent, index) => (
                                <div key={index} className="flex-1 text-center min-w-[120px]">
                                    {/* Increased Font Size: text-2xl -> text-3xl */}
                                    <span className={`text-[36px] font-black ${isDark ? 'text-white' : 'text-slate-700'} filter drop-shadow-sm`}>
                                        {agent.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* B 机场 Header */}
                    <div className="flex-[1.5] flex flex-col px-6">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-2 h-10 rounded-full bg-indigo-500"></div>
                            <h3 className={`text-[48px] font-black tracking-tight text-left ${isDark ? 'text-white drop-shadow-lg' : 'text-slate-800'}`}>
                                {data.airportB.name}
                            </h3>
                        </div>
                        <div className="flex justify-center gap-4">
                            {data.airportB.agents.map((agent, index) => (
                                <div key={index} className="w-full text-center">
                                    {/* Increased Font Size: text-2xl -> text-3xl */}
                                    <span className={`text-[36px] font-black ${isDark ? 'text-white' : 'text-slate-700'} filter drop-shadow-sm`}>
                                        {agent.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Data Rows */}
                <div className="flex-1 flex flex-col">
                    {metricKeys.map((key) => {
                        // Calculate Row Min/Max ON THE FLY
                        let rowVals: number[] = [];
                        data.airportA.agents.forEach(a => rowVals.push((a[key] as { value: number }).value));
                        data.airportB.agents.forEach(a => rowVals.push((a[key] as { value: number }).value));
                        const rowMax = Math.max(...rowVals);
                        const rowMin = Math.min(...rowVals);

                        return (
                            <div key={key} className="flex-1 flex items-end last:border-0 pb-2">

                                {/* Label Column - Changed to White - Right Aligned - Reduced padding */}
                                <div className="w-[420px] flex-shrink-0 pr-4 mb-[2px] text-right">
                                    <span className={`text-[42px] font-bold tracking-tight whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                        {METRIC_LABELS[key]}
                                    </span>
                                </div>

                                {/* A 机场 Data */}
                                <div className="flex-[4] flex justify-around items-end gap-4 px-6">
                                    {data.airportA.agents.map((agent, index) => (
                                        <div key={index} className="flex-1 min-w-[120px]">
                                            <MetricValueCell
                                                value={(agent[key] as { value: number }).value}
                                                isDark={isDark}
                                                airportTheme={data.airportA.colorTheme}
                                                rowMin={rowMin}
                                                rowMax={rowMax}
                                            />
                                        </div>
                                    ))}
                                </div>



                                {/* B 机场 Data */}
                                <div className="flex-[1.5] flex justify-center items-end gap-4 px-6">
                                    {data.airportB.agents.map((agent, index) => (
                                        <div key={index} className="w-full">
                                            <MetricValueCell
                                                value={(agent[key] as { value: number }).value}
                                                isDark={isDark}
                                                airportTheme={data.airportB.colorTheme}
                                                rowMin={rowMin}
                                                rowMax={rowMax}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};
