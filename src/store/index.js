import Vue from 'vue';
import Vuex from 'vuex';

import appbar from "./modules/appbar";
import auth from "./modules/auth";
import peakflow from "./modules/peakflow";
import sharedata from "./modules/share_data";

import medicijnen from "./modules/medicijnen.js"
import airquality from "./modules/airquality";
import registraties from "./modules/registraties";
import breathingexercise from "./modules/breathingexercise";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      appbar,
      auth,
      peakflow,
      sharedata,
      medicijnen,
      registraties,
      airquality,
      breathingexercise
  }
})
