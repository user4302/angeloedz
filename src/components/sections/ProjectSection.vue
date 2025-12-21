<template>
  <div class="section">
    <div class="section-buttons">
      <button
        v-for="category in categories"
        :key="category"
        @click="filterCategory(category)"
        :class="{ active: category === currentCategory }"
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
  /**
   * Component data.
   *
   * @returns {object} Initial data state.
   */
  data() {
    return {
      /** @type {string[]} List of available project categories. */
      categories: ['Frontend', 'Backend', 'Scripting', 'Terminal', 'Mobile'],
      /** @type {object[]} List of projects currently visible in the UI. */
      visibleCards: [],
      /** @type {string} The currently selected filter category. */
      currentCategory: 'Frontend',
      /** @type {number} Number of cards to load at once. */
      cardsPerLoad: 3, 
    };
  },
  computed: {
    ...mapGetters('projects', ['getProjectById', 'getProjects']),
  },
  methods: {
    /**
     * Fetches and logs a project by its ID.
     *
     * @param {number} id - The ID of the project to fetch.
     */
    fetchProject(id) {
      const project = this.getProjectById(id);
      console.log(project);
    },
    /**
     * Filters the displayed projects by the selected category.
     *
     * @param {string} category - The category to filter by.
     */
    filterCategory(category) {
      this.currentCategory = category;
      this.loadCards();
    },
    /**
     * Initially loads the first set of projects for the current category.
     */
    loadCards() {
      const filteredCards = this.getProjects.filter(
        (card) => card.category === this.currentCategory
      );
      this.visibleCards = filteredCards
        .slice(0, this.cardsPerLoad)
        .map((card) => ({ ...card, fadeIn: true }));
    },
    /**
     * Window scroll event handler for infinite scrolling.
     */
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
    /**
     * Loads the next set of projects for the current category.
     */
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
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.section-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.section-buttons button.active {
  border: 2px solid white;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .section-buttons {
    flex-direction: column;
    align-items: center;
  }

  .section-buttons button {
    margin: 5px 0;
    width: 80%;
  }

  .card-container {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .section-buttons button {
    font-size: 0.9rem;
  }
}
</style>
