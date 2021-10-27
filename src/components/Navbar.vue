<template>
  <nav>
    <v-toolbar flat app color="#353535">
      <v-app-bar-nav-icon color="#7AF6D0" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-uppercase" color="#7AF6D0">
        <span class="font-weight-light">Angelo E </span>
        <span>DZ</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text color="#7AF6D0"
        >My Resume<v-icon right>mdi-download</v-icon>
      </v-btn>
      <v-btn text color="#7AF6D0"
        >Contact Me<v-icon right>mdi-email</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app color="#7AF6D0">
      stuff
    </v-navigation-drawer>
  </nav>
</template>

<style>
.nav-bar {
  margin-left: 19%;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1%;
}
.nav-bar a {
  font-size: 150%;
  font-family: "Oswald", sans-serif;
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


<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>