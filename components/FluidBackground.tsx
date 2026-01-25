import React, { useMemo } from 'react';
import { useTheme } from '../ThemeContext';

export const FluidBackground: React.FC = () => {
  const { isDark } = useTheme();

  // "Deep Tech" Configuration (Ghostly/Subtle)
  // Palette: Shifting Cool Tones (Animated)
  // Speed: Fast Flow (10-15s)
  // Coverage: 100% Guaranteed by Base Layer

  const layers = useMemo(() => [
    // Layer 0: Deep Space Base (Full Screen Coverage) - The "Guarantee" Layer
    {
      id: "base_deep_space",
      zIndex: 0,
      gradientId: "grad-base",
      d: "M0,0 L1440,0 L1440,1000 L0,1000 Z", // Full Rectangle occupying entire viewport
      animation: "", // Static shape, dynamic color
      colorAnim1: "animate-[colorShift1_60s_infinite]",
      colorAnim2: "animate-[colorShift1_60s_infinite_reverse]"
    },
    // Layer 1: Upper Atmosphere (Top Texture)
    {
      id: "upper_atmosphere",
      zIndex: 5,
      gradientId: "grad-upper",
      d: "M0,0 C300,100 600,0 900,150 C1200,300 1350,100 1440,100 L1440,1000 L0,1000 Z", // Reverted to nice curve, since Base Layer handles coverage
      animation: "animate-[swell_18s_ease-in-out_infinite]",
      colorAnim1: "animate-[colorShift3_50s_infinite]",
      colorAnim2: "animate-[colorShift1_50s_infinite_reverse]"
    },
    // Layer 2: Back Mountain (Shifting Slate/Teal)
    {
      id: "mountain_base",
      zIndex: 10,
      gradientId: "grad-mountain",
      d: "M0,150 C300,250 500,100 800,400 C1100,700 1300,600 1440,700 L1440,1000 L0,1000 Z",
      animation: "animate-[swell_12s_ease-in-out_infinite]",
      colorAnim1: "animate-[colorShift1_60s_infinite]",
      colorAnim2: "animate-[colorShift2_60s_infinite_reverse]"
    },
    // Layer 3: Middle Ridge (Shifting Indigo/Violet)
    {
      id: "ridge_mid",
      zIndex: 20,
      gradientId: "grad-ridge",
      d: "M0,350 C250,300 550,550 850,600 C1150,650 1350,800 1440,850 L1440,1000 L0,1000 Z",
      animation: "animate-[swell_15s_ease-in-out_infinite_reverse]",
      colorAnim1: "animate-[colorShift2_45s_infinite]",
      colorAnim2: "animate-[colorShift3_45s_infinite_reverse]"
    },
    // Layer 4: Front Dune (Shifting Blue/Cyan)
    {
      id: "dune_front",
      zIndex: 30,
      gradientId: "grad-dune",
      d: "M0,550 C350,650 600,600 900,800 C1200,1000 1350,900 1440,950 L1440,1000 L0,1000 Z",
      animation: "animate-[swell_10s_ease-in-out_infinite]",
      colorAnim1: "animate-[colorShift3_30s_infinite]",
      colorAnim2: "animate-[colorShift1_30s_infinite_reverse]"
    }
  ], [isDark]);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${isDark ? 'bg-[#0f172a]' : 'bg-slate-50'}`}>

      {/* 2. SVG Layers Container */}
      <div className={`absolute inset-0 w-full h-full ${isDark ? 'opacity-30' : 'opacity-40'}`}>
        <svg
          className="w-full h-full block"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <defs>
            {layers.map((layer: any) => (
              <linearGradient key={layer.gradientId} id={layer.gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" className={layer.colorAnim1} stopColor="currentColor" />
                <stop offset="100%" className={layer.colorAnim2} stopColor="currentColor" />
              </linearGradient>
            ))}
          </defs>

          {layers.map((layer: any) => (
            <path
              key={layer.id}
              d={layer.d}
              fill={`url(#${layer.gradientId})`}
              className={`transition-all duration-1000 ease-in-out ${layer.animation}`}
              style={{
                opacity: 1.0,
                transformOrigin: '50% 100%',
                filter: 'blur(8px)',
              }}
            />
          ))}
        </svg>
      </div>

      {/* 3. Global Dimmer */}
      <div
        className={`absolute inset-0 ${isDark ? 'bg-[#0f172a]/40' : 'bg-white/20'} pointer-events-none`}
      />

      {/* 4. Noise */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <style>{`
        @keyframes swell {
            0% { transform: scaleY(1) translateY(0); }
            50% { transform: scaleY(1.05) translateY(-10px); }
            100% { transform: scaleY(1) translateY(0); }
        }

        /* Color Shifting Keyframes (Cool Tones) */
        @keyframes colorShift1 {
            0%, 100% { stop-color: #1e293b; } /* Slate-800 */
            30% { stop-color: #0f172a; }      /* Slate-900 */
            60% { stop-color: #312e81; }      /* Indigo-900 */
        }
        @keyframes colorShift2 {
            0%, 100% { stop-color: #312e81; } /* Indigo-900 */
            30% { stop-color: #1e3a8a; }      /* Blue-900 */
            60% { stop-color: #4c1d95; }      /* Violet-900 */
        }
        @keyframes colorShift3 {
             0%, 100% { stop-color: #172554; } /* Blue-950 */
             30% { stop-color: #0f766e; }      /* Teal-700 (Dark) */
             60% { stop-color: #0c4a6e; }      /* Sky-900 */
        }
      `}</style>
    </div>
  );
};