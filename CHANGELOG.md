# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **BREAKING**: Migrated project data structure from flat JSON to nested format with metadata, content, project_details, and assets sections
- Replaced static projects.json import with dynamic file loading using require.context for better scalability
- Completely refactored ProjectView.vue to use nested structure and eliminated markdown parsing dependency
- Updated ProjectSection.vue category filtering to access project.metadata.category
- Refactored ProjectCard.vue to use nested properties and dynamic link rendering from assets.links array
- Enhanced store module with comprehensive getters for nested data access (getProjectLinks, getProjectTechnologies, getProjectTags, etc.)
- Removed obsolete prebuild/preserve scripts from package.json that ran the markdown parser
- Improved JSDoc documentation throughout project store module for better code clarity
- **BREAKING**: Replaced numeric ID-based project URLs with SEO-friendly slug-based URLs (/project/slug instead of /project/id)
- Updated router configuration to use slug parameter for project routes
- Modified ProjectCard component to navigate using project slugs instead of numeric IDs
- Updated ProjectView component to accept slug prop and use slug-based store getters
- Added comprehensive slug-based getters in projects store module while maintaining backward compatibility

### Added

- Support for rich nested project structure with metadata, content, project_details, and assets sections
- Dynamic link handling with automatic icon detection for GitLab, GitHub, Netlify, and Vercel
- Enhanced project detail sections for achievements, technologies, screenshots, and structured role descriptions
- Comprehensive getters for accessing nested project data throughout the application

### Fixed

- Added null/undefined safety checks to prevent toLowerCase() errors in ProjectCard and ProjectView components
- Updated template keys and fallback text to handle missing link names gracefully

### Removed

- Markdown parsing logic from ProjectView.vue as content is now structured in JSON
- Dependency on marked library for project content rendering
- Legacy projects-parser.js script workflow (no longer needed with nested JSON structure)
- Old flat projects.json file and test-project.json after migration to individual files
- 61 obsolete markdown project files from src/assets/projects/ directory

## [2.0.2] - 2026-02-17

### Changed

- Enhanced mobile responsiveness in ProjectView with improved layout, spacing, and breakpoints
- Added better text wrapping and overflow handling for mobile devices
- Improved responsive design for tablets and mobile screens

## [2.0.1] - 2026-02-17

### Added

- SPA routing redirect configuration in netlify.toml to handle client-side routing

## [2.0.0] - 2026-02-15

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
- Technology icon tooltips with custom labels and smooth hover animations
- Redesign of mobile navigation from bottom floating bar to top fixed header
- Enhanced component interactions with cursor states and hover effects
- Major UI overhaul for ContactForm and DownloadCV components
- Custom circular resize handle with expand icon for contact form textarea
- Full drag-to-resize functionality with mouse and touch support
- Fixed PDF viewer header buttons to be properly sized circles
- Improved mobile PDF viewer layout with full viewport and proper positioning
- Add dynamic GitLab/GitHub icon detection based on repository URLs
- Implement consistent link-2 icon for live demos across all components
- Enhance projects parser to extract repository and live site URLs from markdown
- Improve button layouts with slot wrappers and grid systems
- Enhance technology icon tooltips with custom labels and animations
- Replace basic title tooltips with custom styled labels across components
- Add formatTechName function to prettify technology names (Vue.js, Node.js, etc.)
- Implement smooth hover animations with scaling and color transitions
- Redesign mobile navigation and enhance component interactions
- Replace bottom floating nav with top fixed header for better mobile UX
- Add proper cursor states and interactive feedback across project cards
- Enhance ContactForm and DownloadCV with modern UI and PDF viewer
- Improve mobile navigation layout with backdrop blur and better spacing
- Integrate Style Dictionary for design token management
- Add design tokens CSS import to main application
- Remove legacy NavBar component in favor of new navigation system

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

## [1.4.0] - 2025-12-21

### Added

- Terminal category for projects
- Vitest testing suite implementation
- JSDoc documentation throughout the codebase
- Multi language library project
- Netlify build image update to Noble
- Node.js version 22 support
- Estraverse dependency to resolve build errors

### Changed

- Updated project dependencies
- Fixed icon naming conventions
- Enhanced documentation

## [1.3.0] - 2025-09-22

### Added

- CV download functionality
- PDF viewer integration
- Contact form with Formspree integration
- Axios for HTTP requests

### Changed

- Multiple CV updates and improvements
- Enhanced contact form styling
- Improved mobile responsiveness

## [1.2.0] - 2025-04-15

### Added

- Project showcase with multiple projects:
  - Task Tracker
  - Simple Node Server
  - Git Repo Manager
  - Winget Upgrade Helper
  - Cron game Backup
- Responsive design for mobile devices
- Project filtering by category
- Active state styling for current category
- CV download component
- Contact form integration

### Changed

- Replaced FontAwesome with Simple Icons
- Updated project card styling
- Improved image handling and sizing
- Enhanced global styling system
- Fixed various UI bugs and inconsistencies

### Fixed

- Click propagation issues on project cards
- Missing git repo links handling
- Mobile layout issues

## [1.0.0] - 2025-04-14

### Added

- Vue Router and Vuex integration
- Home page component
- Project data store management
- Project view functionality
- Image utility for imports
- Global CSS styling system

### Changed

- Migrated from Vue 2 to Vue 3
- Updated project structure
- Enhanced project card components
- Improved banner styling and positioning

## [0.6.0] - 2025-04-12

### Added

- Hero section with typing animation
- Project grid display
- Experience timeline
- Skills section
- Personal projects showcase
- Career goals section
- Testimonials section
- Challenges and solutions section
- Community involvement section
- Dark theme implementation
- Lazy loading for project cards
- Hover effects and animations

### Changed

- Removed HelloWorld component
- Updated button styling
- Enhanced card borders and typography
- Improved project category display

### Fixed

- Lazy loading scroll behavior
- Project show/hide functionality

## [0.5.0] - 2025-01-07

### Changed

- Updated project dependencies
- Code cleanup and linting fixes
- Removed unnecessary comments

## [0.4.0] - 2021-11-03

### Added

- Contact form functionality
- Form validation and error handling
- User feedback for form submission

### Fixed

- Form submission bugs
- Button styling issues
- Contact form integration problems

## [0.3.0] - 2021-10-27

### Added

- Initial Vue 2 setup with Vuetify
- Basic project structure
- Foundation for the portfolio website

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
- Iconify integration for icons
- Axios for HTTP requests
- Vitest for unit testing
- Netlify deployment setup
