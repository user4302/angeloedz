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
import { mapGetters } from 'vuex';
import ProjectCard from '@/components/ProjectCard.vue';

export default {
  name: 'ProjectSection',
  components: {
    ProjectCard,
  },
  data() {
    return {
      categories: ['Frontend', 'Backend', 'Scripting', 'Mobile'],
      visibleCards: [],
      currentCategory: 'Frontend',
      cardsPerLoad: 3, // Adjusted to load 3 projects at a time
    };
  },
  computed: {
    ...mapGetters('projects', ['getProjectById', 'getProjects']),
  },
  methods: {
    fetchProject(id) {
      const project = this.getProjectById(id);
      console.log(project);
    },
    filterCategory(category) {
      this.currentCategory = category;
      this.loadCards();
    },
    loadCards() {
      const filteredCards = this.getProjects.filter(
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
      const threshold = 100;

      if (containerBottom <= windowHeight + threshold) {
        this.loadMoreCards();
      }
    },
    loadMoreCards() {
      const filteredCards = this.getProjects.filter(
        (card) => card.category === this.currentCategory
      );
      const currentLength = this.visibleCards.length;
      const moreCards = filteredCards
        .slice(currentLength, currentLength + this.cardsPerLoad)
        .map((card) => ({ ...card, fadeIn: false }));
      this.visibleCards = this.visibleCards.concat(moreCards);

      setTimeout(() => {
        moreCards.forEach((card) => (card.fadeIn = true));
      }, 100);
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
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
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 1000;
  font-size: 1.1rem;
}

.section-buttons button:hover {
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
