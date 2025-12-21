import { loadImage } from '@/utils/imageLoader';

/**
 * @typedef {object} Project
 * @property {number} id - Unique identifier for the project.
 * @property {string} imageSrc - Path or URL to the project's cover image.
 * @property {string[]} icons - Array of Simple Icons identifiers (e.g., 'siReact').
 * @property {string} category - Project category (e.g., 'Frontend', 'Terminal').
 * @property {string} title - Display title of the project.
 * @property {string} description - Brief summary of the project.
 * @property {string} gitRepoUrl - URL to the source code repository.
 * @property {string} liveSiteUrl - URL to the live demonstration or hosted app.
 */

/**
 * @type {object}
 * @property {Project[]} projects - List of all projects displayed on the site.
 */
const state = {
  // Current allowed sections: 'Frontend', 'Backend', 'Scripting' 'Terminal', 'Mobile',
  projects: [
    {
      id: 1,
      imageSrc: loadImage('projects/landing-page.png'),
      icons: ['siReact', 'siTailwindcss'],
      category: 'Frontend',
      title: 'Gen Bank',
      description: 'Landing page',
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/react-js/landing-page',
      liveSiteUrl: 'https://user4302-landing-page.netlify.app/',
    },
    {
      id: 2,
      imageSrc: loadImage('projects/task-tracker.png'),
      icons: ['siVuedotjs'],
      category: 'Frontend',
      title: 'Tracker',
      description: 'Simple task tracker',
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/vue-js/task-tracker',
      liveSiteUrl: 'https://user4302-task-tracker.netlify.app/',
    },
    {
      id: 3,
      imageSrc: loadImage('projects/node-backend.png'),
      icons: ['siNodedotjs'],
      category: 'Backend',
      title: 'Simple Node Server',
      description: 'JSON Post handler',
      gitRepoUrl:
        'https://gitlab.com/Angelo_E_DZ/coding/node/simple-node-server',
      liveSiteUrl: '',
    },
    {
      id: 4,
      imageSrc: loadImage('projects/git-repo-manager.png'),
      icons: ['siGnometerminal'],
      category: 'Terminal',
      title: 'Git Repo Manager',
      description: 'Manage multiple repos',
      gitRepoUrl:
        'https://gitlab.com/Angelo_E_DZ/coding/powershell/git-repo-manager',
      liveSiteUrl: '',
    },
    {
      id: 5,
      imageSrc: loadImage('projects/winget-upgrade-helper.png'),
      icons: ['siGnometerminal'],
      category: 'Terminal',
      title: 'Winget Upgrade Helper',
      description: 'Manage winget packages',
      gitRepoUrl:
        'https://gitlab.com/Angelo_E_DZ/coding/powershell/winget-upgrade-helper',
      liveSiteUrl: '',
    },
    {
      id: 6,
      imageSrc: loadImage('projects/cron-game-backup.png'),
      icons: ['siGnubash'],
      category: 'Scripting',
      title: 'Cron Game Backup',
      description: 'Backup game files to git',
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/shell/game-backups',
      liveSiteUrl: '',
    },
    {
      id: 7,
      imageSrc: loadImage('projects/multi-language-library.png'),
      icons: ['siNextdotjs', 'siTailwindcss'],
      category: 'Frontend',
      title: 'Library',
      description: 'Multiple Language Library',
      gitRepoUrl: 'https://gitlab.com/user4302_Projects/coding/next-js/stardust',
      liveSiteUrl: 'https://user4302-stardust.netlify.app',
    },
    {
      id: 8,
      imageSrc: loadImage('projects/git-repo-orchestrator.png'),
      icons: ['siTextual'],
      category: 'Terminal',
      title: 'Git Repo Orchestrator',
      description: 'Manage multiple repos',
      gitRepoUrl: 'https://gitlab.com/user4302_Projects/coding/python/textual/goro',
      liveSiteUrl: 'https://pypi.org/project/goro',
    },
    {
      id: 9,
      imageSrc: loadImage('projects/bdo-shipwright.png'),
      icons: ['siReact'],
      category: 'Frontend',
      title: 'BDO Shipwright',
      description: 'Black desert ship building tracker',
      gitRepoUrl: 'https://gitlab.com/user4302_Projects/coding/react-js/black-desert-ship-building-tracker',
      liveSiteUrl: 'https://user4302-bdo-shipwright.netlify.app/',
    },
    {
      id: 10,
      imageSrc: loadImage('nervous.png'),
      icons: [''],
      category: 'Mobile',
      title: '',
      description: '',
      gitRepoUrl: '',
      liveSiteUrl: '',
    },
  ],
};

/**
 * Projects module getters.
 */
const getters = {
  /**
   * Returns a function to find a project by its ID.
   *
   * @param {object} state - The projects module state.
   * @returns {function(number): Project|undefined} A function that takes an ID and returns the project.
   */
  getProjectById: (state) => (id) => {
    return state.projects.find((project) => project.id === id);
  },
  /**
   * Returns the array of all projects.
   *
   * @param {object} state - The projects module state.
   * @returns {Project[]} The list of projects.
   */
  getProjects: (state) => state.projects,
};

/**
 * Vuex store module for projects management.
 */
export default {
  namespaced: true,
  state,
  getters,
};
