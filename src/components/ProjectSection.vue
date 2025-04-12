<template>
  <div class="section">
    <div class="section-buttons">
      <button v-for="category in categories" :key="category" @click="filterCategory(category)">
        {{ category }}
      </button>
    </div>
    <div class="card-container">
      <ProjectCard
        v-for="(card, index) in visibleCards"
        :key="index"
        :imageSrc="card.imageSrc"
        :iconClass="card.iconClass"
      />
    </div>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue';
import baftaImage from '@/assets/images/projectCardThumbnails/bafta.jpg'; // Import the image

export default {
  name: 'ProjectSection',
  components: {
    ProjectCard
  },
  data() {
    return {
      categories: ['Frontend', 'Backend', 'Scripting', 'Mobile'],
      allCards: [], // This will be populated with card data
      visibleCards: [],
      currentCategory: 'Frontend',
      cardsPerLoad: 6
    };
  },
  methods: {
    filterCategory(category) {
      this.currentCategory = category;
      this.loadCards();
    },
    loadCards() {
      // Filter and load cards based on the current category
      const filteredCards = this.allCards.filter(card => card.category === this.currentCategory);
      this.visibleCards = filteredCards.slice(0, this.cardsPerLoad);
    },
    handleScroll() {
      const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.loadMoreCards();
      }
    },
    loadMoreCards() {
      const filteredCards = this.allCards.filter(card => card.category === this.currentCategory);
      const currentLength = this.visibleCards.length;
      const moreCards = filteredCards.slice(currentLength, currentLength + this.cardsPerLoad);
      this.visibleCards = this.visibleCards.concat(moreCards);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // Initialize with some card data
    this.allCards = [
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Frontend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Backend' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Scripting' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
    { imageSrc: baftaImage, iconClass: 'fab fa-js', category: 'Mobile' },
      // Add more card data here
    ];
    this.loadCards();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
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
  background-color: #42b983;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

.section-buttons button:hover {
  background-color: #369f6b;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the cards */
  gap: 20px; /* Add space between cards */
  max-width: 1000px; /* Optional: Limit the maximum width of the container */
  margin: 0 auto; /* Center the container */
}

.project-card {
  flex: 0 0 calc(33.33% - 20px); /* Ensure three cards per row with spacing */
  max-width: 300px; /* Optional: Limit the maximum width of each card */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}
</style>