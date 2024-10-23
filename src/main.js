/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import router from './routes/starterRouter';
import store from './store/store'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
Vue.use(VueViewer)
// plugin setup
Vue.use(DashboardPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
});
