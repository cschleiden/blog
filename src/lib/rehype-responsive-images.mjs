import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DEFAULT_WIDTHS = [480, 768, 1024, 1280, 1600];
const OPTIMIZABLE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export function rehypeResponsiveImages(options = {}) {
  const publicDir = options.publicDir ?? path.join(process.cwd(), 'public');
  const outputDir = options.outputDir ?? path.join(publicDir, 'generated', 'images');
  const outputPath = options.outputPath ?? '/generated/images';
  const widths = options.widths ?? DEFAULT_WIDTHS;

  return async function transformer(tree) {
    const imageNodes = [];
    collectImageNodes(tree, imageNodes);

    await Promise.all(imageNodes.map(async ({ node, parent, index }) => {
      const src = node.properties?.src;
      if (!shouldOptimize(src)) {
        addImageDefaults(node);
        return;
      }

      const sourcePath = path.join(publicDir, decodeURIComponent(src.slice(1)));
      if (!sourcePath.startsWith(publicDir) || !existsSync(sourcePath)) {
        addImageDefaults(node);
        return;
      }

      const metadata = await sharp(sourcePath).metadata();
      if (!metadata.width || !metadata.height) {
        addImageDefaults(node);
        return;
      }

      const targetWidths = widths.filter(width => width < metadata.width);
      if (targetWidths.length === 0) {
        targetWidths.push(metadata.width);
      }

      const variants = await createVariants({
        sourcePath,
        src,
        outputDir,
        outputPath,
        widths: targetWidths,
      });

      node.properties = {
        ...node.properties,
        width: metadata.width,
        height: metadata.height,
        loading: node.properties.loading ?? 'lazy',
        decoding: node.properties.decoding ?? 'async',
        sizes: node.properties.sizes ?? '(min-width: 720px) 672px, calc(100vw - 48px)',
      };

      if (!parent || index === undefined || variants.length === 0) {
        return;
      }

      const avif = variants.filter(variant => variant.format === 'avif');
      const webp = variants.filter(variant => variant.format === 'webp');

      parent.children[index] = {
        type: 'element',
        tagName: 'picture',
        properties: {},
        children: [
          sourceNode('image/avif', avif, node.properties.sizes),
          sourceNode('image/webp', webp, node.properties.sizes),
          node,
        ].filter(Boolean),
      };
    }));
  };
}

function collectImageNodes(node, imageNodes, parent, index) {
  if (node?.type === 'element' && node.tagName === 'img') {
    imageNodes.push({ node, parent, index });
  }

  if (!Array.isArray(node?.children)) return;

  node.children.forEach((child, childIndex) => {
    collectImageNodes(child, imageNodes, node, childIndex);
  });
}

function shouldOptimize(src) {
  if (typeof src !== 'string') return false;
  if (!src.startsWith('/') || src.startsWith('//')) return false;
  return OPTIMIZABLE_EXTENSIONS.has(path.extname(src).toLowerCase());
}

function addImageDefaults(node) {
  if (!node.properties) node.properties = {};
  node.properties.loading ??= 'lazy';
  node.properties.decoding ??= 'async';
}

async function createVariants({ sourcePath, src, outputDir, outputPath, widths }) {
  await mkdir(outputDir, { recursive: true });

  const hash = createHash('sha256').update(`${src}:${await sharp(sourcePath).metadata().then(m => `${m.width}x${m.height}`)}`).digest('hex').slice(0, 12);
  const uniqueWidths = [...new Set(widths)].sort((a, b) => a - b);
  const variants = [];

  for (const width of uniqueWidths) {
    for (const format of ['avif', 'webp']) {
      const fileName = `${hash}-${width}.${format}`;
      const destination = path.join(outputDir, fileName);
      const url = `${outputPath}/${fileName}`;

      if (!existsSync(destination)) {
        const image = sharp(sourcePath).resize({ width, withoutEnlargement: true });
        const buffer = format === 'avif'
          ? await image.avif({ quality: 60 }).toBuffer()
          : await image.webp({ quality: 78 }).toBuffer();
        await writeFile(destination, buffer);
      }

      variants.push({ format, width, url });
    }
  }

  return variants;
}

function sourceNode(type, variants, sizes) {
  if (variants.length === 0) return undefined;

  return {
    type: 'element',
    tagName: 'source',
    properties: {
      type,
      srcSet: variants.map(variant => `${variant.url} ${variant.width}w`).join(', '),
      sizes,
    },
    children: [],
  };
}
