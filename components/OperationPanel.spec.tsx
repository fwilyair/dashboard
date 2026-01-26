import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OperationPanel } from './OperationPanel';
import { ThemeProvider } from '../ThemeContext';

describe('OperationPanel Component', () => {
    const renderWithTheme = (ui: React.ReactNode) => {
        return render(
            <ThemeProvider>
                {ui}
            </ThemeProvider>
        );
    };

    it('should render the main title', () => {
        renderWithTheme(<OperationPanel />);
        expect(screen.getByText('运营看板')).toBeInTheDocument();
    });

    it('should render airport headers', () => {
        renderWithTheme(<OperationPanel />);
        expect(screen.getByText('A机场')).toBeInTheDocument();
        expect(screen.getByText('B机场')).toBeInTheDocument();
        expect(screen.getByText('两场合计')).toBeInTheDocument();
    });

    it('should render metric labels with units', () => {
        renderWithTheme(<OperationPanel />);
        expect(screen.getByText('航班架次')).toBeInTheDocument();
        expect(screen.getByText('架次')).toBeInTheDocument();
        expect(screen.getByText('旅客吞吐量')).toBeInTheDocument();
        expect(screen.getByText('万')).toBeInTheDocument();
        expect(screen.getByText('货邮吞吐量')).toBeInTheDocument();
        expect(screen.getByText('万吨')).toBeInTheDocument();
    });

    it('should render progress bar labels', () => {
        renderWithTheme(<OperationPanel />);
        // "累计完成" appears in multiple cells
        const labels = screen.getAllByText('累计完成');
        expect(labels.length).toBeGreaterThan(0);

        expect(screen.getAllByText('计划完成').length).toBeGreaterThan(0);
        expect(screen.getAllByText('日均达标').length).toBeGreaterThan(0);
    });
});
