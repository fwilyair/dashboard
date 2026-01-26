import React from 'react';
import { cn } from '../lib/utils';
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
            primary: isDark ? 'text-indigo-300' : 'text-indigo-600',
            bar: isDark ? 'from-indigo-500 to-indigo-300' : 'from-indigo-600 to-indigo-400',
        },
        emerald: {
            primary: isDark ? 'text-emerald-300' : 'text-emerald-600',
            bar: isDark ? 'from-emerald-500 to-emerald-300' : 'from-emerald-600 to-emerald-400',
        },
        amber: {
            primary: isDark ? 'text-amber-300' : 'text-amber-600',
            bar: isDark ? 'from-amber-500 to-amber-300' : 'from-amber-600 to-amber-400',
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

    const themeColors = {
        sky: isDark ? '#7dd3fc' : '#0284c7', // sky-300 / sky-600
        emerald: isDark ? '#6ee7b7' : '#059669', // emerald-300 / emerald-600
        amber: isDark ? '#fcd34d' : '#d97706', // amber-300 / amber-600
    };

    // User requested "Victory Gold" for Year Target
    const victoryGold = '#facc15';
    const activeColor = victoryGold;
    const inactiveColor = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
    const pct = Math.min(metric.progressPercent, 100).toFixed(2);

    return (
        // Removed border-l-2 and border style
        <div className="flex flex-col h-full justify-center px-4">

            {/* Top Row: Actual (Left) + Target (Right) */}
            <div className="flex justify-between items-baseline mb-2">
                {/* Left: Actual Complete */}
                <div className="flex flex-col items-start gap-1 mb-1">
                    {/* Reduced text-5xl to text-4xl */}
                    <span className={cn("text-5xl font-bold tech-font tracking-tight leading-none", theme.primary)}>
                        {formatted.val}
                    </span>
                    <span className={`text-2xl font-medium ${textWhite}`}>累计完成</span>
                </div>


                {/* Right: Year Target with Water Edge Shake Effect */}
                <div className="flex items-baseline">
                    <span
                        // Reduced text-7xl/8xl to text-6xl/7xl
                        className="text-8xl lg:text-9xl font-black tech-font tracking-tight leading-none italic pr-4"
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

            <div className="flex items-start gap-3 mb-2"> {/* Reduced mb-4 to mb-2 */}
                <div className={`h-2.5 flex-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-600/50' : 'bg-slate-300'}`}> {/* h-3 -> h-2.5 */}
                    <div
                        className={`h-full bg-gradient-to-r ${theme.bar} rounded-l-full`}
                        style={{
                            width: `${pct}%`,
                            backgroundSize: '400% 400%',
                            animation: isDark ? 'progressFlow 2s ease-in-out infinite, liquidInternal 10s ease-in-out infinite, liquidEdge 3s ease-in-out infinite' : undefined
                        }}
                    />
                </div>
                {/* Reduced text-3xl to text-2xl */}
                <span className={`text-5xl italic font-black tech-font leading-none -mt-2 ${theme.primary} whitespace-nowrap`}>{metric.progressPercent.toFixed(2)}%</span>
            </div>

            {/* Details Grid */}
            {(() => {
                const ratioLabels: Record<string, string> = {
                    emerald: '占A全场比例',
                    sky: '占B全场比例',
                    amber: '两场合计占比', // Shortened
                };
                const ratioLabel = ratioLabels[colorTheme] || '两场占比';
                return (
                    <div className="grid grid-cols-3 items-end">
                        <div className="flex flex-col items-start gap-0.5">
                            {/* Reduced to text-4xl */}
                            <span className={`text-5xl font-bold tech-font tracking-tight leading-none ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                {fmtDetail(metric.plannedComplete)}
                            </span>
                            <span className={`text-xl ${textWhite}`}>计划完成</span>
                        </div>
                        <div className="flex flex-col items-start gap-0.5">
                            {/* Reduced to text-3xl */}
                            <span className={`text-4xl font-bold tech-font ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                {fmtDetail(metric.dailyRequired)}
                            </span>
                            <span className={`text-xl ${textWhite}`}>日均达标</span>
                        </div>
                        <div className="flex flex-col items-start gap-0.5">
                            {/* Reduced to text-3xl */}
                            <span className={`text-4xl font-bold tech-font ${theme.primary}`}>
                                {metric.twoAirportRatio}%
                            </span>
                            <span className={`text-xl ${textWhite}`}>{ratioLabel}</span>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

// Row Label Cell Component for Alignment
const RowLabelCell: React.FC<{
    label: string;
    unit: string;
    isDark: boolean;
}> = ({ label, unit, isDark }) => {
    // Structure must MIRROR MatrixCell to ensure alignment
    // Top Row: Invisible Placeholder matching text-9xl height
    // Middle Row: VSISIBLE Label
    // Bottom Row: Invisible Placeholder matching details height

    return (
        <div className="flex flex-col h-full justify-center px-4">
            {/* Top Placeholder - Reduced to text-sm to pull label up */}
            <div className="flex justify-between items-baseline mb-2 opacity-0 pointer-events-none select-none" aria-hidden="true">
                <div className="flex flex-col items-start gap-1 mb-1">
                    <span className="text-sm font-bold tech-font tracking-tight leading-none text-transparent">0</span>
                    <span className="text-2xl font-medium text-transparent">Total</span>
                </div>
                <div className="flex items-baseline">
                    <span className="text-sm font-black tech-font tracking-tight leading-none italic pr-4 text-transparent">
                        0
                    </span>
                </div>
            </div>

            {/* Middle Row - THE ACTUAL LABEL */}
            {/* Matches Progress Bar Gap/Margin */}
            <div className="flex items-baseline justify-end gap-3 mb-2">
                <span className={`text-5xl font-black text-right ${isDark ? 'text-white' : 'text-slate-700'}`}>
                    {label}
                </span>
                <span className={`text-2xl font-medium text-left w-[80px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {unit}
                </span>
            </div>

            {/* Bottom Placeholder */}
            {/* Matches Details Grid Height */}
            <div className="grid grid-cols-3 items-end opacity-0 pointer-events-none select-none" aria-hidden="true">
                <div className="flex flex-col items-start gap-0.5">
                    <span className="text-4xl font-bold tech-font tracking-tight leading-none text-transparent">0</span>
                    <span className="text-xl text-transparent">Plan</span>
                </div>
            </div>
        </div>
    );
};

export const OperationPanel: React.FC = () => {
    const { isDark } = useTheme();

    const metricUnits = {
        flights: '架次',
        passengers: '万',
        cargo: '万吨',
    };

    const headerTextColor = isDark ? 'text-white' : 'text-slate-800';

    return (
        // Reduced padding pb-4 -> pb-2
        <div className="w-full h-full flex flex-col px-8 pb-2 overflow-hidden">
            {/* Header Title */}
            <div className="text-center mb-2 pt-2 flex-shrink-0">
                <h2 className={`text-7xl font-black leading-none tracking-wide ${isDark ? 'text-white' : 'text-slate-700'}`}>
                    运营看板
                </h2>
            </div>

            {/* Matrix Grid Layout */}
            {/* Reduced gaps: gap-x-4, gap-y-2 */}
            <div className="flex-1 grid grid-cols-[auto_1fr_1fr_1fr] gap-x-4 gap-y-2 min-h-0">

                {/* --- Row 1 Header (Airports) --- Swapped colors: A=emerald, B=sky */}
                {/* Removed border-b */}
                <div className="col-start-2 flex items-center gap-4 pb-1">
                    <div className="w-2 h-10 rounded-full bg-emerald-500"></div>
                    <h3 className={`text-5xl font-black ${headerTextColor}`}>A机场</h3>
                </div>
                <div className="col-start-3 flex items-center gap-4 pb-1">
                    <div className="w-2 h-10 rounded-full bg-indigo-500"></div>
                    <h3 className={`text-5xl font-black ${headerTextColor}`}>B机场</h3>
                </div>
                <div className="col-start-4 flex items-center gap-4 pb-1">
                    <div className="w-2 h-10 rounded-full bg-amber-500"></div>
                    <h3 className={`text-5xl font-black ${headerTextColor}`}>两场合计</h3>
                </div>


                {/* --- Row 2: Flights --- */}
                {/* Removed border-r */}
                <RowLabelCell label="航班架次" unit={metricUnits.flights} isDark={isDark} />
                <MatrixCell metric={OPERATION_DATA.airportA.metrics.flights} type="flights" colorTheme="emerald" />
                <MatrixCell metric={OPERATION_DATA.airportB.metrics.flights} type="flights" colorTheme="indigo" />
                <MatrixCell metric={OPERATION_DATA.combined.metrics.flights} type="flights" colorTheme="amber" />


                {/* --- Row 3: Passengers --- */}
                {/* Removed border-r */}
                <RowLabelCell label="旅客吞吐量" unit={metricUnits.passengers} isDark={isDark} />
                <MatrixCell metric={OPERATION_DATA.airportA.metrics.passengers} type="passengers" colorTheme="emerald" />
                <MatrixCell metric={OPERATION_DATA.airportB.metrics.passengers} type="passengers" colorTheme="indigo" />
                <MatrixCell metric={OPERATION_DATA.combined.metrics.passengers} type="passengers" colorTheme="amber" />


                {/* --- Row 4: Cargo --- */}
                {/* Removed border-r */}
                <RowLabelCell label="货邮吞吐量" unit={metricUnits.cargo} isDark={isDark} />
                <MatrixCell metric={OPERATION_DATA.airportA.metrics.cargo} type="cargo" colorTheme="emerald" />
                <MatrixCell metric={OPERATION_DATA.airportB.metrics.cargo} type="cargo" colorTheme="indigo" />
                <MatrixCell metric={OPERATION_DATA.combined.metrics.cargo} type="cargo" colorTheme="amber" />

            </div>
        </div>
    );
};
