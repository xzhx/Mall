var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usersSchema = new Schema({
  "userName":String,
  "userId":String,
  "password":String,
  "cart": [
    {
      "productId" : String,
      "productName" : String,
      "productPrice" : Number,
      "productImage" : String,
      "amount": String,
      "isChoose": Boolean
    }
  ]
})
// user的schema中的cart代表该用户的购物车
module.exports = mongoose.model("user",usersSchema)
// module.exports = mongoose.model('user',itemsSchema,'users')
