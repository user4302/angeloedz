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
          :title="icon.replace('si', '')"
        >
          <span class="tech-icon" v-html="getIconSvg(icon)"></span>
        </div>
      </div>

      <p class="description">{{ project.description }}</p>
      <div class="link-container">
        <a v-if="project.gitRepoUrl" :href="project.gitRepoUrl" target="_blank" class="btn btn-github">GitHub Repository</a>
        <a v-if="project.liveSiteUrl" :href="project.liveSiteUrl" target="_blank" class="btn btn-live">Live Site</a>
      </div>
    </header>

    <div class="markdown-body" v-html="renderedContent"></div>
  </div>
  <div v-else class="loading">
    Loading project...
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import { marked } from 'marked';
import * as simpleIcons from 'simple-icons'; // Import all icons
import ProjectThumbnail from '@/components/ProjectThumbnail.vue';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
});

const store = useStore();

const project = computed(() => {
  return store.getters['projects/getProjectById'](props.id);
});

const renderedContent = computed(() => {
  return project.value ? marked(project.value.content || '') : '';
});

const getIconSvg = (iconKey) => {
  const icon = simpleIcons[iconKey];
  return icon ? icon.svg : '';
};
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
  fill: #e2e8f0;
}

.tech-icon :deep(svg) {
  width: 100%;
  height: 100%;
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
  line-height: 1.6;
  color: #334155;
  background: #f8fafc;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.markdown-body :deep(h2) {
  margin-top: 1.5em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #e2e8f0;
}

.markdown-body :deep(h3) {
  margin-top: 1.2em;
}

.markdown-body :deep(pre) {
  background: #1e293b;
  color: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.markdown-body :deep(code) {
  font-family: 'Fira Code', monospace;
  background: #f1f5f9;
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
}

.loading {
  text-align: center;
  padding: 100px;
  font-size: 1.5rem;
  color: #94a3b8;
}

@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
  }
  
  .project-banner-container {
    height: 250px;
  }
}
</style>

