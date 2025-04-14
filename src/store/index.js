import { createStore } from 'vuex';
import projects from './modules/projects';

const store = createStore({
  modules: {
    projects,
  },
});

export default store;
