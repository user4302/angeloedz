import { createStore } from 'vuex';

const store = createStore({
  state: {
    projects: [
      {
        id: 1,
        imageSrc: 'path/to/image1.png',
        title: 'Project 1',
        description: 'Description for project 1',
        gitRepoUrl: 'https://github.com/user/project1',
        liveSiteUrl: 'https://project1.example.com',
      },
      // Add more projects as needed
    ],
  },
  getters: {
    getProjectById: (state) => (id) => {
      return state.projects.find((project) => project.id === id);
    },
  },
});

export default store;