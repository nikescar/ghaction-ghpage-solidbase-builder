# MDX Sitegen Solidbase

A GitHub Action that converts your markdown documentation to a beautiful website using SolidJS and Solidbase for GitHub Pages and other hosting providers.

## 1. Getting Started

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

edit [_config.yml](_config.yml) accordingly.

```
title: Your Site Title
description: Your site description
repo_url: 'https://github.com/yourusername/mdx-sitegen-solidbase'
site_url: 'https://yourusername.github.io/mdx-sitegen-solidbase/'
deployment:
  provider: 'github'
```

and run to build and deploy website.

```bash
$ npx github:nikescar/mdx-sitegen-solidbase
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

no output. Built webpages are pushed to each depoly service like github pages, deno-deploy, firebase, digital-ocean.

### 4-3. with npx

on your local repository, run following command.
```bash
$ npx github:nikescar/mdx-sitegen-solidbase
```

check .solidbase/.output/public directory for output files.

### 4-4. with jekyll-remote-theme

WIP.


## 5. More Link

1. Learn MDX/MD Syntax from Solidbase Examples. [Solidbase Examples](https://solidbase.dev/guide). [Solidbase Sources](https://github.com/kobaltedev/solidbase/tree/main/docs/src/routes/guide).
2. Similar mdx sitegen project. [Solid-UI mdx sitegen](https://github.com/nikescar/mdx-sitegen-solid-ui)
3. General MDX Syntax. [MDXjs Docs](https://mdxjs.com/docs/what-is-mdx/)

