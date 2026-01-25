import { render, screen } from '@testing-library/react';
import { SmallStatCard } from './SmallStatCard';
import { ThemeProvider } from '../ThemeContext';

// Mock types if not imported
const mockData = {
    id: 'test-id',
    label: 'Test Label',
    subLabel: 'Test SubLabel',
    planned: 100,
    executed: 80,
    percentage: 80
};

// Wrapper for testing context
const renderWithTheme = (ui: React.ReactNode, isDark = true) => {
    return render(
        <ThemeProvider>
            {ui}
        </ThemeProvider>
    );
};

describe('SmallStatCard', () => {
    it('should render label and numbers correctly', () => {
        renderWithTheme(
            <SmallStatCard
                data={mockData}
                colorTheme="teal"
            />
        );

        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('80')).toBeInTheDocument();
        expect(screen.getByText('/ 100')).toBeInTheDocument();
    });

    it('should apply teal theme correctly', () => {
        renderWithTheme(
            <SmallStatCard
                data={mockData}
                colorTheme="teal"
            />
        );
        // Checking for class names that indicate teal theme are applied
        expect(screen.getByText('80')).toHaveClass('text-teal-300'); // Assuming dark mode default
    });

    it('should apply indigo theme correctly', () => {
        renderWithTheme(
            <SmallStatCard
                data={mockData}
                colorTheme="indigo"
            />
        );
        expect(screen.getByText('80')).toHaveClass('text-indigo-300');
    });

    it('should align left by default', () => {
        const { container } = renderWithTheme(
            <SmallStatCard
                data={mockData}
                colorTheme="teal"
            />
        );
        // Check for flex alignment classes
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('items-start');
    });

    it('should align right when align="right" prop is passed', () => {
        const { container } = renderWithTheme(
            <SmallStatCard
                data={mockData}
                colorTheme="teal"
                align="right"
            />
        );
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass('items-end');
    });

    it('should highlight "国际" (International) label specially', () => {
        const intlData = { ...mockData, label: '国际出港' };
        renderWithTheme(
            <SmallStatCard
                data={intlData}
                colorTheme="teal"
            />
        );
        expect(screen.getByText('国际出港')).toHaveClass('text-sky-400');
    });
});
