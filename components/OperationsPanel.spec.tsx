import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OperationsPanel } from './OperationsPanel';
import { ThemeProvider } from '../ThemeContext';
import { OperationsPageData } from '../operationsTypes';

const mockData: OperationsPageData = {
    airportA: {
        id: 'airport-a',
        name: 'A机场',
        colorTheme: 'teal',
        agents: [
            {
                name: '代理1',
                takeoffRate: { value: 95.5 },
                departureRate: { value: 92.0 },
                releaseRate: { value: 98.0 },
                peakDepartureRate: { value: 90.0 },
                cabinDoorRate: { value: 99.0 },
                cargoDoorRate: { value: 100.0 }
            }
        ]
    },
    airportB: {
        id: 'airport-b',
        name: 'B机场',
        colorTheme: 'indigo',
        agents: [
            {
                name: '代理2',
                takeoffRate: { value: 94.0 },
                departureRate: { value: 91.5 },
                releaseRate: { value: 97.5 },
                peakDepartureRate: { value: 89.0 },
                cabinDoorRate: { value: 98.5 },
                cargoDoorRate: { value: 99.5 }
            }
        ]
    }
};

describe('OperationsPanel Component', () => {
    const renderWithTheme = (ui: React.ReactNode) => {
        return render(
            <ThemeProvider>
                {ui}
            </ThemeProvider>
        );
    };

    it('should render airport names and agent names', () => {
        renderWithTheme(<OperationsPanel data={mockData} />);
        expect(screen.getByText('A机场')).toBeInTheDocument();
        expect(screen.getByText('B机场')).toBeInTheDocument();
        expect(screen.getByText('代理1')).toBeInTheDocument();
        expect(screen.getByText('代理2')).toBeInTheDocument();
    });

    it('should render metric labels correctly', () => {
        renderWithTheme(<OperationsPanel data={mockData} />);
        expect(screen.getByText('起飞正常率')).toBeInTheDocument();
        expect(screen.getByText('始发正常率')).toBeInTheDocument();
        expect(screen.getByText('提前5分关货舱门')).toBeInTheDocument();
    });

    it('should render metric values', () => {
        renderWithTheme(<OperationsPanel data={mockData} />);
        // Using getAllByText because values might be shared (e.g. 100.0)
        expect(screen.getByText('95.5')).toBeInTheDocument();
        expect(screen.getByText('94.0')).toBeInTheDocument();
    });

    it('should highlight max and min values in a row', () => {
        renderWithTheme(<OperationsPanel data={mockData} />);

        // In takeoffRate: agent1 is 95.5 (max), agent2 is 94.0 (min)
        const val955 = screen.getByText('95.5');
        const val940 = screen.getByText('94.0');

        // Max should have orange color class (in dark mode default)
        expect(val955).toHaveClass('text-orange-400');
        // Min should have cyan color class
        expect(val940).toHaveClass('text-cyan-400');
    });
});
