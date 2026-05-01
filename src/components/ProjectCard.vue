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
import '@/styles/ProjectCard.css';
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


