# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hugo static site (personal portfolio/blog) with a custom theme using Tailwind CSS.

- **Framework**: Hugo >= 0.146.0 (extended version not required)
- **Theme**: Custom theme at `themes/custom-theme/`
- **Styling**: Tailwind CSS 4.0 with typography plugin
- **Templates**: Go templates with Hugo Pipes asset processing

## Commands

```bash
# Development server with live reload
hugo server

# Include draft content
hugo server -D

# Production build with minification
hugo --minify

# Create new blog post
hugo new posts/my-post.md

# Create page bundle (for posts with images)
hugo new posts/my-post/index.md

# Validate configuration
hugo config
```

## Architecture

### Template Structure

```
themes/custom-theme/layouts/
├── baseof.html          # Root template defining head, header, main block, footer
├── home.html            # Homepage with social links
├── page.html            # Blog posts with metadata, ToC, tags
├── section.html         # Content listings
├── taxonomy.html        # Tag/category pages
├── term.html            # Individual tag pages
└── _partials/           # Reusable components
    ├── head.html        # Meta tags, includes css.html and js.html
    ├── head/css.html    # Tailwind CSS pipeline
    ├── head/js.html     # JS build pipeline
    ├── header.html      # Navbar, theme toggle, mobile menu
    ├── menu.html        # Menu rendering
    ├── terms.html       # Tag display
    └── footer.html      # Copyright
```

### Asset Pipeline

- **CSS**: Tailwind processed via Hugo Pipes; production adds minify + fingerprint + integrity
- **JS**: `js.Build` with source maps in dev, minified in production
- **Main files**: `assets/css/main.css`, `assets/js/main.js`

### Key Features

- Dark mode default with localStorage-persisted toggle
- Responsive mobile-first design
- Table of contents with scroll-spy (blog posts only)
- Mobile hamburger menu with click-outside closing

## Code Patterns

### Go Templates

```go
# Block pattern for layouts
{{ define "main" }}...{{ end }}

# Whitespace control in partials
{{- with .Params.author -}}...{{- end -}}

# Context passing to partials
{{ partial "menu.html" (dict "menuID" "main" "page" .) }}

# Static partial caching
{{ partialCached "head/css.html" . }}

# Nil-safe access
{{- with .Params.value }}{{ . }}{{- end }}
{{ default "fallback" .Title }}
```

### Content Frontmatter (TOML)

```toml
+++
title = 'Post Title'
date = 2023-01-15T09:00:00-07:00
draft = false
tags = ['tag1', 'tag2']
+++
```

## Important Notes

- `public/` is generated output - do not edit
- Content uses TOML frontmatter with `+++` delimiters
- Page bundles: use folder structure for posts with images (`posts/my-post/index.md`)
- CI/CD via GitHub Actions deploys to GitHub Pages on push to main
