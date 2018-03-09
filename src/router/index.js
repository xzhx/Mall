import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MallPage from './../views/MallPage.vue'
import NavHeader from './../components/NavHeader.vue'
import Message from './../components/Message.vue'
import FooterBox from './../components/FooterBox.vue'
import LoginBox from './../components/LoginBox.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MallPage',
      component: MallPage
    },
    {
      path: '/LoginBox',
      name: 'LoginBox',
      component: LoginBox
    }
  ]
})
