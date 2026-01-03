# AGENTS.md - Coding Agent Instructions

This repository is a Hugo static site with a custom theme. This document provides
guidelines for AI coding agents working in this codebase.

## Project Overview

- **Framework**: Hugo Static Site Generator (>= 0.146.0)
- **Theme**: Custom theme located at `themes/custom-theme/`
- **Content Format**: Markdown with TOML frontmatter
- **Template Language**: Go templates
- **Asset Pipeline**: Hugo Pipes (minify, fingerprint, js.Build)

## Build/Dev/Test Commands

### Development

```bash
# Start development server with live reload
hugo server

# Start development server including draft content
hugo server -D

# Start server with specific port
hugo server --port 3000

# Start server binding to all interfaces (for network access)
hugo server --bind 0.0.0.0
```

### Build

```bash
# Build static site to public/ directory
hugo

# Production build with minification
hugo --minify

# Build including draft content
hugo -D

# Build with verbose output
hugo --verbose

# Clean build (remove public/ first)
rm -rf public && hugo
```

### Content Management

```bash
# Create new post from archetype
hugo new posts/my-post.md

# Create new page bundle (for posts with images)
hugo new posts/my-post/index.md

# Create content with specific archetype
hugo new --kind posts posts/my-post.md
```

### Validation

```bash
# Check Hugo version
hugo version

# Validate configuration
hugo config

# List all content
hugo list all

# List draft content
hugo list drafts
```

## Directory Structure

```
/
├── archetypes/           # Content templates
├── hugo.toml             # Site configuration
├── public/               # Generated output (do not edit)
└── themes/custom-theme/
    ├── archetypes/       # Theme-specific archetypes
    ├── assets/
    │   ├── css/          # Stylesheets (processed by Hugo Pipes)
    │   └── js/           # JavaScript (processed by js.Build)
    ├── content/          # Example content
    ├── layouts/
    │   ├── _partials/    # Reusable template components
    │   ├── baseof.html   # Base template
    │   ├── home.html     # Homepage template
    │   ├── page.html     # Single page template
    │   ├── section.html  # Section list template
    │   ├── taxonomy.html # Taxonomy list template
    │   └── term.html     # Term list template
    └── static/           # Static assets (copied as-is)
```

## Code Style Guidelines

### Go Templates (HTML)

**Block/Define Pattern**:
```go
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ .Content }}
{{ end }}
```

**Whitespace Control**: Use `{{-` and `-}}` in partials for clean output:
```go
{{- with .Params.author -}}
  <span>{{ . }}</span>
{{- end -}}
```

**Context Passing**: Use `dict` for multiple parameters:
```go
{{ partial "menu.html" (dict "menuID" "main" "page" .) }}
```

**Partial Caching**: Use `partialCached` for static content:
```go
{{ partialCached "head/css.html" . }}
```

**Document Partials**: Add JSDoc-style comments:
```go
{{- /*
Renders a list of terms assigned to the page.

@context {page} page The current page.
@context {string} taxonomy The taxonomy.

@example: {{ partial "terms.html" (dict "taxonomy" "tags" "page" .) }}
*/}}
```

### CSS Guidelines

- Use vanilla CSS (no frameworks)
- Prefer element selectors for base styles
- Use `rem` units for spacing and sizing
- Use hex colors (e.g., `#222`, `#00e`)
- Keep styles minimal and maintainable
- Max-width constraints for readability

```css
body {
  color: #222;
  font-family: sans-serif;
  line-height: 1.5;
  margin: 1rem;
  max-width: 768px;
}
```

### JavaScript Guidelines

- Use vanilla JavaScript (no frameworks)
- Process through Hugo's `js.Build` pipeline
- Development: external source maps enabled
- Production: minified with fingerprinting

### Content/Frontmatter

**TOML Frontmatter** (use `+++` delimiters):
```toml
+++
title = 'Post Title'
date = 2023-01-15T09:00:00-07:00
draft = false
tags = ['tag1', 'tag2']
+++
```

**Page Bundles**: For posts with images, use folder structure:
```
posts/
  my-post/
    index.md
    image.jpg
```

### Naming Conventions

- **Templates**: lowercase, hyphenated (e.g., `baseof.html`, `head.html`)
- **Partials**: stored in `_partials/` directory
- **Content files**: lowercase, hyphenated (e.g., `my-post.md`)
- **CSS/JS files**: lowercase (e.g., `main.css`, `main.js`)

### Asset Pipeline

**CSS Processing** (`_partials/head/css.html`):
- Development: direct link to CSS file
- Production: minify + fingerprint + integrity hash

**JS Processing** (`_partials/head/js.html`):
- Development: external source maps
- Production: minify + fingerprint + integrity hash

## Error Handling

- Always use `with` blocks to handle missing values gracefully
- Use `default` function for fallback values
- Check for nil before accessing nested properties

```go
{{- with .Params.author }}
  <span>Author: {{ . }}</span>
{{- end }}

{{ $title := default "Untitled" .Title }}
```

## Configuration

Main configuration is in `hugo.toml`:
- `baseURL`: Site base URL
- `languageCode`: Language code (e.g., 'en-US')
- `title`: Site title
- `theme`: Theme name

Menu configuration:
```toml
[menus]
  [[menus.main]]
    name = 'Home'
    pageRef = '/'
    weight = 10
```

## Important Notes

1. **Do not edit `public/`** - This is generated output
2. **Hugo version**: Requires >= 0.146.0
3. **Extended Hugo**: Not required (`extended = false`)
4. **Live reload**: Development server auto-reloads on changes
5. **Draft content**: Set `draft = false` in frontmatter to publish
