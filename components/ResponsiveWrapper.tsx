import React, { useEffect, useState, useRef } from 'react';

interface ResponsiveWrapperProps {
    children: React.ReactNode;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number;

        const handleResize = () => {
            // Wrap in rAF to prevent thrashing
            rafId = requestAnimationFrame(() => {
                // Target design resolution
                const targetWidth = 1920;
                const targetHeight = 1080;

                // Current window resolution
                const currentWidth = window.innerWidth;
                const currentHeight = window.innerHeight;

                // Calculate scale
                const scaleX = currentWidth / targetWidth;
                const scaleY = currentHeight / targetHeight;

                // Use the smaller scale factor (contain)
                const newScale = Math.min(scaleX, scaleY);

                setScale(newScale);
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial calculation

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const containerStyle = React.useMemo(() => ({
        width: '1920px',
        height: '1080px',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
    }), [scale]);

    return (
        <div
            className="w-screen h-screen overflow-hidden bg-slate-950 flex items-center justify-center"
        >
            <div
                style={containerStyle}
                className="relative shadow-2xl overflow-hidden"
            >
                {children}
            </div>
        </div>
    );
};
