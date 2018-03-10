var express = require('express');
var router = express.Router();
var user = require('./../models/users')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/22', function(req, res, next) {
  res.send('respond with a resource');
});



// 用户登陆接口，传入userName和password
router.post('/login',function(req,res,next){
  user.findOne({userName:req.body.userName,password:req.body.password},function(err,doc){
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
          maxAge: "1000000"
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
  user.findOne({userName:req.body.userName},function(err,doc){
    //如果error，即是未查到相同用户名
    if(err){
      // 通过 new user() 创建一个文档
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
        let newUser = new user({
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
module.exports = router;
