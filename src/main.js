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
