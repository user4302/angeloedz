# Contributing to Angelo EDZ Portfolio

Thank you for your interest in contributing to this project! This document provides guidelines for contributors.

## How to Contribute

### Reporting Issues

- **Bug Reports**: If you find a bug, please open an issue with a detailed description
- **Feature Requests**: For new features, open an issue explaining the use case
- **Security Issues**: For security concerns, please open an issue immediately

All communication should happen through GitLab Issues: https://gitlab.com/Angelo_E_DZ/coding/vue-js/angeloedz/-/issues

### Development Setup

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Make your changes
6. Run tests: `npx vitest run`
7. Run linting: `npm run lint`
8. Commit your changes with descriptive messages
9. Push to your fork and open a merge request

### Code Style Guidelines

- Follow Vue.js official style guide
- Use meaningful component and variable names
- Add JSDoc comments for functions and complex logic
- Keep components small and focused on single responsibility
- Use proper TypeScript types if applicable

### Testing

- Write unit tests for new features
- Ensure all tests pass before submitting
- Test your changes in different browsers if applicable

### Merge Request Process

1. Update the README.md with details of changes if applicable
2. Ensure your PR description clearly describes the problem and solution
3. Link any relevant issues in your PR description
4. Wait for code review and address any feedback

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Run tests
npx vitest run

# Run linting
npm run lint

# Build for production
npm run build
```

## Questions?

For any questions about contributing, please open an issue on GitLab: https://gitlab.com/Angelo_E_DZ/coding/vue-js/angeloedz/-/issues
