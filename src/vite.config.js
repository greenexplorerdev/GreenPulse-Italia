import { defineConfig } from "vite";
import react      from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS 4 — sostituisce PostCSS config
  ],
});
