import { defineConfig } from 'vitest/config';

// The tests cover the pure helpers in src/utils, so the React/Tailwind plugins
// from vite.config.js are intentionally left out: no DOM, and much faster.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
