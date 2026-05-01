import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './global.css';
import './tokens.css';
import './styles/Modals.css';
import store from './store';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
