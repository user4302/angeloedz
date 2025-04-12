<template>
  <section>
    <h2>Testimonials</h2>
    <p>If possible, include quotes or feedback from colleagues or supervisors.</p>
    <p>Highlight any recognition or awards received at your company.</p>
  </section>
</template>

<script>
export default {
  name: 'TestimonialsSection'
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