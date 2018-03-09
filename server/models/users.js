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
      "number": String,
      "isChoose": Boolean
    }
  ]
})

module.exports = mongoose.model("user",usersSchema)
// module.exports = mongoose.model('user',itemsSchema,'users')
