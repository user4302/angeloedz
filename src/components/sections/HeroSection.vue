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
  background-color: #121212; 
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease; 
}

.hero-button:hover {
  background-color: #e0e0e0; 
  color: #121212; 
  transform: translateY(-2px); 
}
</style>