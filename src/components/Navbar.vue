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
