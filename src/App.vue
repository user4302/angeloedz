<template>
  <div id="app">
    <HeroSection />
    <ProjectSection />
  </div>
</template>

<script>
import HeroSection from './components/HeroSection.vue'
import ProjectSection from './components/ProjectSection.vue'

export default {
  name: 'App',
  components: {
    HeroSection,
    ProjectSection
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
