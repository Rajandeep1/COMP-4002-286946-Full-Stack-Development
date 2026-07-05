import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensures deep links like /organization work when refreshing in dev
  server: {
    historyApiFallback: true,
  },
});
