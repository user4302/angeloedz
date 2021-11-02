<template>
  <div>
    <v-btn text fab class="dark_1" dark fixed @click="drawer = !drawer">
      <v-icon color="#7AF6D0">mdi-menu</v-icon>
    </v-btn>

    <nav>
      <v-app-bar hide-on-scroll app flat color="#121212">
        <v-app-bar-nav-icon color="#7AF6D0" @click="drawer = !drawer">
          <v-icon v-if="drawer">mdi-arrow-collapse-left</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase" style="color: #7af6d0">
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- <v-btn text color="#7AF6D0"
          >My Resume<v-icon right>mdi-download</v-icon>
        </v-btn> -->
        <ContactMe />
      </v-app-bar>
    </nav>

    <v-navigation-drawer v-model="drawer" app temporary>
      <!-- <v-btn @click="drawer = !drawer"><v-icon v-if="drawer">mdi-arrow-collapse-left</v-icon></v-btn> -->
      <!-- <div class="drawer-title">Angelo E De Zoysa</div> -->
      <Drawer />
    </v-navigation-drawer>
  </div>
</template>

<style>
/* @import './assets/css/main.css'; */

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

/* .drawer-title {
  color: #7af6d0;
  font-size: 150%;
  margin-top: 5%;
  display: flex;
  justify-content: center;
} */
</style>

<script>
import Drawer from "@/components/Drawer";
import ContactMe from "@/components/ContactMe";
export default {
  components: { Drawer, ContactMe },
  data() {
    return {
      drawer: false,
    };
  },
  // props: ["drawer"],
};
</script>