<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Welcome to My Portfolio</h1>
      <p class="hero-description">
        I am a software engineer passionate about building impactful projects.
      </p>
      <button class="hero-button">Explore My Work</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.hero-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.hero-button:hover {
  background-color: #369f6b;
}
</style>