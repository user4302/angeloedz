<template>
  <div class="project-card" @click="openLink">
    <img :src="data.imageSrc" alt="Project" class="card-image" />
    <div class="card-icon">
      <font-awesome-icon :icon="data.iconClass" class="icon-size" />
    </div>
    <h3>{{ data.title }}</h3>
    <p>{{ data.description }}</p>
    <div class="link-container">
      <a :href="data.gitRepoUrl" target="_blank">Repo</a>
      <a v-if="data.liveSiteUrl" :href="data.liveSiteUrl" target="_blank">Live</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openLink() {
      if (this.data.liveSiteUrl) {
        window.open(this.data.liveSiteUrl, '_blank');
      }
    },
  },
};
</script>

<style scoped>
.project-card {
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  width: 100%;
  max-width: 300px;
  border: none;
  cursor: pointer;
  background-color: #fff; /* Ensure a background color is set */
  color: #000; /* Ensure text color is visible */
}

.card-image {
  width: 100%;
  height: auto;
}

.card-icon {
  text-align: center;
  padding: 10px;
}

.icon-size {
  font-size: 30px;
}

.project-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

h3 {
  font-size: 1.2rem;
  margin: 10px 0;
}

p {
  font-size: 1rem;
  margin: 10px 0;
}

.link-container {
  display: flex; /* Use flexbox to arrange links side by side */
  justify-content: space-evenly; /* Space links evenly */
  margin-top: 10px;
}

a {
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #f0f0f0; /* Optional: Add a background color for links */
}

a:hover {
  text-decoration: underline;
  background-color: #e0e0e0; /* Optional: Change background color on hover */
}
</style>