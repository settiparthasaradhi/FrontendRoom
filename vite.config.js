import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // ✅ Ensure correct local port
    host: "0.0.0.0", // ✅ Bind to 0.0.0.0 for external access
  },
});