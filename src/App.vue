<template>
  <div id="app">
    <router-view />

    <!-- Floating Download Icon -->
    <a
      href="/docs/ANGELO E DE ZOYSA.pdf"
      class="floating-icon"
      title="Download CV"
      download
    >
      <span class="material-icons">description</span>
    </a>

    <!-- Floating Contact Button -->
    <button class="floating-contact-icon" @click="openContactForm">
      <span class="material-icons">contact_mail</span>
    </button>

    <!-- Contact Form Component -->
    <ContactForm ref="contactForm" />
  </div>
</template>

<script>
import ContactForm from './components/ContactForm.vue';

export default {
  name: 'App',
  components: {
    ContactForm,
  },
  methods: {
    openContactForm() {
      this.$refs.contactForm.openForm();
    },
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

.floating-icon,
.floating-contact-icon {
  position: fixed;
  bottom: 20px;
  color: white;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
}

.floating-icon {
  right: 20px;
}

.floating-contact-icon {
  right: 80px; /* Adjust position to avoid overlap with the download icon */
}

.floating-icon:hover,
.floating-contact-icon:hover {
  background-color: white;
  color: black;
}

.material-icons {
  font-size: 24px;
}
</style>