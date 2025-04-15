<template>
  <a
    href="/docs/ANGELO E DE ZOYSA.pdf"
    class="floating-icon"
    title="View CV"
    target="_blank"
  >
    <span class="material-icons">description</span>
  </a>
</template>

<script>
export default {
  name: 'DownloadCV',
};
</script>

<style scoped>
.floating-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: var(--white-ish);
  padding: 10px;
  border-radius: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
}

.floating-icon:hover {
  background-color: white;
  color: black;
}

.material-icons {
  font-size: 24px;
}
</style>