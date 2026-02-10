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
        <div 
          v-for="icon in data.icons" 
          :key="icon" 
          class="card-tech-wrapper"
        >
          <Icon
            class="card-icon"
            :icon="icon"
          />
          <span class="tech-hover-label">{{ formatTechName(icon) }}</span>
        </div>
      </div>

      <h3 class="card-title">{{ data.title }}</h3>
      <p class="card-description">{{ data.description }}</p>
      
      <div class="card-footer">
        <div class="card-actions">
          <div class="action-slot">
            <a
              v-if="data.gitRepoUrl"
              :href="data.gitRepoUrl"
              target="_blank"
              @click.stop
              class="card-action-btn"
              :title="data.gitRepoUrl.includes('gitlab.com') ? 'GitLab Repository' : 'GitHub Repository'"
            >
              <Icon :icon="data.gitRepoUrl.includes('gitlab.com') ? 'simple-icons:gitlab' : 'simple-icons:github'" />
              <span>Repo</span>
            </a>
          </div>
          <div class="action-slot">
            <a
              v-if="data.liveSiteUrl"
              :href="data.liveSiteUrl"
              target="_blank"
              @click.stop
              class="card-action-btn primary"
              title="Live Demo"
            >
              <Icon icon="lucide:link-2" />
              <span>Live</span>
            </a>
          </div>
        </div>
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
    formatTechName(slug) {
      if (!slug) return '';
      const name = slug.split(':')[1] || slug;
      // Prettify common slugs
      const map = {
        'vuedotjs': 'Vue.js',
        'nodedotjs': 'Node.js',
        'nextdotjs': 'Next.js',
        'reactjs': 'React',
        'tailwindcss': 'Tailwind CSS',
        'gnubash': 'Bash',
        'csharp': 'C#',
        'cplusplus': 'C++',
        'powershell': 'PowerShell',
        'postgresql': 'PostgreSQL',
        'mongodb': 'MongoDB',
        'sqlite': 'SQLite',
        'mysql': 'MySQL',
        'javascript': 'JavaScript',
        'typescript': 'TypeScript'
      };
      return map[name.toLowerCase()] || name.charAt(0).toUpperCase() + name.slice(1);
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

.card-tech-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.tech-hover-label {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(5px);
  background: #6366f1;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 10;
}

.tech-hover-label::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px;
  border-style: solid;
  border-color: #6366f1 transparent transparent transparent;
}

.card-icon {
  width: 18px;
  height: 18px;
  color: #94a3b8;
  filter: brightness(0) invert(1);
  opacity: 0.6;
  transition: all 0.2s ease;
}

.card-tech-wrapper:hover .card-icon {
  opacity: 1;
  transform: scale(1.25);
  filter: brightness(0) invert(1) drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
}

.card-tech-wrapper:hover .tech-hover-label {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
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

.card-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
}

.action-slot {
  display: flex;
  justify-content: flex-start;
}

.card-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 0;
  width: 100%;
  background: #334155;
  color: #f8fafc;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card-action-btn.primary {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

.card-action-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>

