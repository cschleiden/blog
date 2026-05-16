import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeResponsiveImages } from './src/lib/rehype-responsive-images.mjs';

export default defineConfig({
  site: 'https://cschleiden.dev',
  integrations: [
    mdx({
      rehypePlugins: [rehypeResponsiveImages],
    }),
    sitemap(),
  ],
});
