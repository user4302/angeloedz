import * as simpleIcons from 'simple-icons/icons';

/**
 * Vue plugin to provide Simple Icons globally.
 * Exposes icons through `this.$icons` in components.
 */
export default {
  /**
   * Installs the plugin into the Vue application.
   *
   * @param {object} app - The Vue application instance.
   */
  install(app) {
    app.config.globalProperties.$icons = simpleIcons;
  },
};