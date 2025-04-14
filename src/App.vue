<template>
  <div id="app">
    <router-view />

    <a
      href="/docs/ANGELO E DE ZOYSA.pdf"
      class="floating-icon"
      title="Download CV"
      download
    >
      <span class="material-icons">description</span>
    </a>

    <!-- Contact Form Component -->
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from './components/ContactForm.vue';

export default {
  name: 'App',
  components: {
    ContactForm,
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

.floating-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: white;
  padding: 10px;
  border-radius: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
}

.floating-icon:hover {
  background-color: white;
  color: black;
}

.material-icons {
  font-size: 24px;
}
</style>