import Vue from 'vue'
import Router from 'vue-router'
import compare from '@/pages/compare'
import edm from '@/pages/edm'
import fundreport from '@/pages/fundreport'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/pages/home'
import myportfolio from '@/pages/myportfolio'
Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'development' ? '' : '/dist/', // Areas/MPT_ROBO/
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
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
