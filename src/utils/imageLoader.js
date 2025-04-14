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