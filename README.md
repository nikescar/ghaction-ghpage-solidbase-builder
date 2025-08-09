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

### 4-1. Github Repository with Github Workflow to Github Pages

This type does not require deployment: section on your _config.yml. only supports to github pages deployment.

Copy [.github/workflows/vite.doc.yml](.github/workflows/vite.doc.yml) file to your repository.

* github pages served with static server, which doesn't route SPA application like solidjs. luckily, github 404 page intact url of wrong page url. we could make redirection for 404 rules to connect with SPA router. [more info](./_404.html)

### 4-2. Github Repository with Github Action to Github Pages

In your github workflow, add following snippet.

```yaml
- name: Build with Solidbase Theme
  uses: ./.github/actions/solidbase-theme
  with:
    config_path: '_config.yml'
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### 4-2-1. Inputs

- `config-file`: Path to configuration file (default: `_config.yml`)

#### 4-2-2. Outputs

No output. Built webpages are pushed to each depoly service like github pages, deno-deploy, firebase.

### 4-3. Github Repository with jekyll-remote-theme

WIP.

### 4-4. Local with local deploy

On your local repository, run following command. use bash shell.
```bash
$ npx --yes github:nikescar/mdx-sitegen-solidbase
```

Check .solidbase/.output/public directory for output files.

### 4-5. Local to Github Pages

```yaml
deployment: # https://github.com/settings/personal-access-tokens
  provider: 'github-page'
  github_token: ${{ secrets.GITHUB_TOKEN }}
  github_repo: 'nikescar/mdx-sitegen-solidbase'
```

```bash
#.secrets
GITHUB_TOKEN=
# DENO_DEPLOY_TOKEN=
# FIREBASE_SERVICE_ACCOUNT_KEY=
```

### 4-6. Local to Firebase


### 4-7. Local to Deno Deploy



## 5. More Link

1. Learn MDX/MD Syntax from Solidbase Examples. [Solidbase Examples](https://solidbase.dev/guide). [Solidbase Sources](https://github.com/kobaltedev/solidbase/tree/main/docs/src/routes/guide).
2. Similar mdx sitegen project. [Solid-UI mdx sitegen](https://github.com/nikescar/mdx-sitegen-solid-ui)
3. General MDX Syntax. [MDXjs Docs](https://mdxjs.com/docs/what-is-mdx/)

