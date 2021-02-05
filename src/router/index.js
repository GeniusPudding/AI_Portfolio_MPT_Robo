import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/pages/home'
import content from '@/pages/content'
import fundreport from '@/pages/fundreport'
import edm from '@/pages/edm'
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/content',
      name: 'content',
      component: content
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
