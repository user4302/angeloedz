// build-tokens.mjs

import StyleDictionary from 'style-dictionary';

(async () => {
    console.log('Starting Style Dictionary build...');

    const sd = new StyleDictionary({
        source: ['design-tokens.json'],
        platforms: {
            css: {
                transformGroup: 'css',
                buildPath: 'src/',                            
                files: [{
                    destination: 'tokens.css',
                    format: 'css/variables',
                    selector: ':root',
                    options: { outputReferences: true }
                }]
            }
        }
    });

    await sd.hasInitialized;
    console.log('Tokens initialized. Building platforms...');

    await sd.buildAllPlatforms();

    console.log('Build finished!');
    console.log('Check file: ./debug-output/debug-tokens.css');
})();