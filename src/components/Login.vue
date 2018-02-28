<template>
  <div id="input-box">
    <!-- <link rel="stylesheet" href="./../assets/css/bootstrap.css"> -->
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1"><span class=" glyphicon glyphicon-user"></span></span>
            <input type="text" v-model="userName" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
        </div>
        <br>
        <div class="input-group">
            <span class="input-group-addon" id="basic-addon1"><span class="  glyphicon glyphicon-lock"></span></span>
            <input type="text" v-model="password" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
        </div>
        <button type="button" @click="login" class="btn btn-primary btn-login">登陆</button>
        {{userName}}
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'login',
    data(){
      return{
        userName:'',
        password:'',
        flag:''
      }
    },
    methods:{
      login:function(){
        axios.post("/users/login",{
          userName:this.userName,
          password:this.password
        })
      }
    }
  }
</script>

<style scoped>
 /* @import './../../static/css/bootstrap.css' */
</style>
