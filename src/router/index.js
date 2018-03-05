import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MallPage from './../views/MallPage.vue'
import NavHeader from './../components/NavHeader.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MallPage',
      component: MallPage
    },
    {
      path: '/NavHeader',
      name: 'NavHeader',
      component: NavHeader
    }
  ]
})
