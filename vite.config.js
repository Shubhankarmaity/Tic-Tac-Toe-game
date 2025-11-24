import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // REMOVE base if deploying at the root!
  // If you deploy to https://tic-tac-toe-game-coral-ten.vercel.app/, base should be "/"
  // base: "/",

  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Tic Tac Toe",
        short_name: "TicTacToe",
        theme_color: "#6a11cb",
        background_color: "#2575fc",
        display: "standalone",
        icons: [
          {
            src: "icons/icon-192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "icons/icon-512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ]
      }
    })
  ]
});
