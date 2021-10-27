<template>
  <v-app>
    <Navbar />
    <v-content class="main"><router-view /></v-content>
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
  background: #353535;
  text-align: center;
  color: #7af6d0;
}
</style>