import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: "/assignmen3-reacjs",
    server: {
      port: parseInt(env.VITE_PORT) || 5173, // Lấy giá trị VITE_PORT từ .env hoặc dùng mặc định là 5173
    },
  };
});
