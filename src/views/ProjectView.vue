<template>
  <div class="project-view" v-if="project">
    <!-- Navigation / Top Actions -->
    <div class="top-actions">
      <router-link to="/" class="back-link">
        <Icon icon="lucide:arrow-left" /> Back
      </router-link>
      <div class="project-links">
        <div class="link-slot" v-for="link in projectLinks" :key="link.name">
          <a :href="link.url" target="_blank" class="btn btn-github">
            <Icon :icon="getLinkIcon(link.name)" />
            {{ link.name }}
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
      <section v-if="project.assets.screenshots && project.assets.screenshots.length" class="content-card">
        <h2 class="section-title"><Icon icon="lucide:image" /> Visuals Needed</h2>
        <div class="card-body">
          <ul>
            <li v-for="screenshot in project.assets.screenshots" :key="screenshot">
              {{ screenshot }}
            </li>
          </ul>
        </div>
      </section>
    </main>

    <!-- Project Links footer -->
    <div class="project-links-footer">
      <div class="link-slot" v-for="link in projectLinks" :key="link.name">
        <a :href="link.url" target="_blank" class="btn btn-github large">
          <Icon :icon="getLinkIcon(link.name)" />
          View {{ link.name }}
        </a>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-header">
      <router-link to="/" class="mobile-nav-btn back-btn" title="Back to projects">
        <Icon icon="lucide:arrow-left" />
      </router-link>
      
      <div class="mobile-nav-actions">
        <a v-for="link in projectLinks" :key="link.name" :href="link.url" target="_blank" class="mobile-nav-btn" :title="link.name">
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

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  }
});

const store = useStore();
const project = computed(() => store.getters['projects/getProjectById'](Number(props.id)));

// Extract links from assets
const projectLinks = computed(() => store.getters['projects/getProjectLinks'](Number(props.id)));

const getLinkIcon = (linkName) => {
  if (linkName.toLowerCase().includes('gitlab')) return 'simple-icons:gitlab';
  if (linkName.toLowerCase().includes('github')) return 'simple-icons:github';
  if (linkName.toLowerCase().includes('netlify')) return 'simple-icons:netlify';
  if (linkName.toLowerCase().includes('vercel')) return 'simple-icons:vercel';
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

<style scoped>
.project-view {
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 20px 100px;
  color: #f8fafc;
  overflow-x: hidden;
}

/* Top Navigation */
.top-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #f8fafc;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.back-link:hover {
  background: #6366f1;
  border-color: #6366f1;
  transform: translateX(-5px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.project-links {
  display: flex;
  gap: 12px;
}

.link-slot {
  display: flex;
  align-items: center;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 22px;
  min-width: 140px;
  border-radius: 99px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.btn.large {
  padding: 14px 28px;
  font-size: 1.05rem;
  min-width: 200px;
}

.btn-github {
  background: #1e293b;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-live {
  background: #6366f1;
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

/* Hero Section */
.project-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 80px;
}

.type-badge {
  display: inline-block;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 20px;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

h1 {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(to right, #ffffff 30%, #94a3b8);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  overflow-wrap: break-word;
  word-break: break-word;
}

.hero-desc {
  font-size: 1.2rem;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 40px;
}

.tech-row {
  display: flex;
  gap: 15px;
}

.hero-tech-icon {
  width: 40px;
  height: 40px;
  background: rgba(30, 41, 59, 0.8);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: default;
  position: relative;
}

.tech-label {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: #6366f1;
  color: white;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  pointer-events: none;
}

.tech-label::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #6366f1 transparent transparent transparent;
}

.hero-tech-icon:hover {
  transform: translateY(-8px) scale(1.1);
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
  color: #6366f1;
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
}

.hero-tech-icon:hover .tech-label {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.project-banner {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  height: 400px;
}

/* Content Layout */
.project-details {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.content-card {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.content-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, transparent 100%);
  pointer-events: none;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  color: #6366f1;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 30px;
}

.card-body {
  color: #cbd5e1;
  line-height: 1.8;
  font-size: 1.05rem;
}

.card-body :deep(ul) {
  padding-left: 20px;
}

.card-body :deep(li) {
  margin-bottom: 12px;
}

/* Impact List Styling */
.impact-list :deep(ul) {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.impact-list :deep(li) {
  background: rgba(255, 255, 255, 0.02);
  padding: 20px 24px;
  border-radius: 12px;
  border-left: 4px solid #6366f1;
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin-bottom: 0;
  transition: transform 0.2s;
}

.impact-list :deep(li:hover) {
  transform: translateX(5px);
  background: rgba(255, 255, 255, 0.04);
}

.impact-list :deep(li::before) {
  content: '✓';
  background: #6366f1;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
  box-shadow: 0 2px 6px rgba(99, 102, 241, 0.4);
}

.grid-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 30px;
}

.chip-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tech-chip {
  background: #334155;
  color: #f8fafc;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;
}

.tech-chip:hover {
  background: #475569;
  border-color: #6366f1;
}

.tag-chip {
  color: #94a3b8;
  background: rgba(148, 163, 184, 0.05);
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: 'Fira Code', monospace;
  transition: all 0.2s;
}

.tag-chip:hover {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
}

.project-links-footer {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Mobile Nav */
.mobile-header {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px 20px;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}

.mobile-nav-actions {
  display: flex;
  gap: 12px;
  pointer-events: auto;
}

.mobile-nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1.25rem;
  transition: all 0.2s ease;
  pointer-events: auto;
}

.mobile-nav-btn.back-btn {
  pointer-events: auto;
}

.mobile-nav-btn:hover {
  background: rgba(15, 23, 42, 0.8);
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Loading State */
.loading-state {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.pulse-loader {
  width: 60px;
  height: 60px;
  background: #6366f1;
  border-radius: 50%;
  margin-bottom: 24px;
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}

@keyframes pulse {
  0% { transform: scale(0.9); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 0.2; }
  100% { transform: scale(0.9); opacity: 0.7; }
}

/* Responsive */
@media (max-width: 900px) {
  .project-view {
    padding-top: 60px;
  }

  .project-hero {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
    margin-bottom: 40px;
  }
  
  .tech-row {
    justify-content: center;
    flex-wrap: wrap;
  }

  .grid-layout {
    grid-template-columns: 1fr;
  }

  .project-banner {
    order: -1;
    height: auto;
    aspect-ratio: 16/10;
    min-height: 200px;
  }

  h1 {
    font-size: 2.2rem;
  }

  .hero-desc {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }

  .mobile-header {
    display: flex;
  }

  .back-link {
    display: none;
  }

  .project-links {
    display: none;
  }

  .project-links-footer {
    flex-direction: column;
    align-items: stretch;
    margin-top: 40px;
  }

  .btn.large {
    justify-content: center;
    width: 100%;
    min-width: unset;
  }

  /* Hide floating Contact and CV buttons on mobile */
  :deep(.floating-contact-icon),
  :deep(.floating-cv-icon) {
    display: none;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.8rem;
  }

  .project-view {
    padding: 60px 16px 80px;
  }

  .content-card {
    padding: 24px 20px;
  }

  .project-banner {
    aspect-ratio: 4/3;
  }
}
</style>

