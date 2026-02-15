import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './global.css';
import store from './store';
import './tokens.css'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
