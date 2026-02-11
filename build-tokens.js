const StyleDictionary = require('style-dictionary');

StyleDictionary.extend({
  source: ['src/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          selector: ':root',
          options: { outputReferences: true }
        }
      ]
    }
  }
}).buildAllPlatforms();

console.log('✅ Design tokens built successfully!');
console.log('📁 Generated files in src/styles/generated/');
console.log('🎨 Run "npm run build:tokens" to regenerate');
