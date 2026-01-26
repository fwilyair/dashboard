import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Header } from './Header';
import { ThemeProvider } from '../ThemeContext';

describe('Header Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        // Set a fixed date for consistent tests
        const mockDate = new Date('2026-01-26T12:00:00');
        vi.setSystemTime(mockDate);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render the title correctly', () => {
        render(
            <ThemeProvider>
                <Header />
            </ThemeProvider>
        );
        expect(screen.getByText(/地服公司两场生产运行态势/i)).toBeInTheDocument();
    });

    it('should display the current time formatted correctly', () => {
        render(
            <ThemeProvider>
                <Header />
            </ThemeProvider>
        );
        // Date: 2026-01-26 12:00
        expect(screen.getByText(/2026-01-26 12:00/i)).toBeInTheDocument();
    });

    it('should update the time after interval', async () => {
        const { act } = await import('react');
        render(
            <ThemeProvider>
                <Header />
            </ThemeProvider>
        );

        // Initial time
        expect(screen.getByText(/2026-01-26 12:00/i)).toBeInTheDocument();

        // Fast-forward 60 seconds (6 x 10s intervals)
        await act(async () => {
            vi.advanceTimersByTime(60000);
        });

        expect(screen.getByText(/2026-01-26 12:01/i)).toBeInTheDocument();
    });
});
