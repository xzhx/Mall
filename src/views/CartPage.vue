<template>
<div>
    <nav-header ref="header"></nav-header>
    <div class="background">
      <h2>购物车</h2>
        <div class="container">
            <div class="cart">
                <div class="title">
                    <h3>商品列表</h3>
                </div>
                <div class="cart-main">
                    <div class="cart-main-title clearfix">
                        <span class="product">商品</span>
                        <span class="edit">操作</span>
                        <span class="sum">小计</span>
                        <span class="number">数量</span>
                        <span class="price">单价</span>
                    </div>
                    <div class="cart-list" v-for="cartOne in cart" v-bind:key="cartOne.productId">
                        <input type="checkbox" name="" id="" v-model="cartOne.isChoose" @click="choose(cartOne)">
                        <div class="cart-list-img">
                            <img v-bind:src="'/static/image/'+cartOne.productImage" v-bind:alt="cartOne.productName">
                        </div>
                        <div class="cart-list-name">
                            <span>{{cartOne.productName}}</span>
                        </div>
                        <div class="cart-list-edit">
                            <a href="javascript:;" @click="deleteCartItem(cartOne.productId)">删除</a>
                        </div>
                        <div class="cart-list-sum">
                            <span>{{cartOne.amount * cartOne.productPrice}}</span>
                        </div>
                        <div class="cart-list-number">
                            <button class="edit" @click="changeCartAmount('add',cartOne)">+</button>
                            {{cartOne.amount}}
                            <button class="edit" @click="changeCartAmount('dec',cartOne)">-</button>
                        </div>

                        <div class="cart-list-price">
                            <span>{{cartOne.productPrice}}</span>
                        </div>
                    </div>

                </div>


                <div class="menu">
                  <input type="checkbox" name="" id="all" @click="chooseAll" v-bind:checked="isChooseAll">
                  <label for="all">全选</label>
                  <span>删除选中的商品</span>
                  <a href="javascript:;" class="right pay" @click="orderComfirm">结算</a>
                  <span class="right">总价：<span style="color: #d44d44;">{{priceSum}}元</span></span>
                  <span class="right">选中<span style="color: #d44d44;">{{chooseNumber}}</span>件商品</span>
                </div>


            </div>
        </div>
    </div>


    <footer-box></footer-box>
</div>
</template>
<style scoped>
*{
        margin: 0px;
        padding: 0px;
    }
    a{
        text-decoration: none;
        color:black
    }
    .background{
      background: #ededed;
      min-height: 600px;
      padding-bottom: 20px;
    }
    .container{
        width:1090px;
        margin: 0 auto;
        border-radius: 9px;

        /* border: 1px solid red; */
    }
    h2{
      margin-left: 215px;
      height:70px;
      line-height: 70px;
    }
    .cart-main{
              border: 1px solid #dcdcdc;

        border-top: 1px solid #666666;
        /* border-radius: 10px; */
        background: white;
        border-radius: 0 0 8px 8px;
    }
    .cart-main-title{
        background: #eee;
        padding-left: 50px;
        height: 37px;
        line-height: 37px;
        font-size: 14px;
        font-family:monospace;
        color: #838383;
        /* border-radius: 8px 8px 0 0; */
    }
    .title{
        background: linear-gradient(#fbfbfb,#ececec);
    }
    .cart-main .cart-main-title .product{
        float: left;
    }
    .cart-main .cart-main-title span{
        float: right;
        width: 140px;
    }

    .title{
        padding-left: 30px;
        height: 50px;
        line-height: 50px;
        border-radius: 8px 8px 0 0;
    }
    .cart-list{
        height:150px;
        line-height: 150px;
        position: relative;
        padding-left: 50px;
    }
    .cart-list-img img{
        float: left;
        width:100px;
        height:100px;
        margin-top:20px;
        border-radius: 5px;
        border: 1px solid #dddddd;
        /* display: inline-block; */
    }
    .clearfix:after{
        content: ' ';
        visibility: hidden;
        display: block;
        height:0px;
        clear:both;
    }
    .cart-list-name{
        width:170px;
        float: left;
        margin-left: 20px;
    }
    .cart-list-edit,.cart-list-sum,.cart-list-number,.cart-list-price{
        float: right;
        width: 140px;
    }
    /* .cart-list:last-child{ */
      /* border-radius: 0 0 8px 8px; */
    /* } */
    .cart-main input[type=checkbox]{
        position: absolute;
        left: 6px;
        top: 30px;
        zoom: 200%;
    }

    .cart-list-number .edit{
        display: inline-block;
        /* background: #666666; */
        height:20px;
        width:20px;
    }
    .cart-list+.cart-list{
      border-top: 1px solid #666666;
    }

    .menu{
      background: #dddddd;
      height:50px;
      line-height: 50px;
      margin-top: 50px;
      border: 1px solid #ffffff;

    }
    .menu input[type=checkbox]{
      zoom: 1.5;
      position: relative;
      top: 4px;
      left: 2px;
    }
    .menu .right{
      float: right;
    }
    .menu span{
      margin: 0 20px;
    }
    .menu .pay{
      background: #666666;
      margin:0;
      width:200px;
      text-align: center;

    }
    .cart-list-edit a:hover{
      color: #f59999;
    }
</style>
<script>
import axios from 'axios'
import NavHeader from './../components/NavHeader'
import FooterBox from './../components/FooterBox'
export default {
  name:'CartPage',
  data(){
    return{
      cart: [],
      // isChooseAll1: this.isChooseAll
    }
  },
  components:{
    NavHeader,
    FooterBox
  },
  computed:{
    // 利用computed计算属性计算已选商品和当前是否全选
    chooseNumber(){
      // 通过循环  计算出当前的商品
      let num = 0;
      this.cart.forEach(product=>{
        if(product.isChoose == true){
          num++;
        }
      })
      return num;
    },
    // 用已选商品数量和购物车数量对比，如果相等，全选按钮选中
    isChooseAll(){
      return this.chooseNumber === this.cart.length;
    },
    // 计算选中的总价，先判断是否选中，然后累加
    priceSum(){
      let sum = 0;
      this.cart.forEach(product=>{
        if(product.isChoose == true){
          sum+= product.amount*product.productPrice;
        }
      })
      return sum;
    }
  },
  methods:{
    getCart(){
      axios.get('/users/cart')
        .then((res)=>{
          let cart = res.data.data;
          this.cart = cart;
        })
    },
    deleteCartItem(productId){
      axios.post('/users/deleteCartItem',{productId:productId})
        .then((res)=>{
          let result = res.data;
          // debugger;
          this.getCart();
          this.getCartNum();
        })
    },
    changeCartAmount(how,product){
      if(how=='add'){
        product.amount++;
        this.$store.commit('setCartNum',this.$store.state.cartNum+1)
      } else {
        if(product.amount <=1){
          return;
        }
        product.amount--;
        this.$store.commit('setCartNum',this.$store.state.cartNum-1)
      }
      axios.post('/users/changeCartAmount',{
        productId: product.productId,
        amount: product.amount
      }).then((res)=>{
         let result = res.data;
      })
    },
    choose(product){
      axios.post('/users/changeChoose',{productId:product.productId,isChoose:product.isChoose})
        .then((res)=>{
          let result = res.data;
        })
    },
    chooseAll(){
      let changeChoose = !this.isChooseAll;
      this.cart.forEach((cartOne)=>{
        cartOne.isChoose = changeChoose;
      })
      axios.post('/users/changeChooseAll',{isChooseAll:changeChoose})
        .then(res=>{
          let result = res.data;
        })
    },
    // 点击结算，如果勾选商品大于0则进入订单确认界面
    orderComfirm(){
      if(this.chooseNumber>0){
        this.$router.push({
          path: 'OrderComfirm'
        })
      }
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
    this.getCart();
  }
}
</script>
