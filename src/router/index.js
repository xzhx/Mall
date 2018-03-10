import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MallPage from './../views/MallPage.vue'
import NavHeader from './../components/NavHeader.vue'
import Message from './../components/Message.vue'
import FooterBox from './../components/FooterBox.vue'
import LoginBox from './../components/LoginBox.vue'
import RegisterBox from './../components/RegisterBox.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MallPage',
      component: MallPage
    },
    {
      path: '/RegisterBox',
      name: 'RegisterBox',
      component: RegisterBox
    }
  ]
})
