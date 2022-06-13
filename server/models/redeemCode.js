const mongoose = require('mongoose')

const redeemSchema = mongoose.Schema({
 redeemCode: {
  type: String,
  required: true
 },
 amount: {
  type: Number,
  required: true
 }
})

module.exports = mongoose.model('codes', redeemSchema);