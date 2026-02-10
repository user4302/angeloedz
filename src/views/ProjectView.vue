<template>
  <div class="project-view" v-if="project">
    <!-- Navigation / Top Actions -->
    <div class="top-actions">
      <router-link to="/" class="back-link">
        <Icon icon="lucide:arrow-left" /> Back to projects
      </router-link>
      <div class="project-links">
        <a v-if="project.gitRepoUrl" :href="project.gitRepoUrl" target="_blank" class="btn btn-github">
          <Icon icon="simple-icons:github" /> Repository
        </a>
        <a v-if="project.liveSiteUrl" :href="project.liveSiteUrl" target="_blank" class="btn btn-live">
          <Icon icon="lucide:external-link" /> Live Demo
        </a>
      </div>
    </div>

    <!-- Hero Header -->
    <header class="project-hero">
      <div class="hero-content">
        <div class="type-badge" v-if="sections['Type']">{{ sections['Type'] }}</div>
        <h1>{{ project.title }}</h1>
        <p class="hero-desc" v-if="project.description">{{ project.description }}</p>
        
        <div class="tech-row" v-if="project.icons && project.icons.length">
          <div 
            v-for="icon in project.icons" 
            :key="icon" 
            class="hero-tech-icon"
            :title="icon.split(':')[1]"
          >
            <Icon :icon="icon" />
          </div>
        </div>
      </div>

      <div class="project-banner">
        <ProjectThumbnail 
          :src="project.imageSrc" 
          :title="project.title" 
          :alt="project.title" 
        />
      </div>
    </header>

    <!-- Structured Content -->
    <main class="project-details">
      <!-- Short Description -->
      <section v-if="sections['Short Description']" class="content-card">
        <h2 class="section-title"><Icon icon="lucide:info" /> Overview</h2>
        <div class="card-body" v-html="renderMd(sections['Short Description'])"></div>
      </section>

      <!-- Role & Contribution -->
      <section v-if="sections['My Role & Contribution']" class="content-card">
        <h2 class="section-title"><Icon icon="lucide:user" /> My Role & Contribution</h2>
        <div class="card-body" v-html="renderMd(sections['My Role & Contribution'])"></div>
      </section>

      <!-- Impact / Results -->
      <section v-if="sections['Impact/Results']" class="content-card impact-card">
        <h2 class="section-title"><Icon icon="lucide:target" /> Impact & Results</h2>
        <div class="card-body impact-list" v-html="renderMd(sections['Impact/Results'])"></div>
      </section>

      <!-- Technologies Grid -->
      <div class="grid-layout">
        <section v-if="techList.length" class="content-card tech-card">
          <h2 class="section-title"><Icon icon="lucide:cpu" /> Key Technologies</h2>
          <div class="chip-cloud">
            <span v-for="tech in techList" :key="tech" class="tech-chip">
              {{ tech }}
            </span>
          </div>
        </section>

        <section v-if="tagList.length" class="content-card tag-card">
          <h2 class="section-title"><Icon icon="lucide:tag" /> Tags</h2>
          <div class="chip-cloud">
            <span v-for="tag in tagList" :key="tag" class="tag-chip">
              #{{ tag }}
            </span>
          </div>
        </section>
      </div>

      <!-- Visuals / Final Content -->
      <section v-if="leanRemainingContent" class="content-card remaining-content">
        <div class="card-body" v-html="renderMd(leanRemainingContent)"></div>
      </section>
    </main>

    <!-- Project Links footer for individual pages -->
    <div class="project-links-footer">
       <a v-if="project.gitRepoUrl" :href="project.gitRepoUrl" target="_blank" class="btn btn-github large">
          <Icon icon="simple-icons:github" /> View Repository
        </a>
        <a v-if="project.liveSiteUrl" :href="project.liveSiteUrl" target="_blank" class="btn btn-live large">
          <Icon icon="lucide:external-link" /> View Live Demo
        </a>
    </div>

    <!-- Sticky Bottom Nav for Mobile -->
    <div class="mobile-actions">
      <router-link to="/" class="mobile-btn">
        <Icon icon="lucide:arrow-left" />
      </router-link>
      <a v-if="project.gitRepoUrl" :href="project.gitRepoUrl" target="_blank" class="mobile-btn">
        <Icon icon="simple-icons:github" />
      </a>
      <a v-if="project.liveSiteUrl" :href="project.liveSiteUrl" target="_blank" class="mobile-btn primary">
        <Icon icon="lucide:external-link" />
      </a>
    </div>
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
import { marked } from 'marked';
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

// Section Parsing Logic
const sections = computed(() => {
  if (!project.value || !project.value.content) return {};
  
  const content = project.value.content;
  const headings = [
    'Type',
    'Short Description',
    'My Role & Contribution',
    'Key Technologies/Skills',
    'Impact/Results',
    'Visuals Needed',
    'Links',
    'Tags'
  ];

  const parsed = {};
  headings.forEach(heading => {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\*\\*${escaped}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\s*\\*\\*|$)`, 'i');
    const match = content.match(regex);
    if (match) {
      parsed[heading] = match[1].trim();
    }
  });

  return parsed;
});

const techList = computed(() => {
  const text = sections.value['Key Technologies/Skills'];
  if (!text) return [];
  return text.split('\n').map(l => l.replace(/^\s*-\s*/, '').trim()).filter(Boolean);
});

const tagList = computed(() => {
  const text = sections.value['Tags'];
  if (!text) return [];
  return text.split('\n').map(l => l.replace(/^\s*-\s*/, '').trim()).filter(Boolean);
});

const renderMd = (text) => text ? marked(text) : '';

// Content that hasn't been parsed into specific cards
const leanRemainingContent = computed(() => {
  if (!project.value) return '';
  let content = project.value.content;
  
  // Remove already parsed sections to avoid duplication
  Object.keys(sections.value).forEach(heading => {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\*\\*${escaped}:\\*\\*\\s*[\\s\\S]*?(?=\\n\\s*\\*\\*|$)`, 'i');
    content = content.replace(regex, '');
  });

  return content.trim();
});
</script>

<style scoped>
.project-view {
  max-width: 1100px;
  margin: 0 auto;
  padding: 80px 20px 100px;
  color: #f8fafc;
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

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 99px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.btn.large {
  padding: 14px 28px;
  font-size: 1.05rem;
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
.mobile-actions {
  display: none;
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  padding: 12px;
  border-radius: 100px;
  z-index: 100;
  justify-content: center;
  gap: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.mobile-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  font-size: 1.5rem;
}

.mobile-btn.primary {
  background: #6366f1;
  width: calc(100% - 150px);
  max-width: 150px;
  border-radius: 100px;
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
  .project-hero {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
  
  .tech-row {
    justify-content: center;
  }

  .grid-layout {
    grid-template-columns: 1fr;
  }

  .project-banner {
    order: -1;
    height: 300px;
  }

  h1 {
    font-size: 2.75rem;
  }

  .mobile-actions {
    display: flex;
  }

  .project-links {
    display: none;
  }

  .project-links-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .btn.large {
    justify-content: center;
  }
}
</style>

