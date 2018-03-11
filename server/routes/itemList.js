var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
var products = require('./../models/products')
var users = require('./../models/users')
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
  // let sort = parseInt(req.param('sort'));
  let sort = parseInt(req.query.sort);
  // if(sort!==sort) sort=1;
  // let page = parseInt(req.param('page'));
  let page = parseInt(req.query.page);
  // let size = parseInt(req.param('size'));
  let size = parseInt(req.query.size);
  if(sort==2){
    products.find({})
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
  } else{
    products.find({})
  .sort({'productPrice':sort})
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
  }
});

// 加入购物车接口
router.post("/addItem",function(req,res,next){
  // 从cookie中拿取userName,从req中拿取productId
  // 因为我们做了拦截，所以能加入购物车的肯定是已经登陆检验过的，就不需要再验证userName了
  // 接口思路如下： 先通过userName找到相应用户，再通过productId找到相应要加入购物车的商品，然后通过对用户的cart的遍历，看用户的购物车里是否已经有了该商品，有了则数量加1，没有则将这个商品的doc保存到用户的cart里。
  let productId = req.body.productId;
  let userName = req.cookies.userName;
  users.findOne({
    userName:userName
  },function(err,user){
    if(err){
      //切记！这个err不是找不到，而是报错了
      res.json({
        status: '5',
        statusInfo: err.message
      });
    }else{
      products.findOne({productId:productId},(err,product)=>{
        if(err){
          //切记！这个err不是找不到，而是报错了
          res.json({
            status: '6',
            statusInfo: err.message
          })
        } else {
          // 这里要先判断用户的购物车里是否已经有相同productId的商品了，通过遍历
          let existProduct = '';
          user.cart.forEach((item)=>{
            if(item.productId == productId){
              item.amount ++;
              existProduct = product;
            }
          });
          if(existProduct){
            user.save((err,doc)=>{
              if(err){
                res.json({
                  status: '8',
                  statusInfo: err.message
                })
              } else{
                res.json({
                  status: '0',
                  statusInfo: '添加购物车成功，数量加1',
                  data:{

                  }
                })
              }
            })
          } else {
            products.findOne({productId:productId},(err,product)=>{
              if(err){
                res.json({
                  status: '7',
                  statusInfo: err.message
                })
              } else {
                if(product){
                  product.amount = 1;
                  product.isChoose = 1;
                  user.cart.push(product);
                  user.save((err,doc)=>{
                    if(err){
                      res.json({
                        status: '8',
                        statusInfo: err.message
                      })
                    } else{
                      res.json({
                        status: '0',
                        statusInfo: '新添加购物车成功',
                        data:{

                        }
                      })
                    }
                  })
                }
              }
            })
          }

        }
      })
    }
  })
})
module.exports = router;
