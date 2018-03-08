<template>
  <div>
    <message></message>
    <nav-header></nav-header>
    <!-- <hr> -->

    <div class="main">
      <div class="top">
        <!-- <button @click="changeSort">{{sortWay}}</button> -->
        <div class="top-main">
          <a href="javascript:;" @click="norm" v-bind:class="{choose: ((sort==2)?true:false)}">默认排序</a>
          <a href="javascript:;"  @click="asc">价格升序</a>
          <a href="javascript:;" @click="desc">价格降序</a>
        </div>
      </div>
      <div id="container">

        <div class="item" v-for="item in itemList">
          <div class="itemImage">
            <img v-bind:src="'/static/image/'+item.productImage" alt="">
          </div>
          <div class="itemName">{{item.productName}}</div>
          <div class="itemPrice">{{item.productPrice}}</div>
          <br>
          <!-- <div class="smallbox"></div> -->

          <button>
            加入购物车
          </button>





        </div>
      </div>
      <hr>
    </div>
    <!-- <footer>这里是暂时的页尾</footer> -->

  </div>
</template>
<script>
  import NavHeader from './../components/NavHeader.vue'
  import axios from 'axios'
  import Message from './../components/Message.vue'
  export default {
    name: 'MallPage',
    components:{
      NavHeader,
      Message
    },
    data: function aa() {
      return {
        itemList: [],
        msg: "jasdia",
        sort: 2,
        // defaultPage:1,
        // defaultSize:6
        page:1,
        size:8,
        sortWay:"升序"
      }
    },
    mounted() {
      // axios.get('/itemList').then((res)=>{
      //   let data = res.data;
      //   if(data.status == '0'){
      //     this.itemList = data.result.itemList;
      //   }else if(data.status=='1'){
      //     this.itemList = []
      //   }
      // })
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
      changeSort(){
        this.sort = -this.sort;
        this.page = 1;
        this.getItem();
        if(this.sort==1) this.sortWay="升序";
        if(this.sort==-1) this.sortWay="降序";
      },
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
      }

    }

  }

</script>
<style>
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
    transition: all .6s;
    background: #fff;
    height:410px;
    /* text-align: center; */
  }

  .item:hover {
    /* border: 1px solid #00BFFF; */
    /* transition:all 5s; */
    /* transform: scale(1.01) */
    box-shadow: 5px 5px 20px #888888;
    /* transform:rotate(7deg) */
    transform: translateY(-2px)
  }

  .item:hover .smallbox {

    /* transition:all 5s; */
    /* transform: scale(1.01) */
    /* box-shadow: 10px 10px 5px #888888; */
    /* transform:rotate(7deg) */
    /* transform:translateY(-10px); */
    transform: scale(1.3)
  }
.itemImage{
  width:100%;
}
.itemImage img{
  /* width: 100%; */
  /* width:100%; */
  display: block;
  margin: 5px auto;
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
