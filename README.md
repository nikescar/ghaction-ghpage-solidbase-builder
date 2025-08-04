- does not support subpath base url. only support for root domain.

# Jekyll Solidbase Theme

A modern documentation theme that combines SolidJS with GitHub Pages deployment. Currently uses GitHub Workflow for deployment rather than traditional Jekyll processing.

## Quick Start

1. **Create GitHub Workflow** - Add `.github/workflows/vite.docs.yml` to your repository
2. **Configure Site** - Create `_config.yml` with your site settings  
3. **Add Content** - Create `index.md` and documentation in `docs/` folder
4. **Deploy** - Push to main branch and GitHub Actions will build and deploy automatically

See the [Getting Started Guide](https://jekyll-theme-solidbase.dure.app/docs/getting-started) for detailed setup instructions.

## Features

- 🚀 **Fast & Modern** - Built with SolidJS and Vinxi
- 📱 **Responsive Design** - Mobile-first, accessible UI
- 🔧 **Zero-Config Deployment** - GitHub Actions workflow handles everything
- 📝 **MDX Support** - Rich content with React components
- 🎨 **Customizable** - Easy configuration via `_config.yml`

## Current Status

**GitHub Workflow Deployment**: ✅ Available  
**Traditional Jekyll Theme**: 🚧 Planned for future development

This theme currently focuses on GitHub Workflow deployment. Traditional Jekyll usage with `remote_theme` is planned for future releases.

# Build Process

## Current: GitHub Workflow Build

The theme is deployed via GitHub Actions workflow:

1. **User pushes to repository** (containing `_config.yml`, `index.md`, and content)
2. **GitHub workflow runs** (`.github/workflows/vite.docs.yml`)
3. **Theme is cloned** to `.solidbase/` directory
4. **Build script executes** (`ghworkflow.sh`)
5. **Site is deployed** to GitHub Pages

## Build Steps Detail

```bash
# GitHub workflow automatically:
$ git clone https://github.com/nikescar/jekyll-theme-solidbase.git .solidbase --depth 1
$ cd .solidbase
$ bash ghworkflow.sh  # Processes your content and builds the site
```

The `ghworkflow.sh` script:
- Copies your content based on `_config.yml` include/exclude rules
- Installs dependencies and builds with Vinxi
- Prepares optimized static output for GitHub Pages

## Development: Local Theme Development

For theme developers working on jekyll-theme-solidbase itself:

### Solidbase App Build
```bash
$ npm install
$ npx vinxi dev      # Development server
$ npx vinxi build    # Production build
```

### Jekyll Theme Development (Future)
```bash
# When Jekyll integration is implemented:
$ gem install jekyll -v 3.9.3
$ gem install bundler:2.5.23
$ bundle _2.5.23_ install
$ bundle _2.5.23_ exec jekyll serve
```

## Documentation

Visit [jekyll-theme-solidbase.dure.app](https://jekyll-theme-solidbase.dure.app) for full documentation:

- [Getting Started](https://jekyll-theme-solidbase.dure.app/docs/getting-started)
- [Features](https://jekyll-theme-solidbase.dure.app/docs/features)
- [Configuration](https://jekyll-theme-solidbase.dure.app/docs/configuration)
- [Deployment](https://jekyll-theme-solidbase.dure.app/docs/deployment)

## Repository Structure

```
your-documentation-repo/
├── .github/workflows/vite.docs.yml  # Deployment workflow
├── _config.yml                      # Site configuration
├── index.md                         # Homepage
├── docs/                           # Documentation files
│   ├── getting-started.mdx
│   └── ...
└── resources/                      # Static assets
    └── favicon.ico
```

