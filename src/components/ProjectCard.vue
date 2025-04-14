<template>
  <div class="project-card">
    <img :src="data.imageSrc" alt="Project" class="card-image" />
    <div class="card-icon">
      <font-awesome-icon :icon="data.iconClass" class="icon-size" />
    </div>
    <h3>{{ data.title }}</h3>
    <p>{{ data.description }}</p>
    <div class="link-container">
      <a :href="data.gitRepoUrl" target="_blank" @click.stop>Repo</a>
      <a
        v-if="data.liveSiteUrl"
        :href="data.liveSiteUrl"
        target="_blank"
        @click.stop
        >Live</a
      >
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
      this.$router.push({
        name: 'ProjectView',
        params: { id: this.data.id },
      });
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
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  flex: 0 0 calc(33.33% - 20px);
  box-sizing: border-box;
  background-color: var(--card-bg-color);
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
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}

a {
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
}

a:hover {
  text-decoration: underline;
}
</style>