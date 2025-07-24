# Copilot Instructions for Next.js Blog Project

This is a Next.js blog built with TypeScript, Tailwind CSS, and Contentlayer for content management. It's based on the tailwind-nextjs-starter-blog template.

## Project Overview

- **Framework**: Next.js 15.1.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content Management**: Contentlayer2 for processing MDX blog posts
- **Content Location**: Blog posts are in `data/blog/` directory as `.mdx` files
- **Author Data**: Author information in `data/authors/` directory

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation and Development

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

   - Server starts on `http://localhost:3000`
   - If port 3000 is busy, it will automatically try port 3001
   - Hot reload is enabled for development

3. **Available Scripts**:
   - `npm run dev` - Start development server
   - `npm run build` - Build for production
   - `npm run serve` - Start production server (after build)
   - `npm run lint` - Run ESLint with auto-fix
   - `npm run analyze` - Analyze bundle size

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── blog/              # Blog pages
│   ├── tags/              # Tag pages
│   ├── projects/          # Projects page
│   └── about/             # About page
├── components/            # Reusable React components
├── data/                  # Content and configuration
│   ├── blog/             # Blog posts (.mdx files)
│   ├── authors/          # Author profiles
│   ├── siteMetadata.js   # Site configuration
│   └── projectsData.ts   # Projects data
├── layouts/              # Page layout components
├── public/               # Static assets
├── css/                  # Global styles
└── contentlayer.config.ts # Contentlayer configuration
```

## Content Management

### Blog Posts

- Location: `data/blog/`
- Format: MDX files with frontmatter
- Naming: `YYYY-MM-DD-post-slug.mdx`
- Frontmatter fields:
  ```yaml
  ---
  title: 'Post Title'
  date: '2024-01-01'
  tags: ['tag1', 'tag2']
  draft: false
  summary: 'Brief description'
  ---
  ```

### Authors

- Location: `data/authors/`
- Default author: `data/authors/default.mdx`

## Testing the Project

### Manual Testing Checklist

1. **Development Server**:

   - [ ] Server starts without errors
   - [ ] Home page loads correctly
   - [ ] Navigation works (Blog, Tags, Projects, About)
   - [ ] Search functionality works
   - [ ] Theme switcher works (light/dark mode)

2. **Blog Functionality**:

   - [ ] Blog post list displays correctly
   - [ ] Individual blog posts render properly
   - [ ] Tags page shows all tags
   - [ ] Tag filtering works
   - [ ] Reading time calculation appears
   - [ ] Code syntax highlighting works

3. **Content Rendering**:

   - [ ] MDX content renders correctly
   - [ ] Images load properly
   - [ ] Links work correctly
   - [ ] Math formulas render (if using KaTeX)
   - [ ] Citations work (if using)

4. **Responsive Design**:

   - [ ] Mobile navigation works
   - [ ] Layout adapts to different screen sizes
   - [ ] Touch interactions work on mobile

5. **Performance**:
   - [ ] Pages load quickly
   - [ ] No console errors
   - [ ] Images are optimized

### Browser Testing with Playwright

To capture screenshots and test the site:

```javascript
// Navigate to the site
await page.goto('http://localhost:3000')

// Take homepage screenshot
await page.screenshot({ path: 'homepage.png' })

// Test navigation
await page.click('text=Blog')
await page.screenshot({ path: 'blog-page.png' })

// Test search
await page.click('[aria-label="Search"]')
await page.type('input[type="search"]', 'test query')

// Test theme toggle
await page.click('[aria-label="Theme switcher"]')
```

### Build Testing

1. **Production Build**:

   ```bash
   npm run build
   ```

   - [ ] Build completes without errors
   - [ ] No TypeScript errors
   - [ ] Contentlayer processes all content

2. **Production Server**:
   ```bash
   npm run serve
   ```
   - [ ] Production build serves correctly
   - [ ] All functionality works in production mode

## Common Issues and Solutions

### Contentlayer Issues

- **Problem**: Content not updating
- **Solution**: Restart dev server to trigger Contentlayer rebuild

### Port Conflicts

- **Problem**: Port 3000 already in use
- **Solution**: Next.js automatically tries port 3001, or manually specify: `npm run dev -- -p 3002`

### Build Errors

- **Problem**: TypeScript compilation errors
- **Solution**: Check `tsconfig.json` and fix type errors in components

### Missing Dependencies

- **Problem**: Module not found errors
- **Solution**: Run `npm install` to ensure all dependencies are installed

## Development Workflow

1. **Adding New Blog Posts**:

   - Create new `.mdx` file in `data/blog/`
   - Follow naming convention: `YYYY-MM-DD-title.mdx`
   - Include proper frontmatter
   - Test locally before committing

2. **Modifying Components**:

   - Components are in `components/` directory
   - Use TypeScript for type safety
   - Follow existing patterns and conventions
   - Test changes in development mode

3. **Styling Changes**:

   - Use Tailwind CSS classes
   - Global styles in `css/tailwind.css`
   - Component-specific styles should use Tailwind

4. **Configuration Updates**:
   - Site metadata: `data/siteMetadata.js`
   - Contentlayer config: `contentlayer.config.ts`
   - Next.js config: `next.config.js`

## Deployment Preparation

Before deploying:

1. Run `npm run build` to ensure production build works
2. Check for any console warnings or errors
3. Test critical user paths manually
4. Verify all content renders correctly
5. Check responsive design on multiple devices

## Environment Variables

The project may use environment variables for:

- Analytics tracking
- Search functionality
- External service integrations

Create `.env.local` file for local development if needed.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Contentlayer Documentation](https://contentlayer.dev)
- [MDX Documentation](https://mdxjs.com)
