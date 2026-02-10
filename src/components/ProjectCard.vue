<template>
  <div class="project-card" @click="openLink">
    <div class="thumbnail-wrapper">
      <ProjectThumbnail 
        :src="data.imageSrc" 
        :title="data.title" 
        :alt="data.title" 
      />
    </div>
    
    <div class="card-content">
      <div class="icons-row" v-if="data.icons && data.icons.length">
        <Icon
          class="card-icon"
          v-for="icon in data.icons"
          :key="icon"
          :icon="icon"
        />
      </div>

      <h3>{{ data.title }}</h3>
      <p>{{ data.description }}</p>
      
      <div class="link-container">
        <a
          v-if="data.gitRepoUrl"
          :href="data.gitRepoUrl"
          target="_blank"
          @click.stop
          class="link-action"
          >Repo <span class="material-icons">open_in_new</span>
        </a>
        <a
          v-if="data.liveSiteUrl"
          :href="data.liveSiteUrl"
          target="_blank"
          @click.stop
          class="link-action"
          >Live <span class="material-icons">open_in_new</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectThumbnail from './ProjectThumbnail.vue';
import { Icon } from '@iconify/vue';

export default {
  name: 'ProjectCard',
  components: {
    ProjectThumbnail,
    Icon
  },
  props: {
    /** @type {object} The project data to display. */
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * Navigates to the detailed project view.
     */
    openLink() {
      this.$router.push({
        name: 'ProjectView',
        params: { id: this.data.id },
      });
    },
  },
};
</script>

<style scoped>
.project-card {
  border-radius: 12px;
  overflow: hidden;
  margin: 15px;
  width: 100%;
  max-width: 350px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 0 0 calc(33.33% - 30px);
  box-sizing: border-box;
  background-color: #1e293b; /* Using a dark slate for better contrast */
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.thumbnail-wrapper {
  width: 100%;
  height: 200px;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: left; /* Ensure left alignment */
}

.icons-row {
  margin-bottom: 12px;
  display: flex;
  gap: 10px;
}

.card-icon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  fill: #94a3b8;
  transition: all 0.3s ease;
  filter: brightness(0) invert(1) grayscale(1); /* Pure white icon */
  opacity: 0.7;
}

.project-card:hover .card-icon {
  opacity: 1;
  filter: brightness(0) invert(1) grayscale(1); /* Keep monochrome on hover */
  transform: translateY(-2px);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
}

h3 {
  font-size: 1.4rem;
  margin: 0 0 8px 0;
  color: #f8fafc;
  font-weight: 700;
  line-height: 1.2;
}

p {
  font-size: 0.95rem;
  margin: 0 0 20px 0;
  color: #94a3b8;
  line-height: 1.6;
  flex-grow: 1;
}

.link-container {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.link-action {
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  color: #f8fafc;
  background: #334155;
  padding: 6px 12px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.link-action:hover {
  background: #475569;
  border-color: #38bdf8;
  color: #38bdf8;
}

.material-icons {
  font-size: 14px;
  margin-left: 6px;
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .project-card {
    flex: 0 0 calc(50% - 30px);
  }
}

@media (max-width: 640px) {
  .project-card {
    flex: 0 0 100%;
    max-width: 100%;
    margin: 15px 0;
  }
}
</style>

