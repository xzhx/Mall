import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MallPage from './../views/MallPage.vue'
import Login from './../components/Login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MallPage',
      component: MallPage
    },
    {
      path: '/1',
      name: 'Login',
      component: Login
    }
  ]
})
