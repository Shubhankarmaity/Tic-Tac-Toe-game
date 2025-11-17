import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// ⚠️ IMPORTANT: Replace this with your own repo name
const repoName = "tictactoe-game"; 

export default defineConfig({
  base: `/${repoName}/`,   // GitHub Pages requires this

  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Tic Tac Toe",
        short_name: "TicTacToe",
        theme_color: "#6a11cb",
        background_color: "#2575fc",
        display: "standalone",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
