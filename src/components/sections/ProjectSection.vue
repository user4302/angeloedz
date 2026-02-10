<template>
  <div class="project-section">
    <div class="filter-container">
      <div class="pill-group">
        <button
          v-for="category in categories"
          :key="category"
          @click="filterCategory(category)"
          :class="{ active: category === currentCategory }"
          class="pill-button"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="card-grid" ref="cardContainer">
      <ProjectCard
        v-for="(card, index) in visibleCards"
        :key="`${card.id}-${index}`"
        :data="card"
        :class="{ 'fade-in': card.fadeIn }"
      />
    </div>

    <div v-if="hasMore" class="load-more-sentinel" ref="loadMoreTrigger">
      <div class="loader-dots" v-if="loadingMore">
        <span></span><span></span><span></span>
      </div>
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
      categories: ['Frontend', 'Backend', 'Scripting', 'Terminal', 'Mobile'],
      visibleCards: [],
      currentCategory: 'Frontend',
      cardsPerLoad: 8,
      loadingMore: false,
    };
  },
  computed: {
    ...mapGetters('projects', ['getProjects']),
    filteredProjects() {
      return this.getProjects.filter(p => p.category === this.currentCategory);
    },
    hasMore() {
      return this.visibleCards.length < this.filteredProjects.length;
    }
  },
  methods: {
    filterCategory(category) {
      if (this.currentCategory === category) return;
      this.currentCategory = category;
      this.loadInitialCards();
    },
    loadInitialCards() {
      this.visibleCards = this.filteredProjects
        .slice(0, this.cardsPerLoad)
        .map((card) => ({ ...card, fadeIn: true }));
    },
    handleScroll() {
      const trigger = this.$refs.loadMoreTrigger;
      if (!trigger || this.loadingMore || !this.hasMore) return;

      const rect = trigger.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 100) {
        this.loadMoreCards();
      }
    },
    loadMoreCards() {
      if (this.loadingMore || !this.hasMore) return;
      
      this.loadingMore = true;
      const currentLength = this.visibleCards.length;
      const nextBatch = this.filteredProjects
        .slice(currentLength, currentLength + this.cardsPerLoad)
        .map((card) => ({ ...card, fadeIn: false }));

      setTimeout(() => {
        this.visibleCards = [...this.visibleCards, ...nextBatch];
        setTimeout(() => {
          nextBatch.forEach(c => c.fadeIn = true);
          this.loadingMore = false;
        }, 50);
      }, 300); // Subtle delay for feel
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.loadInitialCards();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.project-section {
  padding: 60px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.filter-container {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.pill-group {
  display: flex;
  background: rgba(30, 41, 59, 0.5);
  padding: 6px;
  border-radius: 999px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.pill-button {
  padding: 10px 24px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: #94a3b8;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pill-button:hover {
  color: #f8fafc;
}

.pill-button.active {
  background: #6366f1;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  width: 100%;
}

.load-more-sentinel {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-dots {
  display: flex;
  gap: 8px;
}

.loader-dots span {
  width: 10px;
  height: 10px;
  background: #6366f1;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loader-dots span:nth-child(1) { animation-delay: -0.32s; }
.loader-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

:deep(.project-card) {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

:deep(.project-card.fade-in) {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Responsive Overrides */
@media (max-width: 768px) {
  .project-section {
    padding: 40px 15px;
  }
  
  .pill-group {
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 20px;
  }
  
  .pill-button {
    padding: 8px 16px;
    font-size: 0.85rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
