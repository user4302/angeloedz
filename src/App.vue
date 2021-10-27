<template>
  <v-app>
    <Navbar />
    <v-main class="main"><router-view /></v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: { Navbar },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.main {
  /* background: #353535; */
  text-align: center;
  color: #7af6d0;
}
</style>