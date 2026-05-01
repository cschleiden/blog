#!/usr/bin/env node

/**
 * Create a new blog post with frontmatter template.
 * Usage: npm run new-post "My Post Title"
 */

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const title = process.argv[2];

if (!title) {
  console.error('Usage: npm run new-post "My Post Title"');
  process.exit(1);
}

const now = new Date();
const dateStr = now.toISOString().split('T')[0];
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const filename = `${dateStr}-${slug}.mdx`;
const filepath = join(__dirname, '..', 'src', 'content', 'blog', filename);

if (existsSync(filepath)) {
  console.error(`File already exists: ${filepath}`);
  process.exit(1);
}

const frontmatter = `---
title: '${title}'
date: '${dateStr}'
tags: []
draft: true
summary: ''
---

`;

writeFileSync(filepath, frontmatter);
console.log(`✨ Created: src/content/blog/${filename}`);
