import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      __GIT_UPDATED_AT__: env.GIT_UPDATED_AT ?? 'null',
      __GIT_HISTORY__:    env.GIT_HISTORY ?? 'null',
    } as Record<string, string>,
  };
});