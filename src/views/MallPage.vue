<template>
  <div>
    <header>这里是暂时的页首</header>
    <hr>
    <button @click="changeSort">{{sortWay}}</button>
    <div id="container">

      <div class="item" v-for="item in itemList">
        <div class="itemName">{{item.productName}}</div>
        <div class="itemPrice">{{item.salePrice}}</div>
        <br>
        <div class="smallbox"></div>




      </div>
    </div>
    <hr>
    <footer>这里是暂时的页尾</footer>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'MallPage',
    data: function aa() {
      return {
        itemList: [],
        msg: "jasdia",
        sort: 1,
        // defaultPage:1,
        // defaultSize:6
        page:1,
        size:6,
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
      }
    }

  }

</script>
<style>
  * {
    margin: 0px;
    padding: 0px;
  }

  #container {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }

  .item {
    margin: 10px;
    width: 200px;
    min-width: 200px;
    border: 5px solid gray;
    height: 200px;
    transition: all .6s;
    text-align: center;
  }

  .item:hover {
    border: 5px solid #00BFFF;
    /* transition:all 5s; */
    /* transform: scale(1.01) */
    box-shadow: 10px 10px 5px #888888;
    /* transform:rotate(7deg) */
    transform: translateY(-10px)
  }

  .item:hover .smallbox {

    /* transition:all 5s; */
    /* transform: scale(1.01) */
    /* box-shadow: 10px 10px 5px #888888; */
    /* transform:rotate(7deg) */
    /* transform:translateY(-10px); */
    transform: scale(1.3)
  }

  .smallbox {
    display: inline-block;
    height: 50px;
    width: 50px;
    border: 2px solid grey;
    text-align: center;
    transition: all .6s;
    background: red;

  }

</style>
