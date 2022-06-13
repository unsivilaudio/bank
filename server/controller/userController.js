const Market = require('../models/userModel')


exports.createUser = async(req,res,next) => {
 const market = await Market.create(req.body)
 res.json({market})
}

exports.getAllUser = async(req,res,next) => {
 const market = await Market.find()
 res.json({market})
}

exports.getUser = async(req,res,next) => {
 const {userId} = req.params
 const market = await Market.findById(userId)
 res.json({market})
}