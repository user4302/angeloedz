import { loadImage } from "@/utils/imageLoader";

/**
 * @typedef {object} Project
 * @property {object} metadata - Project metadata containing core identification and classification
 * @property {number} metadata.id - Unique identifier for the project.
 * @property {string} metadata.slug - URL-friendly slug derived from filename.
 * @property {string} metadata.category - Project category (Frontend, Backend, Terminal, Scripting, Mobile).
 * @property {string} metadata.type - Project type (Open-Source, Personal, University).
 * @property {string[]} metadata.tags - Array of descriptive tags for filtering and search.
 * @property {object} content - Project content containing textual information
 * @property {string} content.title - Display title of the project.
 * @property {string} content.short_description - Brief summary for project cards and overviews.
 * @property {string} content.description - Detailed description for project detail pages.
 * @property {string} content.role - Developer's role and contribution to the project.
 * @property {object} project_details - Structured project details for enhanced display
 * @property {string[]} project_details.achievements - List of key achievements and impact results.
 * @property {string[]} project_details.technologies - Array of technologies and skills used.
 * @property {object} assets - Project assets including visual elements and links
 * @property {string[]} assets.icons - Array of Simple Icons identifiers for technology stack.
 * @property {string[]} assets.screenshots - List of required screenshots and visual assets.
 * @property {object[]} assets.links - Array of link objects containing name and URL pairs.
 * @property {string} imageSrc - Processed path or URL to the project's cover image.
 */

// Load nested project files directly
// For Vue CLI/Webpack, we need to use require.context
const projectModules = require.context('@/data/projects', false, /\.json$/);
const projects = projectModules.keys().map(fileName => {
  const project = projectModules(fileName);
  return {
    ...project,
    // Process image path if any exist
    imageSrc: (project.imageSrc && project.imageSrc.startsWith('/')) 
      ? loadImage(project.imageSrc.replace(/^\/images\//, '')) 
      : (project.imageSrc || '')
  };
});

const state = { projects };

const getters = {
  getProjectById: (state) => (id) => {
    return state.projects.find((project) => project.metadata.id === Number(id));
  },
  getProjects: (state) => state.projects,
  // Enhanced getters for nested structure
  getProjectTitle: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return project?.content?.title || "";
  },
  getProjectDescription: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return (
      project?.content?.short_description || project?.content?.description || ""
    );
  },
  getProjectIcons: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return project?.assets?.icons || [];
  },
  getProjectLinks: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return project?.assets?.links || [];
  },
  getProjectTechnologies: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return project?.project_details?.technologies || [];
  },
  getProjectAchievements: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return project?.project_details?.achievements || [];
  },
  getProjectTags: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return project?.metadata?.tags || [];
  },
  getProjectRole: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return project?.content?.role || "";
  },
  getProjectType: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return project?.metadata?.type || "";
  },
  getProjectScreenshots: (state) => (id) => {
    const project = state.projects.find((p) => p.metadata.id === id);
    return project?.assets?.screenshots || [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
};
