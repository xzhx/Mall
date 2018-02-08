var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
var items = require('./../models/items')
mongoose.connect('mongodb://127.0.0.1:27017/testMall')//连接数据库
// mongoose.connection.on('connected',function(){})//监听连接成功
// mongoose.connection.on('error',function(){})//监听连接失败
// mongoose.connection.on('disconnected',function(){})//监听连接失败

router.get('/',function(req,res,next){
  items.find({},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
      })
    }else{
      res.json({
        status:'0',
        msg:'获取商品信息',
        result:{
          number:doc.length,
          itemList:doc
        }
      })
    }
  })
});

module.exports = router;
