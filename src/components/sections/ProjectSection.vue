<template>
  <div class="section">
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
        :data="card"
      />
    </div>
  </div>
</template>

<script>
import ProjectCard from '../ProjectCard.vue';
import landingPageThumbnail from '@/assets/images/projectCardThumbnails/landing-page.png'

export default {
  name: 'ProjectSection',
  components: {
    ProjectCard,
  },
  data() {
    return {
      categories: ['Frontend', 'Backend', 'Scripting', 'Mobile'],
      allCards: [],
      visibleCards: [],
      currentCategory: 'Frontend',
      cardsPerLoad: 6,
    };
  },
  methods: {
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
      {
        imageSrc: landingPageThumbnail,
        altText:"langing page",
        iconClass: 'fab fa-vuejs',
        category: 'Frontend',
        title: 'Landing page',
        description: 'A project built with Vue.js. and Tailwind CSS',
        gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/react-js/landing-page',
        liveSiteUrl: 'https://user4302-landing-page.netlify.app/',
      },
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
  font-weight: 1000;
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
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.fade-in {
  opacity: 1;
}
</style>
