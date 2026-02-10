import { loadImage } from '@/utils/imageLoader';
import projectsData from '@/data/projects.json';

/**
 * @typedef {object} Project
 * @property {number} id - Unique identifier for the project.
 * @property {string} slug - Unique slug derived from filename.
 * @property {string} imageSrc - Path or URL to the project's cover image.
 * @property {string[]} icons - Array of Simple Icons identifiers.
 * @property {string} category - Project category.
 * @property {string} title - Display title of the project.
 * @property {string} description - Brief summary.
 * @property {string} gitRepoUrl - URL to the source code repository.
 * @property {string} liveSiteUrl - URL to the live demo.
 * @property {string} content - Markdown body content.
 */

const state = {
  projects: projectsData.map(p => ({
    ...p,
    // Process image path if it's relative
    // Process image path if it's relative
    imageSrc: (p.imageSrc && p.imageSrc.startsWith('/')) ? loadImage(p.imageSrc.replace(/^\/images\//, '')) : (p.imageSrc || '')
  })),
};

const getters = {
  getProjectById: (state) => (id) => {
    return state.projects.find((project) => project.id === Number(id));
  },
  getProjects: (state) => state.projects,
};

export default {
  namespaced: true,
  state,
  getters,
};

