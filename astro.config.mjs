import { defineConfig } from 'astro/config';

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://algorithms.chechu.dev/",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2023-01-10"),
    }),
  ],
});