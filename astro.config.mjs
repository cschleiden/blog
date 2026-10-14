import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { rehypeResponsiveImages } from './src/lib/rehype-responsive-images.mjs';

export default defineConfig({
  site: 'https://cschleiden.dev',
  // Astro 7 defaults to JSX whitespace rules, which drop spaces between inline elements.
  compressHTML: true,
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeResponsiveImages],
    }),
  },
  integrations: [mdx(), sitemap()],
});
