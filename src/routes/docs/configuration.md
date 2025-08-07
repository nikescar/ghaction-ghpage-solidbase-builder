---
title: Configuration
description: How to configure Jekyll Solidbase Theme
---

# Configuration

Learn how to configure Jekyll Solidbase Theme for GitHub Workflow deployment.

## Configuration File Structure

The main configuration is done in your `_config.yml` file in your repository root:

```yaml
# Site settings
title: Your Site Title
description: Your site description
show_downloads: true

# Content processing rules
include:
  - .well-known/
  - index.md
  - docs/
  - resources/

exclude:
  - _includes
  - _layouts
  - .github
  - .output
  - .vinxi
  - node_modules
  - scripts
  - tmp

# Site identity
site_author: Your Name
repo_url: 'https://github.com/yourusername/your-repo'
site_url: 'https://yourusername.github.io/your-repo'
site_favicon: './resources/favicon.ico'

# Theme settings
theme_settings:
  social_links:
    GitHub: 'https://github.com/yourusername/your-repo'
```

## Required Configuration

### Essential Settings

```yaml
# Required: Site identity
title: Your Site Title
description: Your site description

# Required: URL configuration (no subpaths supported)
site_url: 'https://yourusername.github.io/your-repo'

# Required: Content inclusion
include:
  - index.md    # Your homepage
  - docs/       # Documentation folder
```

### Repository Settings

```yaml
# GitHub repository information
repo_url: 'https://github.com/yourusername/your-repo'
site_author: Your Name

# Optional: Custom favicon
site_favicon: './resources/favicon.ico'
```

## Content Processing Rules

### Include Rules
Specify which files and folders to include in your site:

```yaml
include:
  - index.md           # Homepage
  - docs/              # Documentation
  - blog/              # Blog posts
  - resources/         # Images, assets
  - .well-known/       # Special files
  - custom-folder/     # Any custom content
```

### Exclude Rules
Specify what to exclude from processing:

```yaml
exclude:
  - .github            # GitHub workflow files
  - node_modules       # Dependencies
  - src/               # Source code
  - tmp/               # Temporary files
  - _includes          # Jekyll internals
  - _layouts           # Jekyll internals
  - package.json       # Build files
  - "*.log"            # Log files
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
      link: https://github.com/yourusername/your-repo
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

## Social Links

Add social media links to your site:

```yaml
theme_settings:
  social_links:
    GitHub: 'https://github.com/username'
    Twitter: 'https://twitter.com/username'
    LinkedIn: 'https://linkedin.com/in/username'
    Discord: 'https://discord.gg/your-server'
    YouTube: 'https://youtube.com/@username'
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
**Important:** The theme only supports root domain URLs, not subpaths:

```yaml
# ✅ Correct - root domain
site_url: 'https://yourusername.github.io'
site_url: 'https://your-custom-domain.com'

# ❌ Incorrect - subpaths not supported
site_url: 'https://yourusername.github.io/subfolder'
```

### Build Optimization
The GitHub workflow automatically handles:
- Installing npm dependencies
- Building with Vinxi
- Processing include/exclude rules
- Copying assets and favicon
- Generating optimized output

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
  - docs/
  - api/
  - examples/
  - resources/

exclude:
  - .github
  - node_modules
  - src/
```

### Blog Site
```yaml
include:
  - index.md
  - _posts/
  - about.md
  - assets/

exclude:
  - .github
  - node_modules
  - drafts/
```

### Mixed Content Site
```yaml
include:
  - index.md
  - docs/
  - blog/
  - projects/
  - resources/
  - .well-known/

exclude:
  - .github
  - node_modules
  - src/
  - tmp/
  - "*.log"
```

## Troubleshooting Configuration

### Common Issues

1. **Content not appearing**: Check that files are in the `include:` list
2. **Build errors**: Verify YAML syntax in `_config.yml`
3. **Asset 404s**: Ensure assets are included and paths are correct
4. **URL issues**: Confirm `site_url` is a root domain without subpaths

### Validation
You can validate your YAML configuration:
```bash
# Install yq for YAML validation
pip install yq

# Validate syntax
yq eval . _config.yml
```