/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // Enable global test APIs (describe, it, expect)
        environment: 'jsdom', // Simulate browser environment
        setupFiles: ['./vitest.setup.ts'], // Setup file for custom matchers
        include: ['**/*.spec.{ts,tsx}', '**/*.test.{ts,tsx}'], // Test file pattern
    },
});
