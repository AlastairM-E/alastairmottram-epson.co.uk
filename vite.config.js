const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "pull-requests": resolve(
          __dirname,
          "case-study/pull-requests/index.html"
        ),
        cv: resolve(__dirname, "cv/index.html"),
      },
    },
  },
});
