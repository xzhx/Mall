<template>
  <div>
    <message></message>
    <nav-header ref="header"></nav-header>
    <!-- <hr> -->

    <div class="main">
      <div class="top">
        <!-- <button @click="changeSort">{{sortWay}}</button> -->
        <div class="top-main">
          <a href="javascript:;" @click="norm" v-bind:class="{choose: ((sort==2)?true:false)}">默认排序</a>
          <a href="javascript:;"  @click="asc" v-bind:class="{choose: ((sort==1)?true:false)}">价格升序</a>
          <a href="javascript:;" @click="desc" v-bind:class="{choose: ((sort==-1)?true:false)}">价格降序</a>
        </div>
      </div>
      <div id="container">

        <div class="item" v-for="item in itemList" v-bind:key="item.productId">
          <div class="itemImage">
            <img v-lazy="'/static/image/'+item.productImage" alt="">
          </div>
          <div class="itemName">{{item.productName}}</div>
          <div class="itemPrice">￥{{item.productPrice}}</div>
          <br>

          <button @click="addItem(item.productId)">
            加入购物车
          </button>
        </div>
      </div>
      <hr>
    </div>
    <!-- <footer>这里是暂时的页尾</footer> -->
    <footer-box></footer-box>
    <cart v-bind:if-show="addAnimation"></cart>
  </div>
</template>
<script>
  import NavHeader from './../components/NavHeader.vue'
  import axios from 'axios'
  import FooterBox from './../components/FooterBox.vue'
  import Message from './../components/Message.vue'
  import Cart from './../components/Cart.vue'
  export default {
    name: 'MallPage',
    components:{
      NavHeader,
      Message,
      FooterBox,
      Cart
    },
    data: function aa() {
      return {
        itemList: [],  //存放请求到的商品列表
        msg: "",
        sort: 2,    //2表示默认排序，1表示升序，-1表示降序
        page: 1,     //表示页数
        size: 18,     //表示每次请求的数量
        // sortWay:"升序"
        addAnimation: false
      }
    },
    mounted() {
      this.getItem();
    },
    methods:{
      getItem(){
        var param = {
          page:this.page,
          size:this.size,
          sort:this.sort
        }
        axios.get('/itemList',{params:param}).then((res)=>{
        let data = res.data;
        if(data.status == '0'){
          this.itemList = data.data.itemList;
        }else if(data.status=='1'){
          this.itemList = []
        }
      })
      },
      // changeSort(){
      //   this.sort = -this.sort;
      //   this.page = 1;
      //   this.getItem();
      //   if(this.sort==1) this.sortWay="升序";
      //   if(this.sort==-1) this.sortWay="降序";
      // },
      asc(){
        this.sort = 1;
        this.getItem();
      },
      desc(){
        this.sort = -1;
        this.getItem();
      },
      norm(){
        this.sort = 2;
        this.getItem();
      },
      addItem(productId){
        axios.post('/itemList/addItem',{productId:productId})
          .then((res)=>{
            let result = res.data;
            if(result.status==0){
              // alert('加入成功');
              this.switchAnimation();

            }
            if(result.status == -2){

              this.$store.commit('setMessage',result.statusInfo);
              this.$store.dispatch('displayMessage');
              this.$refs.header.ifShow = true;
            }
          })
      },
      switchAnimation(){
        this.addAnimation = true;
        setTimeout(()=>{
          this.addAnimation = false;
        },200)
      }

    }

  }

</script>
<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }
  div.main{
    width:100%;
    height: 100%;
    background: #ededed;
  }
  #container {
    /* display: flex; */
    width: 1200px;;
    margin: 0 auto;
    /* flex-wrap: wrap; */
  }
  #container::after{
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
  }
  .top{
    width: 100%;
    height: 70px;
  }
  .top .top-main{
    width:1200px;
    margin: 0 auto;
    display: flex;
    line-height:70px;
  }
  .top .top-main a{
    text-decoration: none;
    color: #999;
    height: 100%;
    margin: 0 10px;
    font-size: 14px;
  }

  .item {
    /* margin: 10px; */
    float: left;
    width:25%;
    /* width: 200px; */
    /* min-width: 200px; */
    border: 1px solid #efefef;
    box-sizing: border-box;
    /* height: 200px; */
    transition: all .4s;
    background: #fff;
    height:410px;
    text-align: center;
  }

  .item:hover {
    /* border: 1px solid #00BFFF; */
    /* transition:all 5s; */
    /* transform: scale(1.01) */
    box-shadow: 0 0 10px #888888 inset;
    /* transform:rotate(7deg) */
    /* transform: translateY(-2px) */
  }
.item .itemPrice{
    color: #e4393c;
}
  /* .item:hover .smallbox {

    transition:all 5s;
    transform: scale(1.01);
    box-shadow: 10px 10px 5px #888888;
    transform:rotate(7deg);
    transform:translateY(-10px);
    transform: scale(1.3)
  } */

.item button{
  width:60%;
  font-size:16px;
  background: black;
  color: white;
  height: 3em;
  cursor: pointer;
  border: none;
}
.itemImage{
  width:100%;
  margin-top:20px;
}
.itemImage img{
  /* width: 100%; */
  /* width:100%; */
  display: block;
  margin: 5px auto;
  width:220px;
  height:220px;
}
.choose{
  color: black !important;
}
  /* .smallbox {
    display: inline-block;
    height: 50px;
    width: 50px;
    border: 2px solid grey;
    text-align: center;
    transition: all .6s;
    background: red;

  } */

</style>
