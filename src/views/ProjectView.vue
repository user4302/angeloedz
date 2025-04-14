<template>
  <div class="project-view">
    <div class="project-banner-container">
      <img :src="project.imageSrc" alt="Project Banner" class="project-banner" />
    </div>
    <h1>{{ project.title }}</h1>
    <p>{{ project.description }}</p>
    <div class="link-container">
      <a :href="project.gitRepoUrl" target="_blank">GitHub Repository</a>
      <a v-if="project.liveSiteUrl" :href="project.liveSiteUrl" target="_blank">Live Site</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProjectView',
  props: ['id'],
  computed: {
    ...mapGetters('projects', ['getProjectById']), // Specify the module name
    project() {
      return this.getProjectById(Number(this.id));
    },
  },
};
</script>

<style scoped>
.project-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.project-banner-container {
  width: 100%;
  height: 200px; /* Set a fixed height for the banner */
  overflow: hidden;
}

.project-banner {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.link-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}

a {
  color: #42b983;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #f0f0f0;
}

a:hover {
  text-decoration: underline;
  background-color: #e0e0e0;
}
</style>