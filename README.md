# MDX Sitegen Solidbase

A GitHub Action that converts your markdown documentation to a beautiful website using SolidJS and Solidbase for GitHub Pages and other hosting providers.

## 1. Quick Description

This project provides a complete solution for converting Markdown documentation into beautiful, responsive websites using:

- **SolidJS**: Modern reactive framework for fast, efficient web applications
- **Solidbase**: Documentation theme system specifically designed for technical content
- **Vinxi**: Full-stack SolidJS framework with SSR/SSG capabilities
- **GitHub Actions**: Automated deployment pipeline for GitHub Pages
- **Multi-platform**: Support for various hosting providers (Deno, Firebase, DigitalOcean)

## 2. Key Features

- 📝 **Markdown & MDX Support**: Write documentation in familiar formats
- 🎨 **Beautiful Theming**: Responsive design with Solidbase theme system
- ⚡ **Fast Performance**: SolidJS provides excellent runtime performance
- 🔧 **Flexible Configuration**: Customizable via YAML configuration
- 🚀 **Easy Deployment**: GitHub Actions integration for automated publishing
- 🌐 **Multi-host Support**: Deploy to GitHub Pages, Deno, Firebase, DigitalOcean

## 3. Prerequisites

Make your documentation directory like below.

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

## 4. Deployment

### 4-1. with Github Workflow

Copy [.github/workflows/vite.doc.yml](.github/workflows/vite.doc.yml) file to your repository.

### 4-2. with Github Action

in your github workflow, add following snippet.

```yaml

```

#### 4-1-1. Inputs

- `config-file`: Path to configuration file (default: `_config.yml`)

#### 4-1-2. Outputs

- `build-path`: Path to the generated static site
- `deployment-url`: URL of the deployed site

### 4-3. with npm init

on your local repository, run following command.
```bash
$ npm init mdx-sitegen-solidbase
```

### 4-4. with jekyll-remote-theme

WIP.