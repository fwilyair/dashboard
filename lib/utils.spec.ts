import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
    it('should merge class names correctly', () => {
        expect(cn('bg-red-500', 'p-4')).toBe('bg-red-500 p-4');
    });

    it('should handle conditional classes', () => {
        expect(cn('bg-red-500', true && 'p-4', false && 'm-2')).toBe('bg-red-500 p-4');
    });

    it('should resolve tailwind conflicts', () => {
        expect(cn('p-2', 'p-4')).toBe('p-4');
    });

    it('should handle arrays and objects', () => {
        expect(cn(['bg-red-500', 'p-4'], { 'm-2': true, 'hidden': false })).toBe('bg-red-500 p-4 m-2');
    });

    it('should handle undefined and null', () => {
        expect(cn('p-4', undefined, null)).toBe('p-4');
    });
});
