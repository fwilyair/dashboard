import React, { useMemo, useState, useEffect } from 'react';
import { HourlyFlightData } from '../operationConstants';
import { useTheme } from '../ThemeContext';

interface HourlyFlightChartProps {
    title: string;
    data: HourlyFlightData[];
    colorTheme?: 'teal' | 'indigo';
    className?: string;
    showXAxisLabels?: boolean;
    titlePosition?: 'top' | 'bottom';
    delayOffset?: number;
}

export const HourlyFlightChart: React.FC<HourlyFlightChartProps> = ({
    title,
    data,
    colorTheme = 'teal',
    className,
    showXAxisLabels = true,
    titlePosition = 'top',
    delayOffset = 0
}) => {
    const { isDark } = useTheme();

    // Sync animation with absolute time
    const [pathStyles, setPathStyles] = useState<{ dep: React.CSSProperties, arr: React.CSSProperties }>({
        dep: { animationDelay: '0s', opacity: 0 }, // Init hidden to prevent flash
        arr: { animationDelay: '0s', opacity: 0 }
    });

    useEffect(() => {
        const now = Date.now() / 1000;
        const cycle = 24;
        const offset = now % cycle;

        // Calculate negative delays to fast-forward animation to correct frame
        setPathStyles({
            dep: { animationDelay: `${delayOffset - offset}s` },
            arr: { animationDelay: `${delayOffset + 6 - offset}s` }
        });
    }, [delayOffset]);

    // Dimensions
    const width = 1200;
    const height = 300;
    const padding = { top: 30, bottom: 30, left: 40, right: 40 };
    const chartHeight = height - padding.top - padding.bottom;
    const midY = chartHeight / 2 + padding.top;
    // Upper section (Dep) height = chartHeight / 2
    // Lower section (Arr) height = chartHeight / 2
    const sectionHeight = chartHeight / 2;

    // Calculate dynamic max value for scaling
    const maxValue = useMemo(() => {
        let max = 0;
        data.forEach(d => {
            max = Math.max(max, d.depActual, d.depPlanned, d.arrActual, d.arrPlanned);
        });
        // Add buffer
        return Math.max(max * 1.15, 10);
    }, [data]);

    // Scales
    // Y-scale: linear. 0 at midY. Max at midY - sectionHeight (Top) and midY + sectionHeight (Bottom)
    const yScale = (val: number) => (val / maxValue) * sectionHeight;

    // X-scale
    const barWidth = 12;
    const step = (width - padding.left - padding.right) / data.length;

    // Path Generators
    const getPathOriginal = (key: 'depPlanned' | 'arrPlanned', direction: -1 | 1) => {
        const points = data.map((p, i) => ({
            x: padding.left + i * step + step / 2,
            y: midY + direction * yScale(p[key])
        }));

        if (points.length < 2) return '';

        let d = `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i === 0 ? 0 : i - 1];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = i + 2 < points.length ? points[i + 2] : p2;

            // Catmull-Rom to Cubic Bezier conversion
            // CP1 = P1 + (P2 - P0) / 6
            // CP2 = P2 - (P3 - P1) / 6
            const tension = 0.16; // 1/6 ~= 0.166

            const cp1x = p1.x + (p2.x - p0.x) * tension;
            const cp1y = p1.y + (p2.y - p0.y) * tension;

            const cp2x = p2.x - (p3.x - p1.x) * tension;
            const cp2y = p2.y - (p3.y - p1.y) * tension;

            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
        }
        return d;
    };

    const renderTitleBar = (customClass: string = '') => (
        <div className={`flex items-center gap-4 ${customClass}`}>
            {/* Vertical Stripe - Same style as AirportPanel */}
            <div className={`w-2 h-10 rounded-full ${colorTheme === 'teal' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>

            {/* Text Group - Baseline Aligned */}
            <div className="flex items-baseline gap-4">
                <h3 className={`text-[48px] font-black tracking-tight leading-none ${isDark ? 'text-white drop-shadow-md' : 'text-slate-700 drop-shadow-soft'}`}>
                    {title}
                </h3>
                <span className={`text-lg font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    小时高峰 (架次)
                </span>
            </div>
        </div>
    );

    return (
        <div className={`w-full h-full relative ${className}`}>
            {renderTitleBar(`absolute left-0 z-10 ${titlePosition === 'top' ? 'top-0' : 'bottom-0'}`)}

            {/* Chart Container */}
            <div className="absolute inset-0 w-full h-full min-h-0">
                <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full block">
                    {/* Definitions for Gradients/Filters */}
                    {/* Definitions for Gradients/Filters/ClipPaths */}
                    <defs>
                        <linearGradient id="gradDep" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="gradArr" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                        </linearGradient>
                        <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <style>
                            {`
                                @keyframes flowAnim-${title.replace(/\s+/g, '')} {
                                    0% { stroke-dashoffset: 300; opacity: 0; }
                                    2% { opacity: 1; }
                                    19% { opacity: 1; }
                                    21% { stroke-dashoffset: -1500; opacity: 0; }
                                    100% { stroke-dashoffset: -1500; opacity: 0; }
                                }
                                .flow-effect-${title.replace(/\s+/g, '')} {
                                    stroke-dasharray: 300 3000;
                                    stroke-linecap: round;
                                    animation: flowAnim-${title.replace(/\s+/g, '')} 24s linear infinite both;
                                }
                            `}
                        </style>
                        <clipPath id={`clip-past-${title.replace(/\s+/g, '')}`}>
                            <rect x="0" y="0" width={(() => {
                                const now = new Date();
                                let currentH = now.getHours();
                                if (currentH < 4) currentH += 24;
                                const index = data.findIndex(d => {
                                    let h = parseInt(d.hour);
                                    if (h < 4) h += 24;
                                    return h === currentH;
                                });
                                if (index === -1) return width;
                                return padding.left + index * step + step / 2;
                            })()} height={height} />
                        </clipPath>
                    </defs>

                    {/* Grid Lines (Horizontal) - Dashed */}
                    <line x1={padding.left} y1={midY} x2={width - padding.right} y2={midY} stroke={isDark ? "#ffffff30" : "#00000020"} strokeWidth="1" />

                    {/* Definitions for Animation - Scoped to Title */}


                    {/* Bars & Points Group */}
                    {data.map((d, i) => {
                        const x = padding.left + i * step + step / 2;

                        // Dep Bar (Up)
                        const depH = yScale(d.depActual);
                        const depY = midY - depH;

                        // Arr Bar (Down)
                        const arrH = yScale(d.arrActual);
                        const arrY = midY;

                        // Dep Point (Planned)
                        const depPlanY = midY - yScale(d.depPlanned);

                        // Arr Point (Planned)
                        const arrPlanY = midY + yScale(d.arrPlanned);

                        // Time Comparison
                        const now = new Date();
                        let currentH = now.getHours();
                        if (currentH < 4) currentH += 24;
                        let dataH = parseInt(d.hour);
                        if (dataH < 4) dataH += 24;
                        const isPast = dataH <= currentH;

                        return (
                            <g key={i}>

                                {/* Dep Bar */}
                                <rect
                                    x={x - barWidth / 2}
                                    y={depY}
                                    width={barWidth}
                                    height={depH}
                                    rx={2}
                                    fill={isDark ? "#3b82f6" : "#2563eb"}
                                    opacity="0.6"
                                />

                                {/* Arr Bar */}
                                <rect
                                    x={x - barWidth / 2}
                                    y={arrY}
                                    width={barWidth}
                                    height={arrH}
                                    rx={2}
                                    fill={isDark ? "#10b981" : "#059669"}
                                    opacity="0.6"
                                />

                                {/* Dep Point */}
                                <circle cx={x} cy={depPlanY} r={2} fill="#60a5fa" filter="url(#glow)" />

                                {/* Arr Point */}
                                <circle cx={x} cy={arrPlanY} r={2} fill="#34d399" filter="url(#glow)" />

                                {showXAxisLabels && (
                                    <text
                                        x={x}
                                        y={height - 5}
                                        textAnchor="middle"
                                        fill={isPast ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#64748b" : "#94a3b8")}
                                        fontSize="10"
                                        fontWeight={isPast ? "bold" : "normal"}
                                    >
                                        {d.hour}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* Smooth Curves - Rendered AFTER bars so they are on top */}
                    {/* Base Lines */}
                    <path d={getPathOriginal('depPlanned', -1)} fill="none" stroke="#60a5fa" strokeWidth="2" filter="url(#glow)" opacity="0.4" />
                    <path d={getPathOriginal('arrPlanned', 1)} fill="none" stroke="#34d399" strokeWidth="2" filter="url(#glow)" opacity="0.4" />

                    {/* ClipPath for current hour flow limit */}


                    {/* Flowing Highlight Lines - Clipped to Current Hour */}
                    <path
                        d={getPathOriginal('depPlanned', -1)}
                        fill="none"
                        stroke={isDark ? "#e0f2fe" : "#ffffff"}
                        strokeWidth="3"
                        className={`flow-effect-${title.replace(/\s+/g, '')}`}
                        filter="url(#glow)"
                        opacity="1"
                        style={pathStyles.dep}
                        clipPath={`url(#clip-past-${title.replace(/\s+/g, '')})`}
                    />
                    <path
                        d={getPathOriginal('arrPlanned', 1)}
                        fill="none"
                        stroke={isDark ? "#d1fae5" : "#ffffff"}
                        strokeWidth="3"
                        className={`flow-effect-${title.replace(/\s+/g, '')}`}
                        filter="url(#glow)"
                        opacity="1"
                        style={pathStyles.arr}
                        clipPath={`url(#clip-past-${title.replace(/\s+/g, '')})`}
                    />

                    {/* Value Labels - Rendered last to be on very top */}
                    <g className="tech-font" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {data.map((d, i) => {
                            const x = padding.left + i * step + step / 2;
                            const depH = yScale(d.depActual);
                            const depY = midY - depH;
                            const arrH = yScale(d.arrActual);
                            const arrY = midY;
                            const depPlanY = midY - yScale(d.depPlanned);
                            const arrPlanY = midY + yScale(d.arrPlanned);

                            return (
                                <React.Fragment key={i}>
                                    {/* Dep Actual (Bar) */}
                                    {d.depActual > 0 && (
                                        <text
                                            x={depH > 22 ? x : x - 12}
                                            y={depH > 22 ? depY + 16 : depY + depH / 2 + 5}
                                            textAnchor={depH > 22 ? "middle" : "end"}
                                            fill={isDark ? "#ffffff" : (depH > 22 ? "#ffffff" : "#1e293b")}
                                            fontSize="16"
                                            fontWeight="bold"
                                        >
                                            {d.depActual}
                                        </text>
                                    )}

                                    {/* Dep Planned (Line) */}
                                    {d.depPlanned > 0 && (
                                        <text
                                            x={x}
                                            y={depPlanY - 12}
                                            textAnchor="middle"
                                            fill={isDark ? "#93c5fd" : "#60a5fa"}
                                            fontSize="16"
                                            fontWeight="bold"
                                        >
                                            {d.depPlanned}
                                        </text>
                                    )}

                                    {/* Arr Actual (Bar) */}
                                    {d.arrActual > 0 && (
                                        <text
                                            x={arrH > 22 ? x : x - 12}
                                            y={arrH > 22 ? arrY + arrH - 12 : arrY + arrH / 2 + 5}
                                            textAnchor={arrH > 22 ? "middle" : "end"}
                                            fill={isDark ? "#ffffff" : (arrH > 22 ? "#ffffff" : "#1e293b")}
                                            fontSize="16"
                                            fontWeight="bold"
                                        >
                                            {d.arrActual}
                                        </text>
                                    )}

                                    {/* Arr Planned (Line) */}
                                    {d.arrPlanned > 0 && (
                                        <text
                                            x={x}
                                            y={arrPlanY + 20}
                                            textAnchor="middle"
                                            fill={isDark ? "#6ee7b7" : "#34d399"}
                                            fontSize="16"
                                            fontWeight="bold"
                                        >
                                            {d.arrPlanned}
                                        </text>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </g>
                </svg>
            </div >


        </div >
    );
};
