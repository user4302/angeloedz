import { loadImage } from '@/utils/imageLoader';

const state = {
  // Current allowed sections: 'Frontend', 'Backend', 'Scripting', 'Mobile'
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
      description: 'Task tracker',
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
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/node/simple-node-server',
      liveSiteUrl: '',
    },
    {
      id: 4,
      imageSrc: loadImage('projects/git-repo-manager.png'),
      icons: ['siGnometerminal'], 
      category: 'Scripting',
      title: 'Git Repo Manager',
      description: 'Manage multiple repos',
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/powershell/git-repo-manager',
      liveSiteUrl: '',
    },
    {
      id: 5,
      imageSrc: loadImage('projects/winget-upgrade-helper.png'),
      icons: ['siGnometerminal'], 
      category: 'Scripting',
      title: 'Winget Upgrade Helper',
      description: 'Manage winget packages',
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/powershell/winget-upgrade-helper',
      liveSiteUrl: '',
    },
  ],
};

const getters = {
  getProjectById: (state) => (id) => {
    return state.projects.find((project) => project.id === id);
  },
  getProjects: (state) => state.projects,
};

const mutations = {
  // Define mutations if you need to modify the card data
};

const actions = {
  // Define actions if you need to fetch or update card data asynchronously
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};