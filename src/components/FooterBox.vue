<template>
<div class="footer-main">
  <div class="content">
    <p>Copyright © 2017, xzhx</p>
    <p><router-link to="/">首页</router-link></p>
  </div>
</div>
</template>
<style scoped>
.footer-main{
  /* height:70px; */
  background: #fff;
  /* border:1px solid red; */
}
p{
  /* line-height: 200px;
  display: inline-block;
  margin: 0 auto; */
  text-align: center;
  color: #666;
}
a{
  text-decoration: none;
  color: #5079d9;

}
a:visited{
  color: #5079d9;
}


</style>
<script>
export default{
  name:'footerBox',
  data () {
    return {

    }
  }
}
</script>
