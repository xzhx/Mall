<template>
  <div class="go" v-show="this.$store.state.isMessage">
    <span>{{msg}}</span>
    <a href="javascript:;" @click="hideMessage">╳</a>
  </div>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {

    }
  },
  computed:{
    msg(){
      return this.$store.state.msg;
    }
  },
  props:{

  },
  methods:{
    hideMessage(){
      this.$store.commit('hideMessage')
    }
  }
}
</script>

<style scoped>
span,a{
  color:rgb(122, 116, 116);
  display: inline-block;
  margin: auto;
}
div{
  background: rgb(222, 228, 240);
  width:460px;
  text-align: center;
  margin: 0 auto;
  border-radius:  5px;
  position: fixed;
  left: 50%;
  z-index: 20;
  margin-left: -230px;
  margin-top: 24px;
}
a{
  text-decoration: none;
  float: right;
}
a:hover{
  transform: rotate(180deg);
  transition: all 0.2s ease;
}
.go{
  animation: shake .2s;
}
@keyframes shake {
  10% {transform: translateX(-7px)}
  40% {transform: translateX(5px)}
  60% {transform: translateX(-7px)}
  80% {transform: translateX(5px)}
  100%{transform: translateX(0)}
}
</style>
