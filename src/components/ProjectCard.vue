<template>
  <div class="project-card">
    <img :src="imageSrc" alt="Project" class="card-image" />
    <div class="card-icon">
      <i :class="iconClass"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    imageSrc: String,
    iconClass: String
  }
}
</script>

<style scoped>
.project-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  width: 100%;
  max-width: 300px;
}

.card-image {
  width: 100%;
  height: auto;
}

.card-icon {
  text-align: center;
  padding: 10px;
}

.card-icon i {
  font-size: 24px;
  color: #333;
}
</style>