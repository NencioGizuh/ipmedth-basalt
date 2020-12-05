import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
      theme: {
        themes: {
            light: {
                primary: "#0086d7",
                secondary: "#cfecf7",
                accent: "#ef7d00"
            }
        }
    }
});
