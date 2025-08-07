---
title: Features
description: Overview of Jekyll Solidbase Theme features
---

# Features

Jekyll Solidbase Theme combines modern web technologies with GitHub Pages deployment for a fast, developer-friendly documentation experience.

## Key Features

### 🚀 Fast & Modern
- Built with SolidJS for optimal performance
- Client-side routing for smooth navigation
- Static site generation for fast loading
- Vinxi build system for modern bundling

### 📱 Responsive Design
- Mobile-first responsive design
- Modern, clean UI components
- Accessible by default
- Based on Solidbase documentation framework

### 🔧 GitHub Workflow Deployment
- **Zero-configuration deployment** with GitHub Actions
- **Automatic builds** on every push to main branch
- **No local Jekyll installation required**
- **Fast CI/CD pipeline** with theme caching

### 📝 Developer Friendly
- **MDX support** for rich content with React components
- **TypeScript integration** for type safety
- **Modern tooling** with Vinxi and SolidJS
- **Simple configuration** via `_config.yml`

### 🎨 Customizable
- Easy theme configuration via `_config.yml`
- Flexible content inclusion/exclusion rules
- Custom styling and branding options
- Social links integration

## GitHub Workflow Benefits

### Automatic Content Processing
The theme automatically:
- Copies your content from repository root
- Processes include/exclude rules from `_config.yml`
- Handles static assets and favicons
- Builds and optimizes the final site

### Supported Content Types
- **Markdown files** (`.md`) in any directory
- **MDX files** (`.mdx`) for enhanced content
- **Static assets** (images, icons, etc.)
- **Custom resources** and favicons

## Configuration Options

### Basic Site Settings
```yaml
# Site identity
title: Your Site Title
description: Your site description
site_author: Your Name
site_url: 'https://yourusername.github.io/your-repo'

# Content processing
include:
  - index.md
  - docs/
  - resources/

exclude:
  - .github
  - node_modules
  - tmp/
```

### Theme Settings
```yaml
theme_config:
  social_links:
    GitHub: 'https://github.com/your-username'
    Twitter: 'https://twitter.com/your-handle'
```

### Homepage Configuration
```yaml
# index.md frontmatter
hero:
  text: Your site description
  actions:
    - text: Documentation
      link: ./docs
    - theme: alt
      text: GitHub
      link: https://github.com/your-repo

features:
  - title: Feature 1
    details: Description
  - title: Feature 2
    details: Description
```

## Content Structure

### Flexible Organization
- Place content anywhere in your repository
- Use `include:` and `exclude:` to control what gets processed
- Support for nested documentation folders
- Automatic asset handling

### Frontmatter Support
All content files support Jekyll-style frontmatter:
```yaml
---
title: Page Title
description: Page description
layout: post  # optional
---
```

## Performance Features

### Build Optimization
- **Tree shaking** for minimal bundle size
- **Code splitting** for faster page loads
- **Asset optimization** for images and resources
- **CDN-ready** static output

### Runtime Performance
- **SolidJS reactivity** for efficient updates
- **Client-side routing** without page reloads
- **Lazy loading** for better initial load times
- **Progressive enhancement** approach

## Future Enhancements

### Planned Features
- Traditional Jekyll theme support with `remote_theme`
- Local development server
- Enhanced MDX component library
- Advanced theming options
- Search functionality