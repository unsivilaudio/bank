const Redeem = require('../models/redeemCode')

exports.createCode = async (req,res,next) => {
 const code = await Redeem.create(req.body)
 res.json({message:'sucessfully', code})
}

exports.getCode = async (req,res,next) => {
 const code = await Redeem.find()
 res.json({message:'sucessfully', code})
}
exports.deleteCode = async (req, res, next) => {
  const {id} = req.params 
  const filter = {redeemCode: id}
  const value = await Redeem.findOneAndDelete(filter)
  res.json({value})
}