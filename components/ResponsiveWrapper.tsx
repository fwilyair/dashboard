import React, { useEffect, useState, useRef } from 'react';

interface ResponsiveWrapperProps {
    children: React.ReactNode;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({ children }) => {
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            // Target design resolution
            const targetWidth = 1920;
            const targetHeight = 1080;

            // Current window resolution
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;

            // Calculate scale based on width (prioritize width to fit content horizontally)
            // or use Math.min for contain-style fitting

            // Strictly scale to fit width for standard dashboard usage
            // But user asked for 16:9 self-adaptation. 
            // Often dashboards are fixed 1920x1080 and scaled to fit the screen.

            const scaleX = currentWidth / targetWidth;
            const scaleY = currentHeight / targetHeight;

            // Use the smaller scale factor to ensure it fits completely (contain)
            // Or use scaleX to Fill Width if vertical scroll is allowed
            // Given "Command Dashboard", usually it's "fit screen without scroll".

            const newScale = Math.min(scaleX, scaleY);

            setScale(newScale);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial calculation

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center"
        >
            <div
                style={{
                    width: '1920px',
                    height: '1080px',
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center',
                }}
                className="relative shadow-2xl overflow-hidden"
            >
                {children}
            </div>
        </div>
    );
};
