<template>
  <div class="container">
        <div class="cart"><img src="./../../static/logo/cart.png" alt=""></div>
        <div class="yuan" v-if="ifShow"></div>
    </div>
</template>
<style scoped>
    .cart{
        width:100px;
        height: 100px;
        position: fixed;
        right:0px;
        bottom:0px;
        z-index: 10;
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
    }
</style>
<script>
export default {
  name: 'Cart',
  data(){
    return{

    }
  },
  props:['ifShow']
}
</script>
