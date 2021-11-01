import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify, {

});

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: "#7AF6D0",
                dark_1: "#121212",
                dark_2: "#363636",
                color: "#7AF6D0",
            },
        }
    }
})

// const vuetify = new Vuetify({
//     theme: {
//       themes: {
//         dark: {
//           primary: "#7AF6D0",
//         },
//       },
//     },
// })