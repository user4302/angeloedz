<template>
  <div class="project-section">
    <div class="filter-container">
      <!-- Desktop: Horizontal Pills -->
      <div class="pill-group desktop-only">
        <button
          v-for="category in availableCategories"
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
              v-for="category in availableCategories"
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
import '@/styles/ProjectSection.css';

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
    },
    availableCategories() {
      return this.categories.filter(category => 
        this.getProjects.some(p => p.metadata.category === category)
      );
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
    },
    availableCategories() {
      // If current category becomes unavailable, switch to first available one
      if (!this.availableCategories.includes(this.currentCategory) && this.availableCategories.length > 0) {
        this.currentCategory = this.availableCategories[0];
      }
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

