<template>
  <div class="project-section">
    <div class="filter-container">
      <!-- Desktop: Horizontal Pills -->
      <div class="pill-group desktop-only">
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
      
      <!-- Mobile: Custom Dropdown -->
      <div class="mobile-dropdown mobile-only">
        <div class="custom-dropdown" :class="{ 'is-open': isDropdownOpen }">
          <button 
            @click="toggleDropdown"
            class="dropdown-trigger"
          >
            {{ currentCategory }}
            <Icon icon="lucide:chevron-down" class="dropdown-arrow" />
          </button>
          <div class="dropdown-menu" v-show="isDropdownOpen">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectCategory(category)"
              :class="{ 'active': category === currentCategory }"
              class="dropdown-option"
            >
              {{ category }}
            </button>
          </div>
        </div>
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

    <!-- Infinite Scroll Sentinel -->
    <div v-show="hasMore" class="scroll-sentinel" ref="loadMoreTrigger">
      <div class="loader-dots" v-if="loadingMore">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Icon } from '@iconify/vue';
import ProjectCard from '@/components/ProjectCard.vue';

export default {
  name: 'ProjectSection',
  components: {
    ProjectCard,
    Icon,
  },
  data() {
    return {
      categories: ['Frontend', 'Backend', 'Scripting', 'Terminal', 'Mobile'],
      visibleCards: [],
      currentCategory: 'Frontend',
      cardsPerLoad: 8,
      loadingMore: false,
      observer: null,
      isDropdownOpen: false,
    };
  },
  computed: {
    ...mapGetters('projects', ['getProjects']),
    filteredProjects() {
      return this.getProjects.filter(p => p.metadata.category === this.currentCategory);
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
    initObserver() {
      if (this.observer) this.observer.disconnect();

      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.loadingMore && this.hasMore) {
          this.loadMoreCards();
        }
      }, {
        rootMargin: '200px', // Trigger before it actually hits the screen
      });

      if (this.$refs.loadMoreTrigger) {
        this.observer.observe(this.$refs.loadMoreTrigger);
      }
    },
    loadMoreCards() {
      if (this.loadingMore || !this.hasMore) return;
      
      this.loadingMore = true;
      const currentLength = this.visibleCards.length;
      const nextBatch = this.filteredProjects
        .slice(currentLength, currentLength + this.cardsPerLoad)
        .map((card) => ({ ...card, fadeIn: false }));

      if (nextBatch.length === 0) {
        this.loadingMore = false;
        return;
      }

      // Small delay for smooth transition feel
      setTimeout(() => {
        this.visibleCards = [...this.visibleCards, ...nextBatch];
        setTimeout(() => {
          nextBatch.forEach(c => c.fadeIn = true);
          this.loadingMore = false;
        }, 50);
      }, 200);
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectCategory(category) {
      this.currentCategory = category;
      this.isDropdownOpen = false;
      this.loadInitialCards();
    },
  },
  watch: {
    currentCategory() {
      this.loadInitialCards();
    }
  },
  mounted() {
    this.loadInitialCards();
    this.initObserver();
  },
  updated() {
    // Re-bind observer if sentinel was re-added to DOM
    if (this.hasMore && this.$refs.loadMoreTrigger) {
      this.observer.observe(this.$refs.loadMoreTrigger);
    }
  },
  beforeUnmount() {
    if (this.observer) this.observer.disconnect();
  },
};
</script>

<style scoped>
.project-section {
  padding: 60px 20px 80px;
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
  position: relative;
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

.scroll-sentinel {
  height: 1px; /* Minimal height to trigger observer without adding blank space */
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-dots {
  padding: 20px 0;
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

/* Custom Mobile Dropdown Styles */
.mobile-dropdown {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.custom-dropdown {
  position: relative;
  min-width: 200px;
}

.dropdown-trigger {
  width: 100%;
  background: rgba(30, 41, 59, 0.5);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
}

.dropdown-trigger:hover {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
}

.custom-dropdown.is-open .dropdown-trigger {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.dropdown-arrow {
  transition: transform 0.3s;
  font-size: 1.2rem;
}

.custom-dropdown.is-open .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: rgba(30, 41, 59, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  overflow: hidden;
  z-index: 10;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.dropdown-option {
  width: 100%;
  background: transparent;
  color: #94a3b8;
  border: none;
  padding: 12px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.dropdown-option:hover {
  background: rgba(99, 102, 241, 0.1);
  color: #f8fafc;
}

.dropdown-option.active {
  background: #6366f1;
  color: white;
}

/* Responsive Visibility */
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  
  .mobile-only {
    display: flex;
  }

  .project-section {
    padding: 40px 15px;
  }

  .card-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (min-width: 769px) {
  .desktop-only {
    display: flex;
  }
  
  .mobile-only {
    display: none;
  }
}
</style>
