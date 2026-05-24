import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // 安全にJSONとして埋め込む
  const gitHistory = env.GIT_HISTORY ? env.GIT_HISTORY : '[]';
  const gitUpdatedAt = env.GIT_UPDATED_AT ? env.GIT_UPDATED_AT : '{}';

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      __GIT_HISTORY__:    JSON.stringify(gitHistory),
      __GIT_UPDATED_AT__: JSON.stringify(gitUpdatedAt),
    } as Record<string, string>,
  };
});