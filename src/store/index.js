import Vue from 'vue';
import Vuex from 'vuex';

import appbar from "./modules/appbar";
import auth from "./modules/auth";
import peakflow from "./modules/peakflow";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      appbar,
      auth,
      peakflow,
  }
})
