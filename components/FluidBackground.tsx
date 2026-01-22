import React from 'react';
import { useTheme } from '../ThemeContext';

export const FluidBackground: React.FC = () => {
  const { isDark } = useTheme();

  if (isDark) {
    // Dark theme - Original design
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-900">
        {/* Abstract Gradients/Blobs */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[80px] animate-[float1_45s_ease-in-out_infinite]"
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-teal-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-[float2_60s_ease-in-out_infinite]"
        />

        {/* Flowing Lines SVG */}
        <div className="absolute inset-0 opacity-30">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" strokeWidth="2">
              <path
                d="M-100 200 Q 300 100 720 400 T 1540 600"
                stroke="url(#grad1)"
                className="animate-[pulse_8s_ease-in-out_infinite]"
                style={{ strokeDasharray: '10 10', opacity: 0.4 }}
              />
              <path
                d="M-100 400 Q 400 300 720 600 T 1540 300"
                stroke="url(#grad2)"
                strokeWidth="1.5"
                className="animate-[pulse_12s_ease-in-out_infinite]"
                style={{ animationDelay: '2s', opacity: 0.3 }}
              />
              <path
                d="M-100 600 Q 500 800 1000 400 T 1540 200"
                stroke="url(#grad1)"
                strokeWidth="1"
                className="animate-[pulse_10s_ease-in-out_infinite]"
                style={{ animationDelay: '4s', opacity: 0.2 }}
              />
            </g>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
                <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
                <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Subtle Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')]" />
      </div>
    );
  }

  // Light theme - Apple Big Sur style
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Big Sur Style Animated Gradient Blobs */}

      {/* Primary Purple/Pink Blob - Top Left */}
      <div
        className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full filter blur-[120px] animate-[float1_18s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(135deg, rgba(196, 181, 253, 0.6) 0%, rgba(251, 207, 232, 0.5) 50%, rgba(254, 202, 202, 0.4) 100%)',
        }}
      />

      {/* Secondary Cyan/Blue Blob - Top Right */}
      <div
        className="absolute top-[-5%] right-[-15%] w-[50vw] h-[50vw] rounded-full filter blur-[100px] animate-[float2_22s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(225deg, rgba(165, 243, 252, 0.55) 0%, rgba(147, 197, 253, 0.5) 50%, rgba(196, 181, 253, 0.4) 100%)',
        }}
      />

      {/* Tertiary Orange/Pink Blob - Bottom Right */}
      <div
        className="absolute bottom-[-20%] right-[-5%] w-[60vw] h-[60vw] rounded-full filter blur-[130px] animate-[float3_25s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(315deg, rgba(254, 215, 170, 0.5) 0%, rgba(252, 165, 165, 0.45) 50%, rgba(251, 207, 232, 0.4) 100%)',
        }}
      />

      {/* Quaternary Green/Teal Blob - Bottom Left */}
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full filter blur-[110px] animate-[float4_20s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(45deg, rgba(167, 243, 208, 0.5) 0%, rgba(153, 246, 228, 0.45) 50%, rgba(165, 243, 252, 0.4) 100%)',
        }}
      />

      {/* Center accent blob */}
      <div
        className="absolute top-[30%] left-[40%] w-[35vw] h-[35vw] rounded-full filter blur-[100px] animate-[floatCenter_15s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(180deg, rgba(221, 214, 254, 0.4) 0%, rgba(199, 210, 254, 0.35) 50%, rgba(191, 219, 254, 0.3) 100%)',
        }}
      />

      {/* Subtle shimmer overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] animate-[shimmer_8s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
      />

      {/* Soft noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};