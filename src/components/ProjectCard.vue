<template>
  <div class="project-card" @click="openLink">
    <div class="thumbnail-wrapper">
      <ProjectThumbnail 
        :src="data.imageSrc" 
        :title="data.title" 
        :alt="data.title" 
      />
      <div class="card-overlay">
        <span class="view-details">View Details</span>
      </div>
    </div>
    
    <div class="card-content">
      <div class="icons-row" v-if="data.icons && data.icons.length">
        <Icon
          class="card-icon"
          v-for="icon in data.icons"
          :key="icon"
          :icon="icon"
          :title="icon.split(':')[1]"
        />
      </div>

      <h3 class="card-title">{{ data.title }}</h3>
      <p class="card-description">{{ data.description }}</p>
      
      <div class="card-footer">
        <div class="link-pill-group">
          <a
            v-if="data.gitRepoUrl"
            :href="data.gitRepoUrl"
            target="_blank"
            @click.stop
            class="pill-link"
            title="Repository"
          >
            <Icon icon="simple-icons:github" />
          </a>
          <a
            v-if="data.liveSiteUrl"
            :href="data.liveSiteUrl"
            target="_blank"
            @click.stop
            class="pill-link"
            title="Live Demo"
          >
            <Icon icon="simple-icons:netlify" v-if="data.liveSiteUrl.includes('netlify')" />
            <Icon icon="lucide:external-link" v-else />
          </a>
        </div>
        <span class="category-tag">{{ data.category }}</span>
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
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
  background: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(255, 255, 255, 0.03);
  height: 100%;
  cursor: pointer;
  position: relative;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.thumbnail-wrapper {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .card-overlay {
  opacity: 1;
}

.view-details {
  color: white;
  font-weight: 600;
  padding: 8px 20px;
  border: 2px solid white;
  border-radius: 99px;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.project-card:hover .view-details {
  transform: translateY(0);
}

.card-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.icons-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.card-icon {
  width: 18px;
  height: 18px;
  color: #94a3b8;
  filter: brightness(0) invert(1);
  opacity: 0.6;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.card-description {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 24px;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-pill-group {
  display: flex;
  gap: 8px;
}

.pill-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #334155;
  color: #f8fafc;
  border-radius: 50%;
  transition: all 0.2s;
  text-decoration: none;
}

.pill-link:hover {
  background: #6366f1;
  transform: scale(1.1);
}

.category-tag {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
}
</style>

