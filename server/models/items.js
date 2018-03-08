var mongoose = require('mongoose');


var Schema = mongoose.Schema;//Schema定义表的模型

var itemsSchema = new Schema({
  "productId" : String,
  "productName" : String,
  "productPrice" : Number,
  "productImage" : String
})

module.exports = mongoose.model('item',itemsSchema)
// module.exports = mongoose.model('item',itemsSchema,'items')
