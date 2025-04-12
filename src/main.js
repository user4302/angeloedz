import { createApp } from 'vue';
import App from './App.vue';
import './global.css';

// Import the Font Awesome core
import { library } from '@fortawesome/fontawesome-svg-core';

// Import the Font Awesome icon component
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons
import { faJs } from '@fortawesome/free-brands-svg-icons';

// Add the icons to the library
library.add(faJs);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');