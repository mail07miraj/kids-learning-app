import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Kids Learning App",
        short_name: "Kids Learn",
        start_url: "/",
        display: "standalone",
        background_color: "#fef9c3",
        theme_color: "#3b82f6",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],

  // ⭐ এই অংশটাই নতুন (other device access)
  server: {
    host: true
  }
});
