<template>
  <div class="w">


        <div class="header-container">
            <header>
                <!-- <ul class="left menu">
                    <li>
                        <a href="http://localhost:8080/#/">商城首页</a>
                    </li>
                    <li>
                        <a href="javascript:;">广州</a>
                    </li>
                </ul>
                <ul class="right menu" v-show="!loginUserName">
                    <li>
                        <a href="javascript:;" @click="display">登陆</a>
                    </li>
                    <li>
                        <a href="javascript:;">注册</a>
                    </li>
                </ul>
                <ul class="right menu" v-show="loginUserName">
                    <li>
                        <span>欢迎您，{{loginUserName}}</span>
                    </li>
                    <li>
                        <a href="javascript:;" @click="logout">登出</a>
                    </li>
                </ul> -->
                <div class="nav">
                <div class="nav-left">
                    <div class="img">
                        <router-link to="/"><img src="./../../static/logo/logo.png" alt=""></router-link>
                    </div>
                </div>
                <div class="nav-right">
                    <ul class="right menu" v-show="!loginUserName">
                        <li>
                            <a href="javascript:;" @click="display">登陆</a>
                        </li>
                        <li>
                            <a href="javascript:;" @click="displayRegister">注册</a>
                        </li>
                    </ul>
                    <ul class="right menu" v-show="loginUserName">
                        <li>
                            <span>欢迎您，{{loginUserName}}</span>
                        </li>
                        <li>
                            <a href="javascript:;" @click="logout">登出</a>
                        </li>
                    </ul>
                    <ul class="right menu">
                        <li>
                            <router-link to="/CartPage">购物车</router-link><div class="cartNumber"><span>{{this.$store.state.cartNum}}</span></div>
                        </li>
                    </ul>
                </div>
            </div>
            </header>
        </div>

        <!-- <div class="login-modal" v-if="ifShow">
            <div class="modal-header">
                <h4>登陆</h4>
                <a href="javascript:;" v-on:click="hidden">X</a>
            </div>

            <div class="modal-main">
                <span>用户账号</span>
                <div class="username">
                    <input class="" type="text" v-model="userName" placeholder="Username">
                </div>
                <span>用户密码</span>
                <div class="username">
                    <input class="" type="password" v-model="password" placeholder="Password">
                </div>
                <span style="color:red;">{{check}}</span>
                <button @click="login">
                    <span>登陆</span>
                </button>
            </div>


        </div>
        <div id="zhezhao" v-if="ifShow" @click="hidden"></div> -->
        <login-box v-on:hidden="hiddenLogin" v-if="ifShow"></login-box>
        <Register-box v-on:hidden="hiddenRegister" v-if="regIfShow"></Register-box>
    </div>
</template>

<script>
import axios from "axios";
import LoginBox from "./LoginBox"
import RegisterBox from './RegisterBox'
export default {
  name: "navHeader",
  components:{
    LoginBox,
    RegisterBox
  },
  data() {
    return {
      userName: "",
      password: "",
      //loginUserName:"",
      ifShow:false,
      check:" ",
      regIfShow: false,
      // cartNumber: '2'
    };
  },
  computed: {
    loginUserName(){
      return this.$store.state.userName;
    }
  },
  methods: {
    // login: function() {
    //   axios
    //     .post("/users/login", {
    //       userName: this.userName,
    //       password: this.password
    //     })
    //     .then(res => {
    //       let result = res.data;
    //       // alert(result.statusInfo);

    //       if(result.status==0){
    //         this.ifShow = false;
    //         this.check = " ";
    //         //this.loginUserName = result.data.userName
    //         // 使用vuex保存用户信息
    //         this.$store.commit('setUserName',result.data.userName);
    //       }else{
    //         this.check = '账号或密码错误';
    //       }
    //       // this.flag=true;
    //     });
    // },
    logout: function(){
      axios.post("/users/logout").then((res)=>{
        //this.loginUserName = ""
        // 使用vuex保存用户信息
        this.$store.commit('setUserName','');
      })
      this.$router.push({
        path: '/'
      })
    },
    display: function(){
      this.ifShow = true;
    },
    // hidden: function(){
    //   this.ifShow = false;
    // },
    ifLogin: function(){
      axios.get('/users/ifLogin').then((res)=>{
        let status = res.data.status;
        if(status == '0'){
          // this.loginUserName = res.data.data.userName;
          // 使用vuex保存用户信息
          this.$store.commit('setUserName',res.data.data.userName);
        }
      })
    },
    hiddenLogin: function(){
      this.ifShow = false;
      // console.log(1)
    },
    hiddenRegister: function(){
      this.regIfShow = false;
    },
    displayRegister: function(){
      this.regIfShow = true;
    },
    getCartNum(){
      axios.get('/users/cartNum')
        .then(res=>{
          let cartNum = res.data.data;
          this.$store.commit('setCartNum',cartNum)
        })
    }

  },
  mounted(){
    this.ifLogin();
    this.getCartNum();
  }
};
</script>

<style scoped>

* {
    margin: 0;
    padding: 0;
}

.cartNumber{
  background: red;
  display: inline-block;
  width:20px;
  border-radius: 10px;
  text-align: center;
}
.cartNumber *{
  color: white;
}
header {
    background: black;
    height: 100px;
}

.nav {
    display: flex;
    width: 1200px;
    height: 100%;
    display: flex;
    margin: 0 auto;
    /* border: 1px solid red; */
    justify-content: space-between;
}

.img img {
    height: 50px;
    width: 50px;
}

.nav-left {
    display: flex;
    align-items: center;
}

.nav-right {
    display: flex;
    align-items: center;
}
a{
  text-decoration: none;
}
.nav-right a {
    color: aliceblue;
    display: inline-block;
    text-decoration: none;
}

.right {
    list-style: none;
}

li {
    float: left;
    margin-right: 10px;
}


span {
    color: aliceblue;
}




#zhezhao {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
    filter: Alpha(opacity=50);
}

</style>
