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
        :imageSrc="card.imageSrc"
        :iconClass="card.iconClass"
        :class="{ 'fade-in': card.fadeIn }"
      />
    </div>
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

.section-buttons {
  margin-bottom: 20px;
}

.section-buttons button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

.section-buttons button:hover {
  background-color: #e0e0e0;
  color: #121212;
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