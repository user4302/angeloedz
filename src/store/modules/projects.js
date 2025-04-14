import { loadImage } from '@/utils/imageLoader';

const state = {
  // Current allowed sections: 'Frontend', 'Backend', 'Scripting', 'Mobile'
  projects: [
    {
      id: 1,
      imageSrc: loadImage('projects/landing-page.png'),
      altText: 'landing page',
      icon: 'siVuedotjs', 
      category: 'Frontend',
      title: 'Landing page',
      description: 'A landing page built with Vue.js. and Tailwind CSS',
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/react-js/landing-page',
      liveSiteUrl: 'https://user4302-landing-page.netlify.app/',
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