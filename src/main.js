import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './global.css';
import store from './store';
import simpleIconsPlugin from './plugins/simpleIconsPlugin';

createApp(App)
  .use(simpleIconsPlugin)
  .use(router)
  .use(store)
  .mount('#app');
