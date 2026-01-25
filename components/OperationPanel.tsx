import React from 'react';
import { useTheme } from '../ThemeContext';
import { OPERATION_DATA, formatMetricValue, OperationMetric } from '../operationConstants';

// Cell Component for Matrix Intersection
const MatrixCell: React.FC<{
    metric: OperationMetric;
    type: 'flights' | 'passengers' | 'cargo';
    colorTheme: 'indigo' | 'emerald' | 'amber';
}> = ({ metric, type, colorTheme }) => {
    const { isDark } = useTheme();

    const colors = {
        indigo: {
            primary: isDark ? 'text-indigo-300' : 'text-indigo-700', // Darker for light mode
            bar: isDark ? 'from-indigo-500 to-indigo-300' : 'from-indigo-600 to-indigo-500', // Richer gradient
        },
        emerald: {
            primary: isDark ? 'text-emerald-300' : 'text-emerald-700', // Darker for light mode
            bar: isDark ? 'from-emerald-500 to-emerald-300' : 'from-emerald-600 to-emerald-500', // Richer gradient
        },
        amber: {
            primary: isDark ? 'text-amber-300' : 'text-amber-700', // Darker for light mode
            bar: isDark ? 'from-amber-500 to-amber-300' : 'from-amber-600 to-amber-500', // Richer gradient
        },
    };

    const theme = colors[colorTheme];
    // Pass 'false' for isTarget to get decimals
    const formatted = formatMetricValue(metric.actualComplete, type, false);

    // Formatter helpers for grid details - no unit since it's in the title row now
    const fmtDetail = (val: number) => {
        // Keep 2 decimals for consistency
        const f = formatMetricValue(val, type, false);
        return f.val;
    };

    // Year target formatted with 'true' to strip decimals
    const yearTargetFormatted = formatMetricValue(metric.yearTarget, type, true);

    const textWhite = isDark ? 'text-white' : 'text-slate-600';

    // Calculate gradient fill
    // We want the text to be filled with the theme color up to the progress ratio
    // The rest should be faded/dark
    const fillPercent = Math.min(metric.progressPercent * 10, 100); // Wait, progressPercent is e.g. 7.5 (meaning 7.5%? OR 7.5/100?). 
    // In RAW_DATA: "progress: 7.5".  If target is 380,000 and actual is 28,650 -> 28650/380000 = 0.075 = 7.5%.
    // So percentage is 7.5.
    // However, the progress *bar* code uses `metric.progressPercent * 10`? 
    // Code says: `${Math.min(metric.progressPercent * 10, 100)}%`
    // If percent is 7.5, then width is 75%?
    // Wait. 28,650 / 380,000 = 7.53%.
    // If the progress bar is showing 75% full for 7.5% actual progress, that's misleading visually?
    // User requested "Ratio consistent with ... progress bar".
    // I should use the SAME calculation as the progress bar.
    // The previous progress bar code was: width: `${Math.min(metric.progressPercent * 10, 100)}%`
    // Why did I use * 10? Maybe existing data was low? 
    // Let's look at `operationConstants.ts`: 
    // airportA.flights: target 380000, actual 28650. 28650/380000 = 0.075 (7.5%).
    // If I multiply by 10, I get 75%. This seems to assume the bar is "10x scale" or something?
    // But usually progress bar = progress %.
    // If the user wants 7.5% to look like 75%, that's weird.
    // But the request says "consistent with the ... progress bar below".
    // So I will replicate the logic: `metric.progressPercent * 10`.
    // Wait, let me check the screenshot or previous code understanding.
    // In previous code: `width: ${Math.min(metric.progressPercent * 10, 100)}%`.
    // Maybe "Year Target" vs "Monthly Target"? 28k vs 380k. 
    // If the bar represents "Yearly Progress" (7.5%), it should be small.
    // If it represents "Monthly/Planned Progress", maybe? 
    // I will stick to the existing logic for consistency as requested.

    // Gradient colors
    // Filled part: theme.primary (text color) or theme.bar (bg color)? User asked "Use gradient fill...". Usually means text color.
    // But `theme.bar` is the color of the bar below.
    // Let's use `theme.primary` variable usually maps to a text color (text-sky-300).
    // I need a CSS color value. Tailwind class `text-sky-300` -> #7dd3fc (approx).
    // To implement `linear-gradient` inline, I need actual color codes or `var(--tw-colors-sky-300)`.
    // I will use a helper or simple mapping since I can't easily get Tailwind vars in inline styles without full config access.
    // I'll map 'sky', 'emerald', 'amber' to hex/rgba.

    const themeColors = {
        sky: isDark ? '#7dd3fc' : '#0284c7', // sky-300 / sky-600
        emerald: isDark ? '#6ee7b7' : '#059669', // emerald-300 / emerald-600
        amber: isDark ? '#fcd34d' : '#d97706', // amber-300 / amber-600
    };

    // User requested "Victory Gold" for Year Target, distinct from group colors
    // Using a bright, rich gold. 
    const goldColor = isDark ? '#fbbf24' : '#d97706'; // amber-400 : amber-600 (or yellow-400 #facc15)
    // Actually, "Victory Gold" might be better as #FFD700 (Gold) or close to it.
    // Let's use a standard nice gold -> text-yellow-400 is #facc15.
    const victoryGold = '#facc15';

    const activeColor = victoryGold; // Unified color for Year Target
    const inactiveColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
    // Use true percentage (0-100) directly calculated in constants
    const pct = Math.min(metric.progressPercent, 100).toFixed(2);

    return (
        <div className="flex flex-col h-full justify-center px-4 border-l-2 border-transparent"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}>

            {/* Top Row: Actual (Left) + Target (Right) */}
            <div className="flex justify-between items-baseline mb-2">
                {/* Left: Actual Complete */}
                <div className="flex flex-col items-start gap-1 mb-1">
                    <span className={`text-5xl font-bold tech-font tracking-tight leading-none ${theme.primary}`}>
                        {formatted.val}
                    </span>
                    <span className={`text-lg font-medium ${textWhite}`}>累计完成</span>
                </div>

                <style>
                    {`
                        @keyframes liquidSurge {
                            0% { background-position: calc(var(--bg-pos) - 3%) 2%; }
                            20% { background-position: calc(var(--bg-pos) + 2%) 5%; }
                            40% { background-position: calc(var(--bg-pos) + 4%) 0%; }
                            60% { background-position: calc(var(--bg-pos) + 1%) -5%; }
                            80% { background-position: calc(var(--bg-pos) - 2%) -2%; }
                            100% { background-position: calc(var(--bg-pos) - 3%) 2%; }
                        }
                    `}
                </style>
                {/* Right: Year Target with Water Edge Shake Effect */}
                <div className="flex items-baseline">
                    <span
                        className="text-7xl lg:text-8xl font-black tech-font tracking-tight leading-none italic pr-4"
                        style={{
                            '--bg-pos': `${100 - parseFloat(pct)}%`,
                            backgroundImage: `
                                linear-gradient(${type === 'flights' ? 82 : (type === 'passengers' ? 88 : 85)}deg, 
                                    ${activeColor} 45%, 
                                    rgba(255,255,255,0.8) 50%, 
                                    ${inactiveColor} 55%
                                )
                            `,
                            backgroundSize: type === 'flights' ? '240% 160%' : (type === 'passengers' ? '260% 140%' : '250% 150%'),
                            backgroundPosition: 'var(--bg-pos) 0',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                            display: 'inline-block',
                            animation: `liquidSurge ${type === 'flights' ? 5 : (type === 'passengers' ? 7 : 6)}s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`
                        } as React.CSSProperties}
                    >
                        {yearTargetFormatted.val}
                    </span>
                </div>
            </div>

            {/* Progress Bar with percentage inline */}
            <style>
                {`
                  @keyframes progressFlow {
                    0%, 100% { box-shadow: 0 0 8px currentColor, inset -4px 0 8px rgba(255,255,255,0.3); }
                    50% { box-shadow: 0 0 16px currentColor, inset -8px 0 12px rgba(255,255,255,0.5); }
                  }
                  @keyframes liquidInternal {
                    0% { background-position: 10% 10%; }
                    25% { background-position: 90% 30%; }
                    50% { background-position: 20% 80%; }
                    75% { background-position: 80% 60%; }
                    100% { background-position: 10% 10%; }
                  }
                  @keyframes liquidEdge {
                    0%, 100% { border-top-right-radius: 40% 100%; border-bottom-right-radius: 60% 100%; }
                    50% { border-top-right-radius: 60% 100%; border-bottom-right-radius: 40% 100%; }
                  }
                `}
            </style>
            <div className="flex items-start gap-3 mb-4">
                <div className={`h-3 flex-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-600/50' : 'bg-slate-300'}`}>
                    <div
                        className={`h-full bg-gradient-to-r ${theme.bar} rounded-l-full`}
                        style={{
                            width: `${pct}%`,
                            backgroundSize: '400% 400%',
                            animation: isDark ? 'progressFlow 2s ease-in-out infinite, liquidInternal 10s ease-in-out infinite, liquidEdge 3s ease-in-out infinite' : undefined
                        }}
                    />
                </div>
                <span className={`text-[36px] font-bold tech-font leading-none -mt-2 ${theme.primary} whitespace-nowrap`}>{metric.progressPercent.toFixed(2)}%</span>
            </div>

            {/* Details Grid */}
            {/* Details Grid */}
            {(() => {
                // Dynamic label for ratio based on airport
                const ratioLabels: Record<string, string> = {
                    emerald: '占A全场比例',
                    sky: '占B全场比例',
                    amber: '占两场全场比例',
                };
                const ratioLabel = ratioLabels[colorTheme] || '两场占比';
                return (
                    <div className="grid grid-cols-3 items-end">
                        <div className="flex flex-col items-start gap-0.5">
                            <span className={`text-5xl font-bold tech-font tracking-tight leading-none ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                {fmtDetail(metric.plannedComplete)}
                            </span>
                            <span className={`text-base ${textWhite}`}>计划完成</span>
                        </div>
                        <div className="flex flex-col items-start gap-0.5">
                            <span className={`text-4xl font-bold tech-font ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                {fmtDetail(metric.dailyRequired)}
                            </span>
                            <span className={`text-base ${textWhite}`}>日均达标</span>
                        </div>
                        <div className="flex flex-col items-start gap-0.5">
                            <span className={`text-4xl font-bold tech-font ${theme.primary}`}>
                                {metric.twoAirportRatio}%
                            </span>
                            <span className={`text-base ${textWhite}`}>{ratioLabel}</span>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

export const OperationPanel: React.FC = () => {
    const { isDark } = useTheme();

    // Unit labels for each metric type
    const metricUnits = {
        flights: '架次',
        passengers: '万',
        cargo: '万吨',
    };

    // Global text color for headers
    const headerTextColor = isDark ? 'text-white' : 'text-slate-800';

    return (
        <div className="w-full h-full flex flex-col px-8 pb-4 overflow-hidden">
            {/* Header Title */}
            <div className="text-center mb-6 pt-2 flex-shrink-0">
                <h2 className={`text-6xl font-black leading-none tracking-wide ${isDark ? 'text-white' : 'text-slate-700'}`}>
                    运营看板
                </h2>
            </div>

            {/* Matrix Grid Layout */}
            {/* Cols: [Label 200px] [A Airport 1fr] [B Airport 1fr] [Combined 1fr] */}
            <div className="flex-1 grid grid-cols-[auto_1fr_1fr_1fr] gap-x-8 gap-y-8 min-h-0">

                {/* --- Row 1 Header (Airports) --- Swapped colors: A=emerald, B=sky */}
                <div className={`col-start-2 flex items-center gap-4 border-b pb-2 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                    <div className="w-2 h-10 rounded-full bg-emerald-500"></div>
                    <h3 className={`text-5xl font-black ${headerTextColor}`}>A机场</h3>
                </div>
                <div className={`col-start-3 flex items-center gap-4 border-b pb-2 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                    <div className="w-2 h-10 rounded-full bg-indigo-500"></div>
                    <h3 className={`text-5xl font-black ${headerTextColor}`}>B机场</h3>
                </div>
                <div className={`col-start-4 flex items-center gap-4 border-b pb-2 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                    <div className="w-2 h-10 rounded-full bg-amber-500"></div>
                    <h3 className={`text-5xl font-black ${headerTextColor}`}>两场合计</h3>
                </div>


                {/* --- Row 2: Flights --- */}
                {/* Label with Unit */}
                <div className={`flex items-center justify-end px-4 border-r ${isDark ? 'border-white/[0.02]' : 'border-slate-200/50'}`}>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-700'}`}>
                            航班架次
                        </span>
                        <span className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {metricUnits.flights}
                        </span>
                    </div>
                </div>
                {/* Cells - Swapped colors */}
                <MatrixCell metric={OPERATION_DATA.airportA.metrics.flights} type="flights" colorTheme="emerald" />
                <MatrixCell metric={OPERATION_DATA.airportB.metrics.flights} type="flights" colorTheme="indigo" />
                <MatrixCell metric={OPERATION_DATA.combined.metrics.flights} type="flights" colorTheme="amber" />


                {/* --- Row 3: Passengers --- */}
                {/* Label with Unit */}
                <div className={`flex items-center justify-end px-4 border-r ${isDark ? 'border-white/[0.02]' : 'border-slate-200/50'}`}>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-700'}`}>
                            旅客吞吐量
                        </span>
                        <span className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {metricUnits.passengers}
                        </span>
                    </div>
                </div>
                {/* Cells - Swapped colors */}
                <MatrixCell metric={OPERATION_DATA.airportA.metrics.passengers} type="passengers" colorTheme="emerald" />
                <MatrixCell metric={OPERATION_DATA.airportB.metrics.passengers} type="passengers" colorTheme="indigo" />
                <MatrixCell metric={OPERATION_DATA.combined.metrics.passengers} type="passengers" colorTheme="amber" />


                {/* --- Row 4: Cargo --- */}
                {/* Label with Unit */}
                <div className={`flex items-center justify-end px-4 border-r ${isDark ? 'border-white/[0.02]' : 'border-slate-200/50'}`}>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-700'}`}>
                            货邮吞吐量
                        </span>
                        <span className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {metricUnits.cargo}
                        </span>
                    </div>
                </div>
                {/* Cells - Swapped colors */}
                <MatrixCell metric={OPERATION_DATA.airportA.metrics.cargo} type="cargo" colorTheme="emerald" />
                <MatrixCell metric={OPERATION_DATA.airportB.metrics.cargo} type="cargo" colorTheme="indigo" />
                <MatrixCell metric={OPERATION_DATA.combined.metrics.cargo} type="cargo" colorTheme="amber" />

            </div>
        </div>
    );
};
