<template>
  <div class="project-card" @click="openLink">
    <div class="thumbnail-wrapper">
      <ProjectThumbnail 
        :src="data.imageSrc" 
        :title="data.content.title" 
        :alt="data.content.title" 
      />
      <div class="card-overlay">
        <span class="view-details">View Details</span>
      </div>
    </div>
    
    <div class="card-content">
      <div class="icons-row" v-if="data.assets.icons && data.assets.icons.length">
        <div 
          v-for="icon in data.assets.icons" 
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

      <h3 class="card-title">{{ data.content.title }}</h3>
      <p class="card-description">{{ data.content.short_description || data.content.description }}</p>
      
      <div class="card-footer">
        <div class="card-actions">
          <!-- Row 1: 2 segments -->
          <div class="primary-actions">
            <!-- Segment 1: Repo(s) -->
            <div class="repo-segment">
              <template v-if="hasBothRepos">
                <a
                  :href="getRepoLink('gitlab').url"
                  target="_blank"
                  @click.stop
                  class="card-action-btn icon-only"
                  title="GitLab Repository"
                >
                  <Icon :icon="getLinkIcon('gitlab')" />
                </a>
                <a
                  :href="getRepoLink('github').url"
                  target="_blank"
                  @click.stop
                  class="card-action-btn icon-only"
                  title="GitHub Repository"
                >
                  <Icon :icon="getLinkIcon('github')" />
                </a>
              </template>
              <template v-else-if="hasSingleRepo">
                <a
                  :href="getSingleRepoLink().url"
                  target="_blank"
                  @click.stop
                  class="card-action-btn"
                  :title="getSingleRepoLink().name"
                >
                  <Icon :icon="getLinkIcon(getSingleRepoLink().name)" />
                  <span>{{ getLinkLabel(getSingleRepoLink().name) }}</span>
                </a>
              </template>
            </div>

            <!-- Segment 2: Live button (always same position) -->
            <div v-if="hasLiveLink" class="live-segment">
              <a
                :href="getLiveLink().url"
                target="_blank"
                @click.stop
                class="card-action-btn primary"
                :title="getLiveLink().name"
              >
                <Icon :icon="getLinkIcon(getLiveLink().name)" />
                <span>{{ getLinkLabel(getLiveLink().name) }}</span>
              </a>
            </div>
          </div>

          <!-- Row 2: 2 segments for other links -->
          <div v-if="hasSecondaryLinks" class="secondary-actions">
            <div v-for="link in getSecondaryLinks()" :key="link.name || link.url" class="secondary-segment">
              <a
                :href="link.url"
                target="_blank"
                @click.stop
                class="card-action-btn secondary"
                :title="link.name || 'Link'"
              >
                <Icon :icon="getLinkIcon(link.name)" />
                <span>{{ getLinkLabel(link.name) }}</span>
              </a>
            </div>
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
  computed: {
    hasBothRepos() {
      const links = this.data.assets.links || [];
      const hasGitLab = links.some(link => link.name && link.name.toLowerCase().includes('gitlab'));
      const hasGitHub = links.some(link => link.name && link.name.toLowerCase().includes('github'));
      return hasGitLab && hasGitHub;
    },
    hasSingleRepo() {
      const links = this.data.assets.links || [];
      const hasGitLab = links.some(link => link.name && link.name.toLowerCase().includes('gitlab'));
      const hasGitHub = links.some(link => link.name && link.name.toLowerCase().includes('github'));
      return (hasGitLab || hasGitHub) && !this.hasBothRepos;
    },
    hasLiveLink() {
      const links = this.data.assets.links || [];
      return links.some(link => this.isLiveLink(link.name));
    },
    hasSecondaryLinks() {
      return this.getSecondaryLinks().length > 0;
    }
  },
  methods: {
    openLink() {
      this.$router.push({
        name: 'ProjectView',
        params: { slug: this.data.metadata.slug },
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
    getLinkIcon(linkName) {
      if (!linkName) return 'lucide:link-2';
      const lowerName = linkName.toLowerCase();
      if (lowerName.includes('gitlab')) return 'simple-icons:gitlab';
      if (lowerName.includes('github')) return 'simple-icons:github';
      if (lowerName.includes('netlify')) return 'simple-icons:netlify';
      if (lowerName.includes('vercel')) return 'simple-icons:vercel';
      return 'lucide:link-2';
    },
    getLinkLabel(linkName) {
      if (!linkName) return 'Link';
      const lowerName = linkName.toLowerCase();
      if (lowerName.includes('gitlab')) return 'GitLab';
      if (lowerName.includes('github')) return 'GitHub';
      if (lowerName.includes('netlify') || lowerName.includes('vercel')) return 'Live';
      return linkName;
    },
    isLiveLink(linkName) {
      if (!linkName) return false;
      const lowerName = linkName.toLowerCase();
      return lowerName.includes('netlify') || 
             lowerName.includes('vercel') || 
             lowerName.includes('live') || 
             lowerName.includes('demo');
    },
    getRepoLink(type) {
      const links = this.data.assets.links || [];
      return links.find(link => link.name && link.name.toLowerCase().includes(type));
    },
    getSingleRepoLink() {
      const links = this.data.assets.links || [];
      return links.find(link => link.name && (
        link.name.toLowerCase().includes('gitlab') || 
        link.name.toLowerCase().includes('github')
      ));
    },
    getLiveLink() {
      const links = this.data.assets.links || [];
      return links.find(link => this.isLiveLink(link.name));
    },
    getSecondaryLinks() {
      const links = this.data.assets.links || [];
      return links.filter(link => {
        const lowerName = link.name ? link.name.toLowerCase() : '';
        return !lowerName.includes('gitlab') && 
               !lowerName.includes('github') && 
               !this.isLiveLink(link.name);
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
  cursor: pointer;
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
  cursor: pointer;
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
  cursor: pointer;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: default;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.primary-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
}

.repo-segment {
  display: flex;
  gap: 10px;
}

.repo-segment:has(.icon-only) {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.live-segment {
  display: flex;
}

.secondary-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
}

.secondary-actions:has(.secondary-segment:only-child) {
  grid-template-columns: 1fr;
}

.secondary-segment {
  display: flex;
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
  cursor: pointer;
  position: relative;
  z-index: 5;
}

.card-action-btn.secondary {
  background: #475569;
  font-size: 0.8rem;
}

.card-action-btn.icon-only {
  padding: 6px;
  justify-content: center;
  min-width: auto;
  max-width: 45px;
}

.card-action-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-action-btn.primary {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

.card-action-btn:active {
  transform: translateY(0);
}
</style>

