// vite.config.js
import react from "file:///C:/Users/HP/Desktop/logbase/admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/HP/Desktop/logbase/admin/node_modules/vite/dist/node/index.js";
import compression from "file:///C:/Users/HP/Desktop/logbase/admin/node_modules/vite-plugin-compression2/dist/index.mjs";
import cssInjectedByJsPlugin from "file:///C:/Users/HP/Desktop/logbase/admin/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
import { VitePWA } from "file:///C:/Users/HP/Desktop/logbase/admin/node_modules/vite-plugin-pwa/dist/index.js";
import dns from "dns";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\HP\\Desktop\\logbase\\admin";
dns.setDefaultResultOrder("verbatim");
var vite_config_default = defineConfig({
  // root: "./", // Set the root directory of your project
  // base: "/", // Set the base URL path for your application
  build: {
    // outDir: "build", // Set the output directory for the build files
    assetsDir: "@/assets",
    // Set the directory for the static assets
    // sourcemap: process.env.__DEV__ === "true",
    rollupOptions: {
      // Additional Rollup configuration options if needed
    },
    chunkSizeWarningLimit: 10 * 1024
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        // enabled: process.env.SW_DEV === "true",
        enabled: false,
        /* when using generateSW the PWA plugin will switch to classic */
        type: "module",
        navigateFallback: "index.html"
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
      },
      // add this to cache all the
      // // static assets in the public folder
      // includeAssets: ["**/*"],
      includeAssets: [
        "src/assets/img/logo/*.png",
        "src/assets/img/*.png",
        "src/assets/img/*.jepg",
        "src/assets/img/*.webp",
        "favicon.ico"
      ],
      manifest: {
        theme_color: "#FFFFFF",
        background_color: "#FFFFFF",
        display: "standalone",
        orientation: "portrait",
        scope: ".",
        start_url: ".",
        id: ".",
        short_name: "Logbase",
        name: "Logbase: Admin Dashboard",
        description: "Logbase: Admin Dashboard",
        icons: [
          {
            src: "favicon.ico",
            sizes: "48x48",
            type: "image/x-icon"
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }),
    compression()
  ],
  server: {
    proxy: {
      "/api/": {
        target: "http://localhost:5065",
        changeOrigin: true
      }
    },
    port: 3003
  },
  define: {
    "process.env": process.env
    // global: {}, //enable this when running on dev/local mode
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__vite_injected_original_dirname, "./src/")
    }
  },
  test: {
    global: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTest.js"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxEZXNrdG9wXFxcXGxvZ2Jhc2VcXFxcYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEhQXFxcXERlc2t0b3BcXFxcbG9nYmFzZVxcXFxhZG1pblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvSFAvRGVza3RvcC9sb2diYXNlL2FkbWluL3ZpdGUuY29uZmlnLmpzXCI7LyoqIEBmb3JtYXQgKi9cblxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb24yXCI7XG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1jc3MtaW5qZWN0ZWQtYnktanNcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5cbmltcG9ydCBkbnMgZnJvbSBcImRuc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZG5zLnNldERlZmF1bHRSZXN1bHRPcmRlcihcInZlcmJhdGltXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyByb290OiBcIi4vXCIsIC8vIFNldCB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgeW91ciBwcm9qZWN0XG4gIC8vIGJhc2U6IFwiL1wiLCAvLyBTZXQgdGhlIGJhc2UgVVJMIHBhdGggZm9yIHlvdXIgYXBwbGljYXRpb25cblxuICBidWlsZDoge1xuICAgIC8vIG91dERpcjogXCJidWlsZFwiLCAvLyBTZXQgdGhlIG91dHB1dCBkaXJlY3RvcnkgZm9yIHRoZSBidWlsZCBmaWxlc1xuICAgIGFzc2V0c0RpcjogXCJAL2Fzc2V0c1wiLCAvLyBTZXQgdGhlIGRpcmVjdG9yeSBmb3IgdGhlIHN0YXRpYyBhc3NldHNcbiAgICAvLyBzb3VyY2VtYXA6IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIEFkZGl0aW9uYWwgUm9sbHVwIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBpZiBuZWVkZWRcbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAgKiAxMDI0LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjc3NJbmplY3RlZEJ5SnNQbHVnaW4oKSxcblxuICAgIFZpdGVQV0Eoe1xuICAgICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgLy8gZW5hYmxlZDogcHJvY2Vzcy5lbnYuU1dfREVWID09PSBcInRydWVcIixcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIC8qIHdoZW4gdXNpbmcgZ2VuZXJhdGVTVyB0aGUgUFdBIHBsdWdpbiB3aWxsIHN3aXRjaCB0byBjbGFzc2ljICovXG4gICAgICAgIHR5cGU6IFwibW9kdWxlXCIsXG4gICAgICAgIG5hdmlnYXRlRmFsbGJhY2s6IFwiaW5kZXguaHRtbFwiLFxuICAgICAgfSxcbiAgICAgIHdvcmtib3g6IHtcbiAgICAgICAgZ2xvYlBhdHRlcm5zOiBbXCIqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Z31cIl0sXG4gICAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiAxMCAqIDEwMjQgKiAxMDI0LFxuICAgICAgfSxcbiAgICAgIC8vIGFkZCB0aGlzIHRvIGNhY2hlIGFsbCB0aGVcbiAgICAgIC8vIC8vIHN0YXRpYyBhc3NldHMgaW4gdGhlIHB1YmxpYyBmb2xkZXJcbiAgICAgIC8vIGluY2x1ZGVBc3NldHM6IFtcIioqLypcIl0sXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbXG4gICAgICAgIFwic3JjL2Fzc2V0cy9pbWcvbG9nby8qLnBuZ1wiLFxuICAgICAgICBcInNyYy9hc3NldHMvaW1nLyoucG5nXCIsXG4gICAgICAgIFwic3JjL2Fzc2V0cy9pbWcvKi5qZXBnXCIsXG4gICAgICAgIFwic3JjL2Fzc2V0cy9pbWcvKi53ZWJwXCIsXG4gICAgICAgIFwiZmF2aWNvbi5pY29cIixcbiAgICAgIF0sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICB0aGVtZV9jb2xvcjogXCIjRkZGRkZGXCIsXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiI0ZGRkZGRlwiLFxuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcbiAgICAgICAgb3JpZW50YXRpb246IFwicG9ydHJhaXRcIixcbiAgICAgICAgc2NvcGU6IFwiLlwiLFxuICAgICAgICBzdGFydF91cmw6IFwiLlwiLFxuICAgICAgICBpZDogXCIuXCIsXG4gICAgICAgIHNob3J0X25hbWU6IFwiTG9nYmFzZVwiLFxuICAgICAgICBuYW1lOiBcIkxvZ2Jhc2U6IEFkbWluIERhc2hib2FyZFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgICBcIkxvZ2Jhc2U6IEFkbWluIERhc2hib2FyZFwiLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJmYXZpY29uLmljb1wiLFxuICAgICAgICAgICAgc2l6ZXM6IFwiNDh4NDhcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UveC1pY29uXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwiL2ljb24tMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICBwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwiL2ljb24tMjU2eDI1Ni5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjI1NngyNTZcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwiL2ljb24tMzg0eDM4NC5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjM4NHgzODRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6IFwiL2ljb24tNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgY29tcHJlc3Npb24oKSxcbiAgXSxcblxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpL1wiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjUwNjVcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBvcnQ6IDMwMDMsXG4gIH0sXG4gIGRlZmluZToge1xuICAgIFwicHJvY2Vzcy5lbnZcIjogcHJvY2Vzcy5lbnYsXG4gICAgLy8gZ2xvYmFsOiB7fSwgLy9lbmFibGUgdGhpcyB3aGVuIHJ1bm5pbmcgb24gZGV2L2xvY2FsIG1vZGVcbiAgfSxcblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvXCIpLFxuICAgIH0sXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWw6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcbiAgICBzZXR1cEZpbGVzOiBbXCIuL3NyYy9zZXR1cFRlc3QuanNcIl0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTywyQkFBMkI7QUFDbEMsU0FBUyxlQUFlO0FBRXhCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFUakIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBSSxzQkFBc0IsVUFBVTtBQUVwQyxJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBO0FBQUEsRUFJMUIsT0FBTztBQUFBO0FBQUEsSUFFTCxXQUFXO0FBQUE7QUFBQTtBQUFBLElBRVgsZUFBZTtBQUFBO0FBQUEsSUFFZjtBQUFBLElBQ0EsdUJBQXVCLEtBQUs7QUFBQSxFQUM5QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sc0JBQXNCO0FBQUEsSUFFdEIsUUFBUTtBQUFBLE1BQ04sY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBO0FBQUEsUUFFVixTQUFTO0FBQUE7QUFBQSxRQUVULE1BQU07QUFBQSxRQUNOLGtCQUFrQjtBQUFBLE1BQ3BCO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxjQUFjLENBQUMsZ0NBQWdDO0FBQUEsUUFDL0MsK0JBQStCLEtBQUssT0FBTztBQUFBLE1BQzdDO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJQSxlQUFlO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxJQUFJO0FBQUEsUUFDSixZQUFZO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixhQUNFO0FBQUEsUUFDRixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsRUFDZDtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsU0FBUztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGVBQWUsUUFBUTtBQUFBO0FBQUEsRUFFekI7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQTtBQUFBLE1BRUwsS0FBSyxLQUFLLFFBQVEsa0NBQVcsUUFBUTtBQUFBLElBQ3ZDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsWUFBWSxDQUFDLG9CQUFvQjtBQUFBLEVBQ25DO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
