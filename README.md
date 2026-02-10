# Angelo EDZ Portfolio

🚀 Personal portfolio website showcasing software engineering projects and skills

![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=node.js&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)

## Features ✨

- **Markdown-Powered Projects**: Automatically parses Obsidian-ready `.md` files into the site at build time
- **Image Optimization & Fallbacks**: Lazy-loaded thumbnails with Netlify CDN support and generated fallbacks for missing images
- **Dynamic Project Showcase**: Display and filter projects by category with modern pill-style filters
- **Enhanced Project Cards**: Interactive cards with hover overlays, icon-based navigation, and smooth transitions
- **Responsive Project Details**: Hero sections, mobile navigation, optimized content layouts, and scroll-to-top behavior
- **Modern UI/UX**: Micro-interactions, loading states, structured impact lists, and consistent design language

## Tech Stack / Built With 🛠️

![Vue.js](https://img.shields.io/badge/Vue.js-3.2.13-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vuex](https://img.shields.io/badge/Vuex-4.1.0-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vue Router](https://img.shields.io/badge/Vue%20Router-4.0.13-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.8.4-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Iconify](https://img.shields.io/badge/Iconify-5.0.0-000000?style=flat-square&logo=iconify&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18?style=flat-square&logo=vitest&logoColor=white)

## Prerequisites

- Node.js 22 or higher
- npm (comes with Node.js) or yarn
- Git

## Installation 📥

```bash
# Clone the repository
git clone https://gitlab.com/Angelo_E_DZ/coding/vue-js/angeloedz.git angeloedz
 
# Navigate to the project directory
cd angeloedz

# Install dependencies
npm install
```

## Usage / Quick Start ⚡

```bash
# Start development server with hot reload
npm run serve

# Open your browser and navigate to
http://localhost:8080
```

The application will automatically reload when you make changes to the source files.

## Project Structure 📂

```
angeloedz-vue/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static resources
│   ├── components/        # Vue components
│   │   ├── sections/      # Page section components
│   │   ├── ContactForm.vue
│   │   ├── DownloadCV.vue
│   │   ├── NavBar.vue
│   │   └── ProjectCard.vue
│   ├── plugins/           # Vue plugins
│   ├── router/            # Vue Router configuration
│   ├── store/             # Vuex store modules
│   │   └── modules/
│   │       └── projects.js
│   ├── utils/             # Utility functions
│   ├── views/             # Page components
│   ├── App.vue           # Root component
│   ├── global.css        # Global styles
│   └── main.js           # Application entry point
├── tests/                 # Test files
├── .env                  # Environment variables
├── netlify.toml          # Netlify deployment configuration
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Configuration 🔧

The project uses environment variables for configuration. Create a `.env` file in the root directory:

```env
# Add your environment variables here
VUE_APP_API_BASE_URL=https://your-api-url.com
```

## Development / Running Locally 🏗️

```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Run linting
npm run lint

# Run tests
npx vitest run

# Run tests in watch mode
npx vitest
```

## Testing 🧪

The project uses Vitest for unit testing with jsdom environment.

```bash
# Run all tests once
npx vitest run

# Run tests in watch mode
npx vitest

# Run tests with coverage
npx vitest run --coverage
```

## Building for Production 🏭

```bash
# Build for production
npm run build

# The built files will be in the /dist directory
```

## Deployment 🚀

The project is configured for Netlify deployment:

1. Connect your GitLab repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set Node.js version: `22`

The `netlify.toml` file contains the deployment configuration.

## Contributing 🤝

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

For any questions, bug reports, feature requests, or security concerns, please open an issue on GitLab: https://gitlab.com/Angelo_E_DZ/coding/vue-js/angeloedz/-/issues

## License 📄

This project is private. All rights reserved.

## Support & Contact 👋

For any questions, bug reports, feature requests, or security concerns, please open an issue on GitLab: https://gitlab.com/Angelo_E_DZ/coding/vue-js/angeloedz/-/issues

No email or direct messaging support is available.

## Acknowledgments 🙏

- Vue.js 3 with Composition API
- Vuex 4 for state management
- Vue Router 4 for navigation
- Iconify for comprehensive icon library
- Axios for HTTP requests
- Vitest for unit testing
- Netlify for seamless deployment
