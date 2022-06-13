const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
 username: {
  type: String,
  unqiue: true,
  unim: true,
  required: true
 },
 password: {
  type: String,
  unquie: true,
  required: true
 },
  balance: {
  type: Number,
  default: 0
 },
  level: {
  type: Number,
  default: 1
 },
 redeemCode100: {
  type: String,
  default: false
 }
})

module.exports = mongoose.model('test', userSchema);