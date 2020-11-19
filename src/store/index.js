import Vue from 'vue';
import Vuex from 'vuex';

import appbar from "./modules/appbar";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      appbar,
      auth,
  }
})
