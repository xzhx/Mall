<template>
  <div>
    <header>这里是暂时的页首</header>
    <hr>
    <div id="container">
      <div class="item" v-for="item in itemList">
        <div class="itemName">{{item.name}}</div>
        <div class="itemPrice">{{item.price}}</div>
        <br>
        <div class="smallbox"></div>




      </div>
    </div>
    <hr>
    <footer>这里是暂时的页尾</footer>
  </div>
</template>
<script>
  export default {
    name: 'MallPage',
    data: function aa() {
      return {
        itemList: [],
        msg: "jasdia"
      }
    },
    mounted() {
      this.itemList = [{
        "name": "heihei",
        "price": 2000
      }, {
        "name": "s",
        "price": 2
      }, {
        "name": "s",
        "price": 2
      }, {
        "name": "s",
        "price": 2
      }]
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
