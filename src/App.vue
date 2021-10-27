<template>
  <v-app>
    <v-main class="main">
      <!-- <div class="nav-bar">
        <router-link class="nav-option" to="/resume">Resume</router-link>
        <router-link class="nav-option" to="/about">About</router-link>
        <router-link class="nav-option" style="font-size: 300%" to="/">Angelo</router-link>
        <router-link class="nav-option" to="/skills">Skills</router-link>
        <router-link class="nav-option" to="/fun">Fun</router-link>
      </div> -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&display=swap');

.main{
  color: #ffffff;
  background: #353535;
  text-align: center;
}

body {
  background: #353535;
}

.nav-bar{
  margin-left: 19%;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1%;
}
.nav-bar a {
  font-size: 150%;
  font-family: 'Oswald', sans-serif;
  color: #ffffff;
}
.nav-bar a.router-link-exact-active {
  color: #42b983;
}
.nav-option {
  flex: 1;
  text-align: center;
  text-decoration-line: none;
}
</style>