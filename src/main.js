// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
// import './assets/css/bootstrap.css'
// 引入Vuex
Vue.use(Vuex);
Vue.config.productionTip = false

//创建一个store
const store = new Vuex.Store({
  state:{
    userName: '',
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
