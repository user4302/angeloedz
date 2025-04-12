<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Welcome to My Portfolio</h1>
      <p class="hero-description"></p>
      <p class="hero-description"></p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  mounted() {
    this.typeText('.hero-description:nth-of-type(1)', 'Angelo EDZ', 0);
    this.typeText('.hero-description:nth-of-type(2)', 'Software Engineer', 1500);
  },
  methods: {
    typeText(selector, text, delay) {
      const element = document.querySelector(selector);
      if (!element) return;
      element.style.opacity = 1; // Make the element visible
      let index = 0;
      setTimeout(() => {
        const interval = setInterval(() => {
          if (index < text.length) {
            element.textContent += text[index];
            index++;
          } else {
            clearInterval(interval);
          }
        }, 100); // Typing speed (100ms per character)
      }, delay);
    },
  },
};
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  opacity: 0; /* Start with opacity 0 for fade-in effect */
  transform: scale(0.95); /* Start with a slight scale down */
  animation: fadeInScale 1s ease-out forwards; /* Apply the animation */
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
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
  opacity: 0; /* Initially hide the descriptions */
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