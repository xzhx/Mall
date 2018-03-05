<template>
  <div>


        <div class="header-container">
            <header>
                <ul class="left menu">
                    <li>
                        <a href="#">商城首页</a>
                    </li>
                    <li>
                        <a href="#">广州</a>
                    </li>
                </ul>
                <ul class="right menu">
                    <li>
                        <a href="#" @click="display">登陆</a>
                    </li>
                    <li>
                        <a href="#">注册</a>
                    </li>
                </ul>
            </header>
        </div>

        <div class="login-modal" v-if="ifShow">
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
                <button @click="login">
                    登陆
                </button>
                <!-- <button>
                      注册
                    </button> -->
            </div>


        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "navHeader",
  data() {
    return {
      userName: "",
      password: "",
      flag: "",
      ifShow:false
    };
  },
  methods: {
    login: function() {
      axios
        .post("/users/login", {
          userName: this.userName,
          password: this.password
        })
        .then(res => {
          let result = res.data;
          alert(result.statusInfo);

          if(result.status==0){
            this.ifShow = false;
          }
        });
    },
    display: function(){
      this.ifShow = true;
    },
    hidden: function(){
      this.ifShow = false;
    }
  }
};
</script>

<style scoped>
* {
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
a:hover {
  color: #f30213;
}
.header-container {
  background: #e3e4e5;
  min-width: 1100px;
}
header::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.login-modal {
  border: 1px solid black;
  position: absolute;
  top: 100px;
  left: 50%;
  width: 500px;
  margin-left: -241px;
  border-radius: 5px;
  /* display: none; */
  background-color: white;
  z-index: 10;
}
.username {
  vertical-align: middle;
}

.modal-header{
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: #f3f3f3;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
}
.modal-header a{
  float: right;
  margin-right: 20px;
  margin-top: 7px;
  user-select: none;
}
.modal-header h4{
      line-height: 2;
      margin: 0 10px;
      display: inline;
}
.modal-main{
  margin:0 70px;
}
.modal-main input{
  width:100%;
  margin: 10px 0;
  height: 34px;
  padding: 2px 2px;
  box-sizing: border-box;
}
.modal-main button{
  width:100%;
  background-color: #eb5858;
  line-height: 2;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid transparent;
  margin: 10px 0;
}

</style>
