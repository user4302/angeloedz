<template>
  <div class="project-view" v-if="project">
    <!-- Navigation / Top Actions -->
    <div class="top-actions">
      <router-link to="/" class="back-link">
        <Icon icon="lucide:arrow-left" /> Back
      </router-link>
      <div class="project-links">
        <div class="link-slot" v-for="link in projectLinks" :key="link.name || link.url">
          <a :href="link.url" target="_blank" class="btn btn-github">
            <Icon :icon="getLinkIcon(link.name)" />
            {{ link.name || 'Link' }}
          </a>
        </div>
      </div>
    </div>

    <!-- Hero Header -->
    <header class="project-hero">
      <div class="hero-content">
        <div class="type-badge" v-if="project.metadata.type">
          {{ project.metadata.type }}
        </div>
        <h1>{{ project.content.title }}</h1>
        <p class="hero-desc" v-if="project.content.short_description">
          {{ project.content.short_description }}
        </p>
        
        <div class="tech-row" v-if="project.assets.icons && project.assets.icons.length">
          <div 
            v-for="icon in project.assets.icons" 
            :key="icon" 
            class="hero-tech-icon"
          >
            <Icon :icon="icon" />
            <span class="tech-label">{{ formatTechName(icon) }}</span>
          </div>
        </div>
      </div>

      <div class="project-banner">
        <ProjectThumbnail 
          :src="project.imageSrc" 
          :title="project.content.title" 
          :alt="project.content.title" 
        />
      </div>
    </header>

    <!-- Structured Content -->
    <main class="project-details">
      <!-- Description -->
      <section v-if="project.content.description" class="content-card">
        <h2 class="section-title"><Icon icon="lucide:info" /> Overview</h2>
        <div class="card-body">{{ project.content.description }}</div>
      </section>

      <!-- Role & Contribution -->
      <section v-if="project.content.role" class="content-card">
        <h2 class="section-title"><Icon icon="lucide:user" /> My Role & Contribution</h2>
        <div class="card-body">{{ project.content.role }}</div>
      </section>

      <!-- Impact / Results -->
      <section v-if="project.project_details.achievements && project.project_details.achievements.length" class="content-card impact-card">
        <h2 class="section-title"><Icon icon="lucide:target" /> Impact & Results</h2>
        <div class="card-body impact-list">
          <ul>
            <li v-for="achievement in project.project_details.achievements" :key="achievement">
              {{ achievement }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Technologies Grid -->
      <div class="grid-layout">
        <section v-if="project.project_details.technologies && project.project_details.technologies.length" class="content-card tech-card">
          <h2 class="section-title"><Icon icon="lucide:cpu" /> Key Technologies</h2>
          <div class="chip-cloud">
            <span v-for="tech in project.project_details.technologies" :key="tech" class="tech-chip">
              {{ tech }}
            </span>
          </div>
        </section>

        <section v-if="project.metadata.tags && project.metadata.tags.length" class="content-card tag-card">
          <h2 class="section-title"><Icon icon="lucide:tag" /> Tags</h2>
          <div class="chip-cloud">
            <span v-for="tag in project.metadata.tags" :key="tag" class="tag-chip">
              #{{ tag }}
            </span>
          </div>
        </section>
      </div>

      <!-- Visuals Needed -->
      <section v-if="hasValidScreenshots" class="content-card">
        <h2 class="section-title"><Icon icon="lucide:image" /> Visuals</h2>
        <div class="card-body">
          <div class="screenshots-grid">
            <div v-for="screenshot in validScreenshots" :key="screenshot.name" class="screenshot-item">
              <img 
                :src="screenshot.link" 
                :alt="screenshot.name"
                class="screenshot-image"
                loading="lazy"
              />
              <p class="screenshot-caption">{{ screenshot.name }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Project Links footer -->
    <div class="project-links-footer">
      <div class="link-slot" v-for="link in projectLinks" :key="link.name || link.url">
        <a :href="link.url" target="_blank" class="btn btn-github large">
          <Icon :icon="getLinkIcon(link.name)" />
          View {{ link.name || 'Link' }}
        </a>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-header">
      <router-link to="/" class="mobile-nav-btn back-btn" title="Back to projects">
        <Icon icon="lucide:arrow-left" />
      </router-link>
      
      <div class="mobile-nav-actions">
        <a v-for="link in projectLinks" :key="link.name || link.url" :href="link.url" target="_blank" class="mobile-nav-btn" :title="link.name || 'Link'">
          <Icon :icon="getLinkIcon(link.name)" />
        </a>
      </div>
    </div>

    <!-- Floating Actions (restored for mobile) -->
    <ContactForm />
    <DownloadCV />
  </div>

  <div v-else class="loading-state">
    <div class="pulse-loader"></div>
    <p>Retrieving project details...</p>
  </div>
</template>

<script setup>
/* global defineProps */
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Icon } from '@iconify/vue';
import ProjectThumbnail from '@/components/ProjectThumbnail.vue';
import '@/styles/ProjectView.css';

const props = defineProps({
  slug: {
    type: String,
    required: true,
  }
});

const store = useStore();
const project = computed(() => store.getters['projects/getProjectBySlug'](props.slug));

// Extract links from assets
const projectLinks = computed(() => store.getters['projects/getProjectLinksBySlug'](props.slug));

// Check if screenshots contain valid image URLs (objects with link property)
const hasValidScreenshots = computed(() => {
  const screenshots = project.value?.assets?.screenshots || [];
  return screenshots.length > 0 && screenshots.some(screenshot => 
    typeof screenshot === 'object' && 
    screenshot.link && 
    typeof screenshot.link === 'string' && 
    screenshot.name
  );
});

// Filter valid screenshots (objects with name and link properties)
const validScreenshots = computed(() => {
  const screenshots = project.value?.assets?.screenshots || [];
  return screenshots.filter(screenshot => 
    typeof screenshot === 'object' && 
    screenshot.link && 
    typeof screenshot.link === 'string' && 
    screenshot.name
  );
});

const getLinkIcon = (linkName) => {
  if (!linkName) return 'lucide:link-2';
  const lowerName = linkName.toLowerCase();
  if (lowerName.includes('gitlab')) return 'simple-icons:gitlab';
  if (lowerName.includes('github')) return 'simple-icons:github';
  if (lowerName.includes('netlify')) return 'simple-icons:netlify';
  if (lowerName.includes('vercel')) return 'simple-icons:vercel';
  return 'lucide:link-2';
};

const formatTechName = (slug) => {
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
};
</script>


