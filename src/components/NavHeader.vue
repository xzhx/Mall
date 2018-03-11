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
                        <a href="http://localhost:8080/#/"><img src="./../../static/logo/logo.png" alt=""></a>
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
                            <a href="javascript:;">购物车</a><div class="cartNumber"><span>{{cartNumber}}</span></div>
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
      cartNumber: '2'
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
    },
    display: function(){
      this.ifShow = true;
    },
    // hidden: function(){
    //   this.ifShow = false;
    // },
    ifLogin: function(){
      axios.get("/users/ifLogin").then((res)=>{
        let status = res.data.status;
        if(status == "0"){
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
    }

  },
  mounted(){
    this.ifLogin()
  }
};
</script>

<style scoped>
/* * {
  margin: 0;
  padding: 0;
}
.menu {
  list-style: none;
}
header {
  vertical-align: middle;
  margin: 0 154px;
}
li {
  float: left;
  margin: 0 20px;
}
.left {
  float: left;
}
.right {
  float: right;
}
a {
  text-decoration: none;
  color: #999;
  font-size: 15px;
}
a:visited {
  color: #999;
}
ul span{
  color: #999;
}
a:hover {
  color: #f30213;
}
.header-container {
  background: black;
  min-width: 1100px;
  height:50px;
  margin-bottom: 50px;
}
header::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
} */
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


/* .login-modal {
    border: 1px solid black;
    position: absolute;
    top: 100px;
    left: 50%;
    width: 500px;
    margin-left: -241px;
    border-radius: 5px;
    background-color: white;
    z-index: 10;
} */

/* .username {
    vertical-align: middle;
}

.modal-header {
    border: 1px solid transparent;
    border-radius: 5px;
    background-color: #f3f3f3;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
}

.modal-header a {
    float: right;
    margin-right: 20px;
    margin-top: 7px;
    user-select: none;
    color:black;
} */
/* .modal-header a:visited {
  color:black;
}
.modal-header h4 {
    line-height: 2;
    margin: 0 10px;
    display: inline;
}

.modal-main {
    margin: 0 70px;
} */

/* .modal-main input {
    width: 100%;
    margin: 10px 0;
    height: 34px;
    padding: 2px 2px;
    box-sizing: border-box;
} */

/* .modal-main button {
    width: 100%;
    background-color: black;
    line-height: 2;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid transparent;
    margin: 10px 0;
} */

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
