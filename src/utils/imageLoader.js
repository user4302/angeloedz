/**
 * Dynamically loads an image from the `@/assets/images` directory.
 * Uses Webpack's `require.context` to resolve the path at build time.
 *
 * @param {string} imagePath - The relative path to the image within `@/assets/images`.
 * @returns {string|null} The resolved image URL/path, or null if the image is not found.
 */
export function loadImage(imagePath) {
  try {
    // Use require.context to dynamically load images from all subdirectories
    const images = require.context('@/assets/images', true, /\.(png|jpe?g|svg)$/);
    return images(`./${imagePath}`);
  } catch (error) {
    console.error(`Image not found: ${imagePath}`, error);
    return null;
  }
}