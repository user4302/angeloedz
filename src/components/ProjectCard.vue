<template>
  <div class="project-card">
    <img :src="imageSrc" alt="Project" class="card-image" />
    <div class="card-icon">
      <font-awesome-icon :icon="iconClass" class="icon-size" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    imageSrc: String,
    iconClass: String,
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
  /* transition: transform 0.5s ease, box-shadow 0.5s ease; */
}
</style>
