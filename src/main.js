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
import VueApexCharts from "vue-apexcharts"
import axios from './axios'
import VueCookies from 'vue-cookies'
import sharedFunction from './mixins/sharedFunction'
import VueCurrencyFilter from 'vue-currency-filter'
// import front from './mixins/front'
// import newQuestionnaire from './mixins/newQuestionnaire'
// import slickFunction from './mixins/slickFunction'
// import shared from './mixins/shared'
// Vue.mixin(front)
// Vue.mixin(newQuestionnaire)
// Vue.mixin(slickFunction)
// Vue.mixin(shared)
Vue.use(VueCurrencyFilter,{
    symbol : '$',
    thousandsSeparator: ',',
    fractionCount: 0,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: true
})
Vue.mixin(sharedFunction)
Vue.use(VueCookies)
Vue.use(axios)
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts)
Vue.use(VueScrollmagic)
    // Vue.config.productionTip = false
Vue.use(VueScrollTo)
Vue.use(HighchartsVue)
Vue.use(ElementUI)
    // var front = front || {}
router.beforeEach((to, from, next) => {
    // console.log("router.to:", to.name, Vue.$cookies.get("mptLogin"));
    const data = store.state;
    const cookie = Vue.$cookies.get("mptLogin") || {
        // sales_id: "",
        // roro: "",
        // sales_branch_id: "",
        // sales_name: "",
        // user_id: "",
        // strategyType: "",
        token: '',
        IdNo: '',
        isLogin: false,
    };
    console.log('before route cookie:', cookie)
    console.log('before route to.name:', to.name)
        // 登入頁先重置資料
    if (to.name == "home") {
        Vue.$cookies.remove("mptLogin");
        store.commit("reset");
        next();
        return;
    } else { //其它頁面確認身分 (除了edm?)

        if ((!data.IdNo && !cookie.IdNo) || (!data.isLogin && !cookie.isLogin)) {
            alert('請點選資產檢測按鈕，登入或選擇搶先體驗')
            next("home");
            return;
        }
    }

    next();
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})