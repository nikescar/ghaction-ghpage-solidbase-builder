---
title: Features
description: Overview of mdx-sitegen-solidbase features
---

# Features

mdx-sitegen-solidbase combines modern web technologies with flexible deployment options for a fast, developer-friendly documentation experience.

## Key Features

### 🚀 Fast & Modern
- Built with SolidJS for optimal performance and small bundle sizes
- Client-side routing for smooth navigation
- Static site generation for fast loading
- Vinxi build system for modern bundling and optimization
- TypeScript support for type safety

### 📱 Responsive Design
- Mobile-first responsive design
- Modern, clean UI components based on Solidbase framework
- Accessible by default with proper ARIA attributes
- Dark/light theme support
- Customizable styling and branding

### 🔧 Unified Deployment System
- **Single NPX command**: `npx github:nikescar/mdx-sitegen-solidbase` for all providers
- **Configuration-driven**: Deployment target determined by `_config.yml`
- **GitHub Pages**: Zero-configuration deployment with GitHub Actions
- **Cloudflare Pages**: Fast global CDN with automatic builds
- **Firebase Hosting**: Google's robust hosting platform  
- **Local Development**: Build and serve locally for testing
- **No provider-specific tools required**: Unified workflow for all platforms

### 🎯 Flexible Workflow Deployment
- **Unified deployment command** works with all providers
- **Configuration-based targeting** via `_config.yml` settings
- **Automatic builds** on every push to main branch with GitHub Actions
- **No provider-specific CLI tools required** for deployment
- **Fast CI/CD pipeline** with intelligent caching and theme reuse
- **Multi-provider support** from single workflow and codebase

### 📝 Developer Friendly
- **MDX support** for rich content with JSX components
- **Markdown support** for simple content creation
- **TypeScript integration** for type safety and better DX
- **Modern tooling** with Vinxi, SolidJS, and pnpm
- **Simple configuration** via `_config.yml`
- **Hot reload** during development
- **Error reporting** with helpful debugging information

### 🎨 Highly Customizable
- **Easy theme configuration** via `_config.yml`
- **Flexible content inclusion/exclusion** rules
- **Custom styling** and branding options
- **Social links integration** (GitHub, Discord, etc.)
- **Navigation** and sidebar customization
- **Custom homepage** with hero section and features
- **Favicon and asset management**

### 🔗 GitHub Integration
- **Issue links** for easy bug reporting
- **Edit page links** for quick content updates
- **Repository information** display
- **Automatic social link detection**
- **Branch-based deployment** triggers

## Deployment Provider Benefits

### GitHub Pages
- **Free hosting** for public repositories
- **Custom domain support** with SSL
- **Automatic SSL certificates**
- **Built-in CDN** for fast global delivery
- **Integration** with GitHub ecosystem

### Cloudflare Pages
- **Global edge network** for ultra-fast loading
- **Automatic preview deployments** for pull requests  
- **Custom domains** with free SSL
- **Analytics** and performance insights
- **Edge computing** capabilities

### Firebase Hosting
- **Google's infrastructure** for reliability
- **Custom domains** with SSL
- **Preview channels** for testing
- **Integration** with Firebase services
- **Analytics** and performance monitoring

## Automatic Content Processing

The theme automatically:
- **Downloads the latest theme** from the configured repository
- **Processes content** based on include/exclude rules in `_config.yml`
- **Converts Markdown/MDX** to optimized HTML with SolidJS components
- **Handles static assets** including favicons, images, and resources
- **Generates SPA routing** with proper 404 handling for static hosts
- **Builds and optimizes** the final site with Vinxi bundler
- **Deploys to configured provider** automatically

## Supported Content Types

### Markdown Files (`.md`)
- **Standard Markdown** with frontmatter support
- **Code highlighting** with multiple themes
- **Tables, lists, and typography** formatting
- **Image and link** processing
- **Custom metadata** via frontmatter

### MDX Files (`.mdx`)  
- **JSX components** within Markdown content
- **Interactive examples** and demos
- **Custom components** for enhanced content
- **TypeScript support** for components
- **Import statements** for external components

### Static Assets
- **Images** (PNG, JPG, SVG, WebP)
- **Favicons** and app icons  
- **Custom CSS** and JavaScript files
- **Fonts** and other resources
- **Well-known files** (robots.txt, sitemap.xml)

### Configuration Files
- **YAML configuration** (`_config.yml`)
- **Custom 404 pages** (`_404.html`)
- **Redirects** and routing rules
- **Environment variables** support

## Performance Features

### Build Optimization
- **Tree shaking** for minimal bundle sizes
- **Code splitting** for faster loading
- **Image optimization** and lazy loading
- **CSS minification** and critical CSS inlining
- **JavaScript bundling** with modern ES modules

### Runtime Performance  
- **SolidJS reactivity** for efficient updates
- **Client-side routing** without page reloads
- **Prefetching** for faster navigation
- **Service worker** support for offline functionality
- **Progressive enhancement** for core functionality

### Caching Strategy
- **GitHub Actions caching** for faster builds
- **CDN caching** on hosting providers
- **Browser caching** with proper headers
- **Theme caching** to avoid repeated downloads

## SEO and Accessibility

### Search Engine Optimization
- **Meta tags** from frontmatter
- **Structured data** for better indexing
- **Sitemap generation** for search engines
- **Open Graph** and Twitter Card support
- **Canonical URLs** for duplicate content

### Accessibility Features
- **Semantic HTML** structure
- **ARIA attributes** for screen readers
- **Keyboard navigation** support
- **Color contrast** compliance
- **Focus management** for SPA routing

## Development Experience

### Local Development
- **Hot module replacement** for instant updates
- **Error overlay** with helpful debugging
- **TypeScript checking** during development
- **Linting and formatting** integration
- **Source maps** for debugging

### Content Creation
- **Live preview** during editing
- **Syntax highlighting** in editors
- **Auto-completion** for frontmatter
- **Link validation** and checking
- **Image optimization** suggestions

### Deployment Testing
- **Unified local testing** with same NPX command
- **Preview generation** before publishing to providers
- **Build error reporting** with actionable fixes and debugging
- **Performance auditing** tools integration and optimization tips
