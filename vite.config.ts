import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig(({ command }) => {
  const commonConfig = {
    base: "/textwand/",
    define: {
      VERSION: JSON.stringify(pkg.version),
    },
  };

  if (command === "serve") {
    // dev server
    return {
      ...commonConfig,
      server: {
        watch: {
          usePolling: true, // wsl
        },
      },
    };
  } else {
    // build
    return {
      ...commonConfig,
      build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: "esbuild",
      },
    };
  }
});
