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