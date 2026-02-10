# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Build-time Markdown-to-JSON parsing logic for projects
- `ProjectThumbnail.vue` component with lazy loading and Netlify CDN support
- Unique CSS/SVG fallbacks for projects without images
- Tech stack icon visualization in project detail pages
- Intelligent metadata extraction from Markdown text templates
- Comprehensive technology mapping with 100+ tech stack icons
- Automatic technology detection from markdown content
- Iconify integration for enhanced icon library support

### Changed
- Converted `ProjectView.vue` to Composition API and added Markdown rendering
- Refined `ProjectCard.vue` UI/UX with left alignment and button-style action links
- Updated `projects.js` store to handle dynamic JSON data
- Migrated from simple-icons to @iconify/vue for better performance
- Enhanced markdown styling with improved contrast and readability
- Improved responsive design for project detail pages

### Fixed
- Runtime error when encountering undefined image sources
- Deprecated `simple-icons` import warnings
- Missing projects issue by robustifying the parser for non-frontmatter files
- Low contrast issues in markdown content display
- Icon rendering inconsistencies across different browsers

### Features
- **Markdown-Powered Content**: Effortlessly manage projects using Markdown files with build-time JSON indexing
- **Image Optimization & Fallbacks**: High-performance image loading with lazy loading and automatic graceful fallbacks
- **Dynamic Project Showcase**: Display and filter projects by category (Frontend, Backend, Terminal, Scripting, Mobile)
- Hero section with typing animation
- Project grid display with technology icons
- Experience timeline
- Skills section
- Personal projects showcase
- Career goals section
- Testimonials section
- Challenges and solutions section
- Community involvement section

### Technical
- Vue.js 3 with Composition API
- Vuex 4 for state management
- Vue Router 4 for navigation
- Simple Icons integration
- Axios for HTTP requests
- Vitest for unit testing
- Netlify deployment setup
