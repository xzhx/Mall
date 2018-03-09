// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
// import './assets/css/bootstrap.css'
// 引入Vuex
Vue.use(Vuex);
// 引入vue-lazyload
// loading选项是加载时的图片，attempt是尝试的次数
Vue.use(VueLazyload,{
  loading:'/static/image/5-121204193R0-50.gif',
  attempt: 1
})
Vue.config.productionTip = false

//创建一个store
const store = new Vuex.Store({
  state:{
    userName: '',
    isMessage: false,
    msg:'未登录！'
  },
  mutations:{
    setUserName(state,userName){
      state.userName = userName;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
