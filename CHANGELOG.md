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
- Automated build-time icon validation via Iconify API to prevent broken mappings
- Optimized icon tooltips to display clean technology names for better UX
- Comprehensive UI/UX redesign of project components with modern interactions
- Redesigned ProjectCard with overlay effects and icon-based navigation
- Enhanced ProjectSection with pill filters and improved loading states
- Complete ProjectView redesign with hero section and mobile navigation
- Enhance project detail UX and navigation behavior
- Add semantic target icon for Impact section with structured list styling
- Implement project links footer with large action buttons
- Enhance mobile navigation and responsive design consistency
- Add scroll-to-top behavior for better navigation UX
- Enhance link handling and UI consistency across project components
- Add dynamic GitLab/GitHub icon detection based on repository URLs
- Implement consistent link-2 icon for live demos across all components
- Enhance projects parser to extract repository and live site URLs from markdown
- Improve button layouts with slot wrappers and grid systems

### Changed
- Converted `ProjectView.vue` to Composition API and added Markdown rendering
- Refined `ProjectCard.vue` UI/UX with left alignment and button-style action links
- Updated `projects.js` store to handle dynamic JSON data
- Migrated from simple-icons to @iconify/vue for better performance
- Enhanced markdown styling with improved contrast and readability
- Improved responsive design for project detail pages
- Implemented runtime icon visibility checks in `ProjectCard` and `ProjectView` to hide missing icons
- Refactored `projects-parser.js` to support asynchronous validation against the Iconify API

### Fixed
- Runtime error when encountering undefined image sources
- Deprecated `simple-icons` import warnings
- Missing projects issue by robustifying the parser for non-frontmatter files
- Low contrast issues in markdown content display
- Icon rendering inconsistencies across different browsers

### Changed
- Enhanced icon tooltips to display full Iconify identifiers for better clarity
- Improved tech stack icon styling with monochrome white appearance and hover effects
- Optimized component imports by leveraging Vue's auto-import functionality

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
