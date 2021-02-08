// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueScrollTo from 'vue-scrollto'
import HighchartsVue from 'highcharts-vue'
import ElementUI from 'element-ui'
import VueScrollmagic from 'vue-scrollmagic'
import VueApexCharts from "vue-apexcharts";
import axios from './axios'
import VueCookies from "vue-cookies";
Vue.use(VueCookies)
Vue.use(axios)
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.use(VueScrollmagic)
// Vue.config.productionTip = false
Vue.use(VueScrollTo)
Vue.use(HighchartsVue)
Vue.use(ElementUI)
// var front = front || {}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
