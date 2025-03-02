import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/Chart-Assistant/",
  build: {
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react()],
});
