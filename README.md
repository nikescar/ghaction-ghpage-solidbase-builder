# Github Action Solidbase Builder

A GitHub Action that converts your markdown documentation to a beautiful website using SolidJS and Solidbase for GitHub Pages and other hosting providers.

## Quick Description

This project provides a complete solution for converting Markdown documentation into beautiful, responsive websites using:

- **SolidJS**: Modern reactive framework for fast, efficient web applications
- **Solidbase**: Documentation theme system specifically designed for technical content
- **Vinxi**: Full-stack SolidJS framework with SSR/SSG capabilities
- **GitHub Actions**: Automated deployment pipeline for GitHub Pages
- **Multi-platform**: Support for various hosting providers (Deno, Firebase, DigitalOcean)

## Prerequisites

```
documentation_repo/
├── 📄 Configuration Files
│   ├── _config.yml              # Main configuration for site settings and processing rules
│
├── 📖 Documentation & Content
│   ├── index.md                # Site homepage content
│   ├── README.md               # This file - project documentation
│   ├── docs/                   # Documentation pages
│   │   ├── deployment.mdx      # Deployment instructions (MDX format)
│   │   ├── features.md         # Feature documentation
│   │   ├── getting-started.md  # Getting started guide
│   │   └── index.mdx           # Documentation index page
│   └── _404.html               # Custom 404 error page
│
├── 🎨 Assets & Resources
│   └── resources/              # Static assets (favicons, logos, images)
│       └── favicon.ico
```

## Key Features

- 📝 **Markdown & MDX Support**: Write documentation in familiar formats
- 🎨 **Beautiful Theming**: Responsive design with Solidbase theme system
- ⚡ **Fast Performance**: SolidJS provides excellent runtime performance
- 🔧 **Flexible Configuration**: Customizable via YAML configuration
- 🚀 **Easy Deployment**: GitHub Actions integration for automated publishing
- 🌐 **Multi-host Support**: Deploy to GitHub Pages, Deno, Firebase, DigitalOcean

## Github Workflow

```yaml
# Add to .github/workflows/pages.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: your-org/ghaction-ghpage-solidbase-builder@v1
        with:
          config-file: '_config.yml'
```

### Inputs

- `config-file`: Path to configuration file (default: `_config.yml`)
- `docs-dir`: Documentation directory (default: `docs/`)
- `output-dir`: Build output directory (default: `.output/`)

### Outputs

- `build-path`: Path to the generated static site
- `deployment-url`: URL of the deployed site

## Github Pages push from local

```bash
npm install
npm run build
# Files generated in .output/public/ ready for GitHub Pages
```

## Set Pages to Other Providers
using nitro : https://nitro.build/config

### deploy to deno
https://nitro.build/deploy/providers/deno-deploy

```bash
$ NITRO_PRESET=deno_deploy npm run build

# Make sure to run the deployctl command from the output directory
$ cd .output
$ deployctl deploy --project=my-project server/index.ts
```

### deploy to firebase
https://nitro.build/deploy/providers/firebase

```bash
$ npm install -g firebase-tools@latest
$ firebase login
$ firebase init hosting
# edit firebase.json

$ NITRO_PRESET=firebase npm run build
$ firebase emulators:start
$ NITRO_PRESET=firebase npm run build
$ firebase deploy
```

### deploy to digital ocean
https://nitro.build/deploy/providers/digitalocean

```bash
NITRO_PRESET=digital_ocean

# add engines to package.json
# add start cmd to package.json

# run start on digitalocean
```