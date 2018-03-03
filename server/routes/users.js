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

router.post('/login',function(req,res,next){
  user.findOne({userName:req.body.userName,password:req.body.password},function(err,doc){
    if(err){
      res.json({
        msg:"wrong"
      })
    }else{
      if(doc){
        // console.log('suc')
        res.json({
          status:'0',
          statusInfo:'',
          data:{
          userName:doc.userName
        }
      })
      } else {
        res.json({msg:"wrong userName or password"})
      }
    }
  })
})

module.exports = router;
