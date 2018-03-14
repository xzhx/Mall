<template>
  <div class="container" v-if="this.$store.state.userName">
        <div class="cart"><img src="./../../static/logo/cart.png" alt="" @click="cartPage"></div>
        <div class="yuan" v-if="ifShow"></div>
        <div class="cart-num" >
          <span>{{this.$store.state.cartNum}}</span>
        </div>
    </div>
</template>
<style scoped>
    .cart{
        width:100px;
        height: 100px;
        position: fixed;
        right:0px;
        bottom:0px;
        z-index: 7;
    }
    .cart-num{
      position: fixed;
      right:20px;
      bottom:70px;
      background: red;
      border-radius: 50%;
      z-index: 8;
      width:20px;
      text-align: center;
    }
    .cart-num span{
      z-index: 8;
      color: white;
    }
    @keyframes luoxia{
        0% {}
        100% {bottom:70px; visibility: hidden;}
    }
    .yuan{
        width:20px;
        height: 20px;
        border-radius: 30px;
        background: black;
        position: fixed;
        right:20px;
        bottom:200px;
        animation: luoxia .2s ;
        animation-fill-mode:forwards;
    }
    .cart img{
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
</style>
<script>
export default {
  name: 'Cart',
  data(){
    return{

    }
  },
  props:['ifShow'],
  methods:{
    cartPage(){
      this.$router.push({
        path: '/CartPage'
      })
    }
  }
}
</script>
