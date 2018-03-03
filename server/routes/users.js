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

module.exports = router;
