var mongoose = require('mongoose');


var Schema = mongoose.Schema;//Schema定义表的模型

var itemsSchema = new Schema({
  "productId" : String,
  "productName" : String,
  "productPrice" : Number,
  "productImage" : String,
  "amount": String,
  "isChoose": Boolean
})

module.exports = mongoose.model('product',itemsSchema)
// module.exports = mongoose.model('product',itemsSchema,'products')
