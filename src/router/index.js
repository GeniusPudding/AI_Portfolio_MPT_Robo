import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/pages/home'
import myportfolio from '@/pages/myportfolio'
import compare from '@/pages/compare'
import fundreport from '@/pages/fundreport'
import edm from '@/pages/edm'
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'default',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/myportfolio',
      name: 'myportfolio',
      component: myportfolio
    },
    {
      path: '/compare',
      name: 'compare',
      component: compare
    },
    {
      path: '/fundreport',
      name: 'fundreport',
      component: fundreport
    },
    {
      path: '/edm',
      name: 'edm',
      component: edm
    }
  ]
})
