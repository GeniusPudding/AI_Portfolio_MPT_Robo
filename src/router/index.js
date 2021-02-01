import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/pages/home'
import content from '@/pages/content'
import fundreport from '@/pages/fundreport'
Vue.use(Router)

export default new Router({
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
      path: '/',
      name: 'content',
      component: content
    },
    {
      path: '/fundreport',
      name: 'fundreport',
      component: fundreport
    }
  ]
})
