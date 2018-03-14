var express = require('express');
var router = express.Router();
var users = require('./../models/users')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/22', function(req, res, next) {
  res.send('respond with a resource');
});



// 用户登陆接口，传入userName和password
router.post('/login',function(req,res,next){
  users.findOne({userName:req.body.userName,password:req.body.password},function(err,doc){
    if(err){
      res.json({
        status:"1",
        statusInfo:err.message
      })
    }else{
      if(doc){
        // console.log('suc')
        //加入cookie,使用res.cookie()
        //cookie的maxAge表示cookie的过期时间
        //cookie的path表示路径
        res.cookie("userName",doc.userName,{
          path: "/",
          maxAge: "10000000"
        })
        res.json({
          status:"0",
          statusInfo:"登陆成功",
          data:{
          userName:doc.userName
        }
      })
      } else {
        res.json({
          status:"2",
          statusInfo:"wrong userName or password"
        })
      }
    }
  })
})



// 用户注册接口，传入userName和password
router.post('/signUp',function(req,res,next){
  // 查询是否已经有相同的userName，如果已经有了返回错误提示，如果没有相同的userName则创建账号
  users.findOne({userName:req.body.userName},function(err,doc){
    //如果error，即是未查到相同用户名
    if(err){
      // 通过 new users() 创建一个文档
      res.json({
        status: 1,
        statusInfo: err.message
      })

    }else{
      if(doc){
        res.json({
          status: '5',
          statusInfo: '用户名重复'
        })
      }else{
        let newUser = new users({
          userName:req.body.userName,
          password:req.body.password,
        });
        newUser.save(function(err){
          if(err){
            console.log(err)
          }else{
            console.log('saved.')
          }
        })
        res.json({
          status: '0',
          statusInfo: '注册成功',
          data:{
            userName: req.body.userName,
            password: req.body.password,
            cart: Array
          }
        });
      }




    }
  })
})



// 用户登出接口
router.post("/logout",function(req,res,next){
  res.clearCookie("userName");
  // res.redirect('/')
  res.json({
    status: "0",
    statusInfo: "log out"
  })
})


// 根据cookie确认用户是否登陆
router.get("/ifLogin",(req,res,next)=>{
  let userName = req.cookies.userName;
  if(userName){
    res.json({
      status: "0",
      statusInfo: "登录状态",
      data:{
        userName: userName
      }
    })
  }
})



// 查询当前用户购物车列表接口
router.get('/cart',(req,res,next)=>{
  let userName = req.cookies.userName;
  users.findOne({userName:userName},(err,doc)=>{
    if(err){
      res.json({
        status: '10',
        statusInfo: err.message,
        data:{}
      })
    } else {
      if(doc){
        res.json({
          status: '0',
          statusInfo: '成功返回购物车列表数据',
          data: doc.cart
        })
      }
    }
  })
})

// 购物车的全选和取消全选接口
router.post('/changeChooseAll',(req,res,next)=>{
  let userName = req.cookies.userName;
  let isChooseAll = req.body.isChooseAll;
  users.findOne({userName:userName},(err,user)=>{
    if(err){
      res.json({
        status: '1',
        statusInfo: err.message
      })
    } else {
      if(user){
        user.cart.forEach((product)=>{
          product.isChoose = isChooseAll;
        })
        user.save((err,doc)=>{
          if(err){
            res.json({
              status: '1',
              statusInfo: err.message
            })
          } else {
            res.json({
              status: '0',
              statusInfo: 'change suc',
              data: user
            })
          }
        })
      }
    }
  })
})



// 改变选中或者非选中状态
router.post('/changeChoose',(req,res,next)=>{
  let userName = req.cookies.userName;
  let productId = req.body.productId;
  let isChoose = req.body.isChoose;
  users.update({
    'userName':userName,
    'cart.productId':productId
  },{
    'cart.$.isChoose':!isChoose
  },(err,doc)=>{
    if(err){
      res.json({
        status:'10',
        statusInfo: err.message
      })
    } else {
      res.json({
        status:'0',
        statusInfo:'edit suc'
      })
    }
  })
})

// 改变购物车中商品的数量
router.post('/changeCartAmount',(req,res,next)=>{
  let userName = req.cookies.userName;
  let productId = req.body.productId;
  let amount = req.body.amount;
  users.update(
    {
    'userName':userName,
    'cart.productId':productId
    },
    {
      'cart.$.amount':amount
    },(err,doc)=>{
      if(err){
        res.json({
          status:'10',
          statusInfo: err.message
        })
      } else {
        res.json({
          status:'0',
          statusInfo:'edit suc'
        })
      }
    })
})



// 删除购物车里商品的接口
router.post('/deleteCartItem',(req,res,next)=>{
  let productId = req.body.productId;
  let userName = req.cookies.userName;
  users.update({userName:userName},{
    $pull:{
      'cart':{
        'productId':productId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status:'11',
        statusInfo:err.message
      })
    } else {
      res.json({
        status:'0',
        statusInfo:'删除购物车数据成功'
      })
    }
  })
})


// 查询用户的购物车数量（包括选中和未选中）,即商品种类*商品数量。
router.get('/cartNum',(req,res,next)=>{
  if(req.cookies.userName){
    let userName = req.cookies.userName;
    users.findOne({userName:userName},(err,doc)=>{
      if(err){
        res.json({
          status: '1',
          statusInfo: err.message
        })
      } else {
        let total = 0;
        doc.cart.forEach(product=>{
          total += parseInt(product.amount);
        })
        res.json({
          status: '0',
          statusInfo: '查询成功',
          data: total
        })
      }
    })
  }
})
module.exports = router;
