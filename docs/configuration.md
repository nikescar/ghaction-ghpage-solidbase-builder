---
title: Configuration
description: How to configure mdx-sitegen-solidbase
---

# Configuration

Learn how to configure mdx-sitegen-solidbase.

## Configuration File Structure

The main configuration is done in your `_config.yml` file in your repository root:

```yaml
# Site settings
title: Your Site Title
description: Your site description
issue_link: "https://github.com/yourusername/mdx-sitegen-solidbase/issues"
edit_path: "https://github.com/yourusername/mdx-sitegen-solidbase/edit/main/:path"
lang: en
site_favicon: './resources/favicon.ico'
site_author: Your Name
repo_url: 'https://github.com/yourusername/mdx-sitegen-solidbase'
site_url: 'https://yourusername.github.io/mdx-sitegen-solidbase/'

# 404 page redirection rules - for github site repo, ex. {id}.github.io
404_subsite_urls:
  - /mdx-sitegen-solidbase/
  # - /subpath/
  # - /subpath2/

# Content processing rules
include:
  - .well-known
  - index.md
  - docs
  - resources
  - README.md
  - CREDITS.md

exclude:
  - .github
  - .output
  - .vinxi
  - node_modules
  - scripts
  - tmp
  - _config.yml
  - app.config.ts
  - build.ts
  - package.json
  - package-lock.json
  - pnpm-lock.yaml
  - tsconfig.json

# Theme configuration
theme_upstream: 'https://github.com/yourusername/mdx-sitegen-solidbase'
theme_config:
  social_links:
    gitHub: 'https://github.com/yourusername/mdx-sitegen-solidbase'
    discord: 'https://discord.gg'
  nav:
    Docs: /mdx-sitegen-solidbase/docs
    Readme: /mdx-sitegen-solidbase/readme
    Credits: /mdx-sitegen-solidbase/credits
  sidebar:
    - Docs:
      - Guide:
          "Getting Started": /getting-started
          Features: /features
          Configuration: /configuration
          Deployment: /deployment
```

## Required Configuration

### Essential Settings

```yaml
# Required: Site identity
title: Your Site Title
description: Your site description

# Required: URL configuration
site_url: 'https://yourusername.github.io/mdx-sitegen-solidbase/'
repo_url: 'https://github.com/yourusername/mdx-sitegen-solidbase'

# Required: Content inclusion
include:
  - index.md    # Your homepage
  - docs        # Documentation folder
```

### GitHub Integration

```yaml
# GitHub repository information
repo_url: 'https://github.com/yourusername/mdx-sitegen-solidbase'
site_author: Your Name

# GitHub Pages integration
issue_link: "https://github.com/yourusername/mdx-sitegen-solidbase/issues"
edit_path: "https://github.com/yourusername/mdx-sitegen-solidbase/edit/main/:path"

# Optional: Custom favicon
site_favicon: './resources/favicon.ico'
```

### 404 Page Configuration

Configure 404 page redirection for GitHub Pages:

```yaml
# 404 page redirection rules - for github site repo, ex. {id}.github.io
404_subsite_urls:
  - /mdx-sitegen-solidbase/
  # Add additional subpaths if needed
  # - /subpath/
  # - /subpath2/
```

## Content Processing Rules

### Include Rules
Specify which files and folders to include in your site:

```yaml
include:
  - .well-known        # Special files (.well-known directory)
  - index.md           # Homepage
  - docs               # Documentation
  - resources          # Images, assets
  - README.md          # README file
  - CREDITS.md         # Credits file
```

### Exclude Rules
Specify what to exclude from processing:

```yaml
exclude:
  - .github            # GitHub workflow files
  - .output            # Build output directory
  - .vinxi             # Vinxi build cache
  - node_modules       # Dependencies
  - scripts            # Build scripts
  - tmp                # Temporary files
  - _config.yml        # Configuration file
  - app.config.ts      # App configuration
  - build.ts           # Build scripts
  - package.json       # Package manifest
  - package-lock.json  # Lock file
  - pnpm-lock.yaml     # PNPM lock file
  - tsconfig.json      # TypeScript config
```

## Homepage Configuration

Configure your `index.md` file with frontmatter:

```yaml
---
title: Your Site Title
titleTemplate: Your tagline here
layout: home

hero:
  text: Your main description
  actions:
    - text: Documentation
      link: ./docs
    - theme: alt
      text: GitHub
      link: https://github.com/yourusername/mdx-sitegen-solidbase
  image:
    src: https://your-domain.com/logo.png

features:
  - 
    title: Feature 1
    details: Description of your first feature
  - 
    title: Feature 2
    details: Description of your second feature
  - 
    title: Feature 3
    details: Description of your third feature
---

Additional content for your homepage goes here.
```

## Navigation and Sidebar Configuration

### Navigation Menu

Configure the main navigation menu:

```yaml
theme_config:
  nav:
    Docs: /mdx-sitegen-solidbase/docs
    Readme: /mdx-sitegen-solidbase/readme
    Credits: /mdx-sitegen-solidbase/credits
    # Custom pages can be added:
    # Blog: /blog
    # Packages: /packages
```

### Sidebar Structure

Configure the documentation sidebar:

```yaml
theme_config:
  sidebar:
    - Docs:
      - Guide:
          "Getting Started": /getting-started
          Features: /features
          Configuration: /configuration
          Deployment: /deployment
```

## Social Links

Add social media links to your site:

```yaml
theme_config:
  social_links:
    gitHub: 'https://github.com/username'
    discord: 'https://discord.gg/your-server'
    # Other social links can be added:
    # twitter: 'https://twitter.com/username'
    # linkedin: 'https://linkedin.com/in/username'
```

## Theme Upstream Configuration

Configure the theme source repository:

```yaml
# Theme upstream repository
theme_upstream: 'https://github.com/yourusername/mdx-sitegen-solidbase'
```

## Asset Management

### Favicon Configuration
Set a custom favicon:

```yaml
site_favicon: './resources/favicon.ico'
```

Ensure the favicon file is in your repository and included in the `include:` list.

### Resource Handling
Static assets are automatically copied during build. Include asset folders in your configuration:

```yaml
include:
  - resources/         # Images, icons
  - assets/           # CSS, JS files
  - public/           # Public assets
```

## Advanced Configuration

### URL Configuration
**Important:** The theme supports both root domains and subpaths:

```yaml
# ✅ Root domain
site_url: 'https://yourusername.github.io'

# ✅ With subpath (GitHub Pages repository)
site_url: 'https://yourusername.github.io/mdx-sitegen-solidbase/'

# ✅ Custom domain
site_url: 'https://your-custom-domain.com'
```

### Language Configuration

Set the site language:

```yaml
# Site language
lang: en
```

### Build Optimization
The build process automatically handles:
- Installing npm dependencies
- Building with Vinxi
- Processing include/exclude rules
- Copying assets and favicon
- Generating optimized output
- 404 page redirection setup

### Environment Variables
You can use GitHub repository secrets for sensitive configuration:

```yaml
# In your _config.yml, reference environment variables
analytics_id: ${ { secrets.GA_TRACKING_ID } }
```

## Content Structure Examples

### Documentation Site
```yaml
include:
  - index.md
  - docs
  - resources
  - README.md
  - CREDITS.md

exclude:
  - .github
  - node_modules
  - src
  - tmp
```

### Blog Site
```yaml
include:
  - index.md
  - _posts
  - about.md
  - resources

exclude:
  - .github
  - node_modules
  - drafts
```

### Mixed Content Site
```yaml
include:
  - index.md
  - docs
  - blog
  - projects
  - resources
  - .well-known
  - README.md

exclude:
  - .github
  - node_modules
  - src
  - tmp
  - "*.log"
```

## Troubleshooting Configuration

### Common Issues

1. **Content not appearing**: Check that files are in the `include:` list
2. **Build errors**: Verify YAML syntax in `_config.yml`
3. **Asset 404s**: Ensure assets are included and paths are correct
4. **URL issues**: Confirm `site_url` format is correct
5. **404 redirects not working**: Check `404_subsite_urls` configuration
6. **Navigation issues**: Verify `theme_config.nav` paths match your site structure

### Validation
You can validate your YAML configuration using our validation script:
```bash
# Run the built-in validation script
node scripts/validate-yaml.js
```

Or use external tools:
```bash
# Install yq for YAML validation
pip install yq

# Validate syntax
yq eval . _config.yml
```