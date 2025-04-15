<template>
  <nav class="navbar" :class="{ hidden: isHidden }">
    <div class="navbar-content">
      <span class="navbar-title">My Portfolio</span>
      <button class="toggle-button" @click="toggleTheme">
        {{ theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      theme: 'light',
      isHidden: false,
      lastScrollTop: 0,
    };
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.body.className = this.theme;
      console.log(`Theme changed to: ${this.theme}`);
    },
    handleScroll() {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > this.lastScrollTop) {
        this.isHidden = true;
      } else {
        this.isHidden = false;
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    },
  },
  mounted() {
    document.body.className = this.theme;
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: var(--more-gray);
  color: var(--white-ish);
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  transition: top 0.3s;
}

.navbar.hidden {
  top: -60px;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.toggle-button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
}

body.light {
  color: var(--white-ish);
  color:  var(--more-black);
}

body.dark {
  background-color: var(--more-black);
  color: var(--white-ish);
}
</style>
