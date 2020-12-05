import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart));

Vue.filter('formatDate', function (value) {
    return moment(value).locale('nl').format('DD-MM-YYYY');
});

Vue.filter('formatTime', function (value) {
    return moment(value).locale('nl').format('HH:mm');
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
