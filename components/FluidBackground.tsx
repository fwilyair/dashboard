import React, { useMemo } from 'react';
import { useTheme } from '../ThemeContext';

export const FluidBackground: React.FC = () => {
  const { isDark } = useTheme();

  // "Deep Tech" (Dark) vs "Clean Day" (Light) Configuration
  // Palette: Dark = Slate/Indigo; Light = Cool Gray/Silver/Sky
  // Speed: Fast Flow (10-15s)

  const layers = useMemo(() => {
    // Determine animation names based on theme
    const anim1 = isDark ? "animate-[colorShift1_60s_infinite]" : "animate-[colorShift1_light_60s_infinite]";
    const anim1_rev = isDark ? "animate-[colorShift1_60s_infinite_reverse]" : "animate-[colorShift1_light_60s_infinite_reverse]";

    const anim2 = isDark ? "animate-[colorShift2_45s_infinite]" : "animate-[colorShift2_light_45s_infinite]";
    const anim2_rev = isDark ? "animate-[colorShift2_60s_infinite_reverse]" : "animate-[colorShift2_light_60s_infinite_reverse]";

    const anim3 = isDark ? "animate-[colorShift3_30s_infinite]" : "animate-[colorShift3_light_30s_infinite]";
    const anim3_rev = isDark ? "animate-[colorShift3_50s_infinite_reverse]" : "animate-[colorShift3_light_50s_infinite_reverse]";

    return [
      // Layer 0: Base Layer (Full Screen - Guarantee Coverage)
      {
        id: "base_deep_space",
        zIndex: 0,
        gradientId: "grad-base",
        d: "M0,0 L1440,0 L1440,1000 L0,1000 Z",
        animation: "",
        colorAnim1: anim1,
        colorAnim2: anim1_rev
      },
      // Layer 1: Upper Atmosphere
      {
        id: "upper_atmosphere",
        zIndex: 5,
        gradientId: "grad-upper",
        d: "M0,0 C300,100 600,0 900,150 C1200,300 1350,100 1440,100 L1440,1000 L0,1000 Z",
        animation: "animate-[swell_18s_ease-in-out_infinite]",
        colorAnim1: anim3,
        colorAnim2: anim1_rev
      },
      // Layer 2: Back Mountain
      {
        id: "mountain_base",
        zIndex: 10,
        gradientId: "grad-mountain",
        d: "M0,150 C300,250 500,100 800,400 C1100,700 1300,600 1440,700 L1440,1000 L0,1000 Z",
        animation: "animate-[swell_12s_ease-in-out_infinite]",
        colorAnim1: anim1,
        colorAnim2: anim2_rev
      },
      // Layer 3: Middle Ridge
      {
        id: "ridge_mid",
        zIndex: 20,
        gradientId: "grad-ridge",
        d: "M0,350 C250,300 550,550 850,600 C1150,650 1350,800 1440,850 L1440,1000 L0,1000 Z",
        animation: "animate-[swell_15s_ease-in-out_infinite_reverse]",
        colorAnim1: anim2,
        colorAnim2: anim3_rev
      },
      // Layer 4: Front Dune
      {
        id: "dune_front",
        zIndex: 30,
        gradientId: "grad-dune",
        d: "M0,550 C350,650 600,600 900,800 C1200,1000 1350,900 1440,950 L1440,1000 L0,1000 Z",
        animation: "animate-[swell_10s_ease-in-out_infinite]",
        colorAnim1: anim3,
        colorAnim2: anim1_rev
      }
    ];
  }, [isDark]);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000 ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>

      {/* 2. SVG Layers Container */}
      {/* Light Mode Opacity: Need lower opacity (10-15%) because white is bright, dark colors stand out too much. 
          Actually, we want light colors on light background. 
          If layers are light gray/blue, and background is white, contrast is low. 
          So we can keep opacity around 30-40% for light mode, or 20% for dark.
      */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-60'}`}>
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

      {/* 3. Global Dimmer / Fog */}
      {/* Dark: Dark Overlay. Light: White Fog Overlay to blend edges. */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 pointer-events-none ${isDark ? 'bg-[#0f172a]/40' : 'bg-white/40'}`}
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

        /* --- DARK MODE PALETTE (Deep Tech) --- */
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

        /* --- LIGHT MODE PALETTE (Clean Day - Pro Max) --- */
        /* Design: Very subtle, almost white shifts to maintain "Clean Paper" aesthetic */
        
        @keyframes colorShift1_light {
            0%, 100% { stop-color: #f1f5f9; } /* Slate-100 */
            30% { stop-color: #e2e8f0; }      /* Slate-200 */
            60% { stop-color: #cbd5e1; }      /* Slate-300 */
        }
        
        @keyframes colorShift2_light {
            0%, 100% { stop-color: #f0f9ff; } /* Sky-50 */
            30% { stop-color: #e0f2fe; }      /* Sky-100 */
            60% { stop-color: #bae6fd; }      /* Sky-200 */
        }
        
        @keyframes colorShift3_light {
             0%, 100% { stop-color: #f8fafc; } /* Slate-50 */
             30% { stop-color: #f1f5f9; }      /* Slate-100 */
             60% { stop-color: #e0f2fe; }      /* Sky-100 */
        }
      `}</style>
    </div>
  );
};