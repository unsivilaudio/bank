const mongoose = require('mongoose')

const marketSchema = mongoose.Schema({
 user: {
  type: String,
  unim: true,
  required: true
 },
 password: {
 type: String,
 required: true
 },
 emailPassword: {
 type: String,
 required: true
 },
  price: {
  type: Number,
 },
  description: {
  type: String,
 },
  platform: {
  type: String,
 },
  keywords: {
  type: Array,
 },
  mainEmail: {
  type: String,
 },
})

module.exports = mongoose.model('Market', marketSchema);