// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

import ElementUI from "element-ui";
import HighchartsVue from "highcharts-vue";
import VueCookies from "vue-cookies";
import VueCurrencyFilter from "vue-currency-filter";
import VueScrollTo from "vue-scrollto";

import App from "./App";
import axios from "./axios";
import sharedFunction from "./mixins/sharedFunction";
import router from "./router";
import store from "./store";

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
// Vue.use(VueApexCharts);
// Vue.component("apexchart", VueApexCharts)
// Vue.use(VueScrollmagic)
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
    if(location.hostname == 'localhost'){
        console.log('before route cookie:', cookie)
        console.log('before route to.name:', to.name)
        console.log('before route to:', to)
        console.log('before route from:', from)
    }

        // 登入頁先重置資料
    if (to.name == "home") {
        Vue.$cookies.remove("mptLogin");
        store.commit("reset");
        next();
        return;
    } else { //其它頁面確認身分 (除了edm?)
        if( to.name == 'edm'){
            next()
            return
        }
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