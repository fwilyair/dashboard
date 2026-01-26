import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReleasePanel } from './ReleasePanel';
import { ThemeProvider } from '../ThemeContext';

// Mock Recharts to avoid jsdom related issues (optional if handled by setup)
vi.mock('recharts', () => ({
    ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
    BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
    Bar: () => <div data-testid="bar" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
    Cell: () => <div data-testid="cell" />,
    ReferenceLine: () => <div data-testid="reference-line" />,
}));

describe('ReleasePanel Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-01-26T12:00:00'));
    });

    const renderWithTheme = (ui: React.ReactNode) => {
        return render(
            <ThemeProvider>
                {ui}
            </ThemeProvider>
        );
    };

    it('should render the title and legend correctly', () => {
        renderWithTheme(<ReleasePanel />);
        expect(screen.getByText('放行看板')).toBeInTheDocument();
        expect(screen.getByText('计划离港')).toBeInTheDocument();
        expect(screen.getByText('实际离港')).toBeInTheDocument();
        expect(screen.getByText('计划进港')).toBeInTheDocument();
        expect(screen.getByText('实际进港')).toBeInTheDocument();
    });

    it('should render both airport charts', () => {
        renderWithTheme(<ReleasePanel />);
        expect(screen.getByText('A 机场')).toBeInTheDocument();
        expect(screen.getByText('B 机场')).toBeInTheDocument();
    });

    it('should render the shared time axis with correct hours', () => {
        const { container } = renderWithTheme(<ReleasePanel />);
        // At 12:00, hour 12 should be bold
        const texts = container.querySelectorAll('text');
        const hour12 = Array.from(texts).find(t => t.textContent === '12');
        expect(hour12).toBeInTheDocument();
        expect(hour12).toHaveAttribute('font-weight', 'bold');
    });
});
