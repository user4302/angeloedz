<template>
  <div class="project-view" v-if="project">
    <div class="project-banner-container">
      <ProjectThumbnail 
        :src="project.imageSrc" 
        :title="project.title" 
        :alt="project.title" 
      />
    </div>
    <header class="project-header">
      <h1>{{ project.title }}</h1>
      
      <!-- Tech Stack Icons -->
      <div class="tech-stack" v-if="project.icons && project.icons.length">
        <div 
          v-for="icon in project.icons" 
          :key="icon" 
          class="tech-icon-wrapper"
          :title="icon"
        >
        <Icon 
          :icon="icon" 
          class="tech-icon"
          :title="icon"
        />
        </div>
      </div>

      <p class="description">{{ project.description }}</p>
      <div class="link-container">
        <a v-if="project.gitRepoUrl" :href="project.gitRepoUrl" target="_blank" class="btn btn-github">Repo</a>
        <a v-if="project.liveSiteUrl" :href="project.liveSiteUrl" target="_blank" class="btn btn-live">Live</a>
      </div>
    </header>

    <div class="markdown-body" v-html="renderedContent"></div>
  </div>
  <div v-else class="loading">
    Loading project...
  </div>
</template>

<script setup>
/* global defineProps */
import { computed } from 'vue';
import { useStore } from 'vuex';
import { marked } from 'marked';
import { Icon } from '@iconify/vue';
import ProjectThumbnail from '@/components/ProjectThumbnail.vue';

/**
 * Component props for ProjectView
 * @typedef {Object} ProjectViewProps
 * @property {string|number} id - The unique identifier of the project to display
 */

/** @type {ProjectViewProps} */
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
    validator: (value) => {
      // Ensure the ID is a valid number or numeric string
      const num = Number(value);
      return !isNaN(num) && num > 0;
    }
  }
});

/** @type {import('vuex').Store} */
const store = useStore();

/**
 * Computed property that retrieves the project data from the store
 * @returns {Object|null} The project object or null if not found
 */
const project = computed(() => {
  return store.getters['projects/getProjectById'](Number(props.id));
});

/**
 * Computed property that converts markdown content to HTML
 * @returns {string} The rendered HTML content
 */
const renderedContent = computed(() => {
  return project.value ? marked(project.value.content || '') : '';
});
</script>

<style scoped>
.project-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.project-banner-container {
  width: 100%;
  height: 350px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background-color: #1e293b;
}

/* ProjectThumbnail will fill the container */

.project-header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  background-clip: text; /* Standard property */
  -webkit-text-fill-color: transparent;
}

.tech-stack {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.tech-icon-wrapper {
  background: #1e293b;
  padding: 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background-color 0.2s;
}

.tech-icon-wrapper:hover {
  transform: translateY(-3px);
  background: #334155;
}

.tech-icon {
  width: 24px;
  height: 24px;
  display: flex;
  filter: brightness(0) invert(1); /* Monochrome white */
  opacity: 0.8;
  transition: all 0.3s ease;
}

.tech-icon-wrapper:hover .tech-icon {
  opacity: 1;
}

.description {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 20px;
}

.link-container {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn {
  text-decoration: none;
  padding: 10px 24px;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-github {
  background: #1e293b;
  color: white;
}

.btn-live {
  background: #6366f1;
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

/* Markdown Styling */
.markdown-body {
  line-height: 1.7;
  color: #1e293b; /* High contrast dark slate */
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: left; /* Strict left alignment */
}

/* Override global styles that cause low contrast */
.markdown-body :deep(p),
.markdown-body :deep(li),
.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(strong) {
  color: #1e293b !important;
}

.markdown-body :deep(h2) {
  margin-top: 2em;
  padding-bottom: 0.5em;
  border-bottom: 2px solid #f1f5f9;
  font-size: 1.75rem;
  font-weight: 700;
}

.markdown-body :deep(h3) {
  margin-top: 1.5em;
  font-size: 1.4rem;
  font-weight: 600;
}

.markdown-body :deep(ul), .markdown-body :deep(ol) {
  padding-left: 20px;
  margin-bottom: 1.5em;
}

.markdown-body :deep(li) {
  margin-bottom: 8px;
}

.markdown-body :deep(pre) {
  background: #0f172a;
  color: #f8fafc;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 1.5em 0;
  border: 1px solid #1e293b;
}

.markdown-body :deep(code) {
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  background: #f1f5f9;
  color: #475569 !important; /* Overriding global white */
  padding: 0.2em 0.4em;
  border-radius: 6px;
  font-size: 0.9em;
}

.markdown-body :deep(pre code) {
  background: none;
  color: inherit !important;
  padding: 0;
  font-size: 0.85em;
}

.loading {
  text-align: center;
  padding: 100px;
  font-size: 1.5rem;
  color: #94a3b8;
}

@media (max-width: 640px) {
  h1 {
    font-size: 2.25rem;
  }
  
  .project-banner-container {
    height: 250px;
  }

  .markdown-body {
    padding: 25px;
  }
}
</style>

