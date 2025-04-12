<template>
  <div id="app">
    <HeroSection />
  </div>
</template>

<script>
import HeroSection from './components/HeroSection.vue'

export default {
  name: 'App',
  components: {
    HeroSection
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
