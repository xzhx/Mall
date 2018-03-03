var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
var items = require('./../models/items')
mongoose.connect('mongodb://127.0.0.1:27017/testMall')//连接数据库
// mongoose.connection.on('connected',function(){})//监听连接成功
// mongoose.connection.on('error',function(){})//监听连接失败
// mongoose.connection.on('disconnected',function(){})//监听连接失败


//Blog.find({ author: 'me' }).exec(callback); 推荐
//Blog.find({ author: 'me'}, callback);

// 查询商品接口
// 参数sort表示升降序
// 参数page表示分页中的第几页
// size表示每一页的商品数量
router.get('/',function(req,res,next){
  let sort = parseInt(req.param('sort'));
  if(sort!==sort) sort=1;
  let page = parseInt(req.param('page'))
  let size = parseInt(req.param('size'));

  items.find({})
  .sort({'salePrice':sort})
  .skip((page-1)*size)
  .limit(size)
  .exec(function(err,doc){
    if(err){
      res.json({
        status:"1",
        statusInfo:err.message,
      })
    }else{
      res.json({
        status:"0",
        statusInfo:"获取商品信息",
        data:{
          number:doc.length,
          itemList:doc
        }
      })
    }
  })
});

module.exports = router;
