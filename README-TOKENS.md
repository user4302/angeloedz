# Design Token System

## Overview
This project uses a comprehensive design token system built with Style Dictionary v3, following DTCG (Design Tokens Community Group) standards.

## Structure

```
src/tokens/
├── primitives/           # Raw values (colors, spacing, typography, etc.)
│   ├── color.json
│   ├── spacing.json
│   ├── typography.json
│   ├── borderRadius.json
│   └── shadow.json
├── semantic/             # Purposeful names
│   └── light.json           # Light theme semantic tokens
├── $metadata.json        # DTCG schema metadata
└── ../styles/
    ├── generated/
    │   └── variables.css   # Generated CSS variables
    └── main.css          # Utility classes
```

## Available Tokens

### Colors
- **Gray Scale**: 50-900 (lightest to darkest)
- **Blue Scale**: 50-900 (lightest to darkest)  
- **Indigo Scale**: 50-900 (lightest to darkest)
- **Purple Scale**: 50-900 (lightest to darkest)
- **Red Scale**: 50-900 (lightest to darkest)

### Spacing
- **Scale**: 0-96 (0 to 24rem)
- **Semantic**: xs(0.75rem), sm(0.75rem), md(1rem), lg(1.5rem), xl(2rem), 2xl(3rem), 3xl(4rem)
- **Pixel**: 1px unit for precise borders

### Typography
- **Font Families**: Sans, Serif, Mono
- **Font Sizes**: xs(0.75rem) to 5xl(3rem)
- **Font Weights**: 300-800 (light to extrabold)
- **Line Heights**: tight(1.25) to loose(2)

### Border Radius
- **Scale**: none to 3xl, plus full(9999px)

### Shadows
- **Scale**: sm to xl, plus inner for inset shadows

### Semantic Theme (Light)
- **Background**: Light gray surface
- **Text**: Primary/secondary/muted/inverse
- **Borders**: Primary/secondary/muted
- **Accents**: Blue/indigo/success/warning/error

## Usage

### Import Variables
```css
@import './styles/generated/variables.css';
```

### Using Tokens in Components
```css
.my-component {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-base);
}
```

### Utility Classes
```css
<div class="text-primary bg-surface rounded-lg shadow-base p-4 m-2">
  <h2 class="text-xl font-bold">Title</h2>
  <p class="text-secondary">Description</p>
</div>
```

## Build Commands

```bash
# Generate tokens
npm run build:tokens

# Development (tokens rebuild on change)
npm run build:tokens --watch
```

## Benefits

- ✅ **Consistency**: Single source of truth for all design values
- ✅ **Maintainability**: Update once, apply everywhere
- ✅ **Scalability**: Easy to extend with new tokens
- ✅ **Theme Support**: Ready for dark mode implementation
- ✅ **Developer Experience**: IntelliSense support for tokens
- ✅ **Performance**: CSS variables are highly optimized
- ✅ **Standards Compliant**: Follows DTCG v4+ specifications
