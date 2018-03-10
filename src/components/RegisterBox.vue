<template>
  <div>
    <div class="login-modal">
            <div class="modal-header">
                <h4>注册</h4>
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
                <button @click="signUp">
                    <span>注册</span>
                </button>

                <!-- <button>
                      注册
                    </button> -->
            </div>


        </div>
        <div id="zhezhao"  @click="hidden"></div>
  </div>
</template>
<style scoped>
* {
    margin: 0;
    padding: 0;
}
span {
    color: aliceblue;
}
a{
  text-decoration: none;
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
}
.modal-header a:visited {
  color:black;
}
.modal-header h4 {
    line-height: 2;
    margin: 0 10px;
    display: inline;
}

.modal-main {
    margin: 0 70px;
}

.modal-main input {
    width: 100%;
    margin: 10px 0;
    height: 34px;
    padding: 2px 2px;
    box-sizing: border-box;
}

.modal-main button {
    width: 100%;
    background-color: black;
    line-height: 2;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid transparent;
    margin: 10px 0;
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
    /* display: block; */
}
.modal-main>span{
  color: black;
}
</style>
<script>
import axios from "axios";
export default {
  name: "RegisterBox",
  data(){
    return {
      userName: "",
      password: "",
      check:" "
    }
  },
  methods:{
    hidden(){
      this.$emit('hidden');
    },
    signUp(){
      axios.post('/users/signUp',{
        userName: this.userName,
        password: this.password
      })
      .then(res=>{
        let result = res.data;
        if(result.status == 0){
          this.hidden();
        } else{
          this.check = result.statusInfo;
        }
      })
    }
  }
}
</script>
