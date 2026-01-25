import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
    it('should merge class names correctly', () => {
        const result = cn('text-red-500', 'bg-blue-500');
        expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle conditional class names', () => {
        const result = cn('text-red-500', false && 'bg-blue-500', true && 'font-bold');
        expect(result).toBe('text-red-500 font-bold');
    });

    it('should merge tailwind classes by overriding conflicts', () => {
        const result = cn('p-4', 'p-8');
        expect(result).toBe('p-8');
    });

    it('should handle arrays and objects', () => {
        const result = cn(['text-red-500', { 'bg-blue-500': true, 'font-bold': false }]);
        expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle undefined and null inputs', () => {
        const result = cn('text-red-500', undefined, null);
        expect(result).toBe('text-red-500');
    });
});
