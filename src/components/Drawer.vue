<template>
  <div>
    <div class="drawer-title">Angelo E De Zoysa</div>
    <v-sheet class="pa-4" color="#363636">
      <v-text-field
        v-model="search"
        label="Whatchya lookin' for? 🤔"
        dark
        flat
        hide-details
        clearable
        clear-icon="mdi-close"
      ></v-text-field>
      <v-checkbox
        dark
        hide-details
        v-model="caseSensitive"
        label="Case sensitive search"
      ></v-checkbox>
    </v-sheet>
    <v-treeview
      activatable
      rounded
      hoverable
      dense
      open-on-click
      color="#7AF6D0"
      :items="items"
      :search="search"
      :filter="filter"
    >
    </v-treeview>
  </div>
</template>

<style scoped>
.drawer-title {
  color: #7af6d0;
  font-size: 150%;
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
</style>

<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        name: "About Me",
        children: [
          { id: 2, name: "Bio" },
          { id: 3, name: "Cover Letter" },
          { id: 4, name: "Resume" },
        ],
      },
      {
        id: 5,
        name: "My Skills",
        children: [
          {
            id: 6,
            name: "Coding",
            children: [
              {
                id: 7,
                name: "Python ",
                children: [
                  { id: 8, name: "Flask " },
                  { id: 9, name: "tkinter" },
                  { id: 10, name: "Image Processing" },
                ],
              },
              {
                id: 11,
                name: "Java",
                children: [
                  { id: 12, name: "Java FX" },
                  { id: 13, name: "Spring Boot" },
                ],
              },
              {
                id: 14,
                name: "Web",
                children: [
                  {
                    id: 15,
                    name: "Vue ",
                    children: [
                      { id: 16, name: "Vuetify" },
                      { id: 17, name: "Nuxt" },
                    ],
                  },
                  { id: 18, name: "React" },
                ],
              },
            ],
          },
          {
            id: 19,
            name: "Graphic Designing",
            children: [
              { id: 20, name: "Vector Image Design " },
              { id: 21, name: "Bitmap Image Design" },
              { id: 22, name: "3D Image Design" },
            ],
          },
          { id: 23, name: "Video Editing" },
          {
            id: 24,
            name: "Technical Writing",
            children: [
              { id: 25, name: "User Manuals" },
              { id: 26, name: "Research Documentation" },
            ],
          },
          { id: 27, name: "UI/UX Designing" },
        ],
      },
    ],
    open: [1, 2],
    search: null,
    caseSensitive: false,
  }),
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
  },
};
</script>