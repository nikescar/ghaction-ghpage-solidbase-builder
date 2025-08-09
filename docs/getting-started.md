---
title: Getting Started
description: Learn how to get started with Jekyll Solidbase Theme
---

# Getting Started

Welcome to Jekyll Solidbase Theme! This guide will help you get up and running quickly using GitHub Workflow deployment.

**Important:** This theme currently uses GitHub Workflow for deployment rather than traditional Jekyll processing. Jekyll integration is planned for future development.

## Quick Setup

### Method 1: Using the GitHub Workflow (Recommended)

1. **Create a new repository** or use an existing one for your documentation site.

2. **Create the GitHub Workflow file** at `.github/workflows/vite.docs.yml`:

[.github/workflows/vite.docs.yml](../.github/workflows/vite.docs.yml)

3. **Create your configuration file** `_config.yml` in your repository root:

[_config.yml](../_config.yml)

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
      link: ./docs
    - theme: alt
      text: GitHub
      link: https://github.com/yourusername/your-repo

features:
  - 
    title: Feature 1
    details: Description of feature 1
  - 
    title: Feature 2
    details: Description of feature 2
---

Welcome to your documentation site!
```

5. **Create your documentation** in the `docs/` folder with `.mdx` files.

6. **Enable GitHub Pages** in your repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions

7. **Push your changes** and the workflow will automatically deploy your site!

## File Structure

Your repository should look like this:

```
your-repo/
├── .github/
│   └── workflows/
│       └── vite.docs.yml
├── _config.yml
├── index.md
├── docs/
│   ├── index.mdx
│   ├── getting-started.mdx
│   └── ... other docs
└── resources/ (optional)
    └── favicon.ico
```

## Next Steps

- Check out the [Features](/docs/features) page
- Learn about [Configuration](/docs/configuration)
- See the [Deployment guide](/docs/deployment) for more details