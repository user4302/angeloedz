<template>
  <div class="section">
    <button v-if="showButton" @click="toggleVisibility" class="toggle-button">Show Projects</button>
    <transition name="crt-effect">
      <div v-if="showProjects">
        <div class="section-buttons">
          <button
            v-for="category in categories"
            :key="category"
            @click="filterCategory(category)"
          >
            {{ category }}
          </button>
        </div>
        <div class="card-container" ref="cardContainer">
          <ProjectCard
            v-for="(card, index) in visibleCards"
            :key="index"
            :imageSrc="card.imageSrc"
            :iconClass="card.iconClass"
            :class="{ 'fade-in': card.fadeIn }"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ProjectCard from '../ProjectCard.vue';
import baftaImage from '@/assets/images/projectCardThumbnails/bafta.jpg';

export default {
  name: 'ProjectSection',
  components: {
    ProjectCard,
  },
  data() {
    return {
      showProjects: false, // Visibility state for projects
      showButton: true, // Visibility state for the button
      categories: ['Frontend', 'Backend', 'Scripting', 'Mobile'],
      allCards: [],
      visibleCards: [],
      currentCategory: 'Frontend',
      cardsPerLoad: 6,
    };
  },
  methods: {
    toggleVisibility() {
      this.showProjects = !this.showProjects;
      this.showButton = false; // Hide the button after the first click
    },
    filterCategory(category) {
      this.currentCategory = category;
      this.loadCards();
    },
    loadCards() {
      const filteredCards = this.allCards.filter(
        (card) => card.category === this.currentCategory
      );
      this.visibleCards = filteredCards
        .slice(0, this.cardsPerLoad)
        .map((card) => ({ ...card, fadeIn: true }));
    },
    handleScroll() {
      const cardContainer = this.$refs.cardContainer;
      if (!cardContainer) return;

      const containerBottom = cardContainer.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      if (containerBottom <= windowHeight) {
        this.loadMoreCards();
      }
    },
    loadMoreCards() {
      const filteredCards = this.allCards.filter(
        (card) => card.category === this.currentCategory
      );
      const currentLength = this.visibleCards.length;
      const moreCards = filteredCards
        .slice(currentLength, currentLength + this.cardsPerLoad)
        .map((card) => ({ ...card, fadeIn: false }));
      this.visibleCards = this.visibleCards.concat(moreCards);

      // Trigger fade-in effect
      setTimeout(() => {
        moreCards.forEach((card) => (card.fadeIn = true));
      }, 100); // Delay to allow CSS transition
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.allCards = [
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      // Add more card data here
    ];
    this.loadCards();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.section {
  padding: 20px;
}

.toggle-button {
  display: block;
  margin: 0 auto 20px;
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.toggle-button:hover {
  background-color: #369f6b;
  transform: translateY(-2px);
}

.crt-effect-enter-active,
.crt-effect-leave-active {
  animation: crt-tv 0.8s ease-out;
}

@keyframes crt-tv {
  0% {
    transform: scaleY(0.1);
    opacity: 0;
  }
  20% {
    transform: scaleY(1.2);
    opacity: 1;
  }
  40% {
    transform: scaleY(0.9);
  }
  60% {
    transform: scaleY(1.05);
  }
  80% {
    transform: scaleY(0.95);
  }
  100% {
    transform: scaleY(1);
  }
}

.section-buttons {
  margin-bottom: 20px;
}

.section-buttons button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #121212;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
}

.section-buttons button:hover {
  background-color: #e0e0e0;
  color: #121212;
  transform: translateY(-2px);
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.project-card {
  flex: 0 0 calc(33.33% - 20px);
  max-width: 300px;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.fade-in {
  opacity: 1;
}
</style>
