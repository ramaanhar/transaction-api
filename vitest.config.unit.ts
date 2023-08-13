// vitest.config.unit.ts

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      controllers: "/src/controllers",
      utils: "/src/utils",
    },
  },
});
