<template>
  <section>
    <h2>Personal Projects</h2>
    <p>If you have any personal or freelance projects, showcase them here.</p>
    <p>Describe the problem you solved and the technologies you used.</p>
  </section>
</template>

<script>
export default {
  name: 'PersonalProjectsSection'
}
</script>

<style scoped>
section {
  max-width: 950px; /* Set a maximum width for the section */
  margin: 0 auto; /* Center the section horizontally */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #1e1e1e; /* Optional: Add a background color for contrast */
  color: #e0e0e0; /* Optional: Set text color for readability */
}

h2 {
  margin-top: 0;
  text-align: center; /* Center the heading text */
  color: #bb86fc; /* Optional: Set a color for the heading */
}

p {
  margin: 10px 0;
  text-align: center; /* Center the paragraph text */
}
</style>