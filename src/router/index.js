import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MallPage from './../views/MallPage.vue'
import NavHeader from './../components/NavHeader.vue'
import Message from './../components/Message.vue'
import FooterBox from './../components/FooterBox.vue'
import LoginBox from './../components/LoginBox.vue'
import RegisterBox from './../components/RegisterBox.vue'
import CartPage from './../views/CartPage.vue'
import OrderComfirm from './../views/OrderComfirm.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MallPage',
      component: MallPage,
      meta:{
        title: '这里是商城首页'
      }
    },
    {
      path: '/CartPage',
      name: 'CartPage',
      component: CartPage,
      meta:{
        title: '这里是购物车列表'
      }
    },
    {
      path: '/OrderComfirm',
      name: 'OrderComfirm',
      component: OrderComfirm,
      meta:{
        title: '这里是订单确认页面'
      }
    }
  ]
})
