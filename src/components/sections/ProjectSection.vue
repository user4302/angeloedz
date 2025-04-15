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
  data() {
    return {
      categories: ['Frontend', 'Backend', 'Scripting', 'Mobile'],
      visibleCards: [],
      currentCategory: 'Frontend',
      cardsPerLoad: 3, 
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
