<template>
  <v-treeview activatable :items="items"></v-treeview>
</template>

<style scoped>
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
              { id: 20, name: "Vector Design " },
              { id: 21, name: "Bitmap Design" },
              { id: 22, name: "3D Design" },
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
  }),
};
</script>