---
title: Getting Started
description: Learn how to get started with mdx-sitegen-solidbase
---

# Getting Started

Welcome to mdx-sitegen-solidbase! This guide will help you get up and running quickly using GitHub Workflow deployment with multiple hosting providers.

**Current Status:** This theme uses GitHub Workflow for deployment with support for GitHub Pages, Firebase Hosting, and Cloudflare Pages. The theme is built with SolidJS and Solidbase for optimal performance.

## Quick Setup

### Method 1: Using the GitHub Workflow (Recommended)

1. **Create a new repository** or use an existing one for your documentation site.

2. **Create the GitHub Workflow file** at `.github/workflows/vite.docs.yml`:

```yaml
name: Deploy static content to Pages
on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: clone solidbase theme github
        run: |
          export PATH="/opt/hostedtoolcache/node/22.x.x/x64/bin/:$PATH"
          export theme_upstream=$(grep -m1 'theme_upstream:' _config.yml | awk '{print $2}' | sed "s/'//g")/archive/refs/heads/main.tar.gz
          wget -q "$theme_upstream" -O main.tar.gz
          mkdir -p .solidbase
          tar -xzf main.tar.gz --strip-components=1 -C .solidbase
          pushd ./.solidbase
          bash ghworkflow.sh --src-path ../
          popd
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          CLOUDFLARE_PAGES_TOKEN: ${{ secrets.CLOUDFLARE_PAGES_TOKEN }}
          FIREBASE_SERVICE_ACCOUNT_KEY: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_KEY }}
```

3. **Create your configuration file** `_config.yml` in your repository root:

```yaml
# Site settings
title: Your Site Title
description: Your site description
site_author: Your Name
repo_url: 'https://github.com/yourusername/your-repo'
site_url: 'https://yourusername.github.io/your-repo/'

# Theme configuration
theme_upstream: 'https://github.com/nikescar/mdx-sitegen-solidbase'

# Content processing
include:
  - index.md
  - docs
  - resources
  - README.md

exclude:
  - .github
  - .output
  - .vinxi
  - .solidbase
  - node_modules
  - tmp

# Deployment configuration (choose one)
deployment:
  provider: 'github'  # or 'cloudflare-pages' or 'firebase'

# Theme settings
theme_config:
  social_links:
    gitHub: 'https://github.com/yourusername/your-repo'
  nav:
    Docs: /docs
    Readme: /readme
  sidebar:
    - Docs:
      - Guide:
          "Getting Started": /getting-started
          Configuration: /configuration
          Deployment: /deployment
```

4. **Create your homepage** `index.md`:

```markdown
---
title: Your Site Title
titleTemplate: Your site tagline
layout: home

hero:
  text: Your site description
  actions:
    - text: Docs
      link: /docs
    - theme: alt
      text: GitHub
      link: https://github.com/yourusername/your-repo
  image:
    src: https://yourusername.github.io/your-repo/resources/logo.png

features:
  - 
    title: Fast & Modern
    details: Built with SolidJS for optimal performance
  - 
    title: Easy Deployment
    details: GitHub Workflow deployment to multiple providers
  - 
    title: Markdown & MDX
    details: Support for both Markdown and MDX content
---

Welcome to your documentation site built with mdx-sitegen-solidbase!
```

5. **Create your documentation** in the `docs/` folder with `.mdx` files.

6. **Enable GitHub Pages** in your repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions

7. **Push your changes** and the workflow will automatically deploy your site!

### Method 2: Quick Start with NPX (Unified Deployment)

The fastest way to deploy to any provider:

```bash
# 1. Create your _config.yml with deployment provider
# 2. Add your content (index.md, docs/, etc.)
# 3. Deploy with a single command:
npx github:nikescar/mdx-sitegen-solidbase

# 4. Test locally (optional)
cd .solidbase/.output/public && npx serve
```

This unified command works with all supported providers - the deployment target is determined by your `_config.yml` configuration.

## Requirements

- **Node.js**: Version 22 or higher
- **GitHub**: Repository with GitHub Actions enabled (for automatic deployment)
- **Content**: `_config.yml` and `index.md` files
- **Provider Setup**: Account and configuration for your chosen hosting provider

## File Structure

Your repository should look like this:

```
your-repo/
├── .github/
│   └── workflows/
│       └── vite.docs.yml          # GitHub Workflow for deployment
├── _config.yml                    # Main configuration
├── index.md                       # Homepage content
├── docs/                          # Documentation pages
│   ├── index.mdx                  # Docs homepage
│   ├── getting-started.md         # Getting started guide
│   ├── configuration.md           # Configuration docs
│   └── deployment.mdx             # Deployment guide
├── resources/                     # Static assets
│   ├── favicon.ico                # Site favicon
│   └── logo.png                   # Site logo
└── README.md                      # Project README
```

## Supported Deployment Providers

The theme supports multiple hosting providers:

### GitHub Pages
- **Setup**: Enable GitHub Actions in repository settings
- **Configuration**: `provider: 'github'`
- **URL**: `https://username.github.io/repository/`

### Cloudflare Pages  
- **Setup**: Create project at [Cloudflare Dashboard](https://dash.cloudflare.com/)
- **Configuration**: `provider: 'cloudflare-pages'`
- **URL**: `https://your-project.pages.dev/`

### Firebase Hosting
- **Setup**: Create project at [Firebase Console](https://console.firebase.google.com/)
- **Configuration**: `provider: 'firebase'`  
- **URL**: `https://your-project.web.app/`

## Deployment Commands

### Unified Deployment
All providers use the same command:
```bash
npx github:nikescar/mdx-sitegen-solidbase
```

### GitHub Workflow (Automatic)
Push to main branch triggers automatic deployment via GitHub Actions.

### Local Testing
```bash
# Build locally without deploying
npx github:nikescar/mdx-sitegen-solidbase

# Serve the generated site
cd .solidbase/.output/public && npx serve
```

The deployment target is controlled entirely by your `_config.yml` configuration - no need to learn provider-specific tools!

## Next Steps

- Check out the [Features](/docs/features) page
- Learn about [Configuration](/docs/configuration)
- See the [Deployment guide](/docs/deployment) for more details