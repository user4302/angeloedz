<template>
  <div id="app">
    <router-view />
    <DownloadCV />
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from './components/ContactForm.vue';
import DownloadCV from './components/DownloadCV.vue'; // Import the new component

export default {
  name: 'App',
  components: {
    ContactForm,
    DownloadCV, // Register the new component
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
}
</style>