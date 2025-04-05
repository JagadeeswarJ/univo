// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react"; // only if you're using React

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
