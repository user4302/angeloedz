import * as simpleIcons from 'simple-icons/icons';

export default {
  install(app) {
    app.config.globalProperties.$icons = simpleIcons;
  },
};