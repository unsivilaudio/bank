const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { promisify } = require('util');


const signToken = id => {
 return jwt.sign({id}, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN
 })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};
exports.signup = async (req,res,next) => {
 const {username, password} = req.body
 let user = await User.findOne({username})
 if(user){
  return res.json({message: 'user is existed'})
 }
 if(!(username && password)){
  res.status(400).send("All input is required")
 }
 const hashedPassword = await bcrypt.hash(password, 12)
 user = new User({
  username,
  password: hashedPassword
 })
 await user.save();
  createSendToken(user, 201, res);
}

exports.login = async (req, res, next) => {
 const {username, password} = req.body

 if(!(username && password)){
 res.status(400).send("All input is required");
 }
 const user = await User.findOne({username}).select('+password')

 if(!user || !(await bcrypt.compare(password, user.password))) {
  return ('Incorrect email or password');
 }
 createSendToken(user, 200, res)
}

exports.protect = async (req,res,next) => {
 let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);


  const currentUser = await User.findById(decoded.id)
  if(!currentUser) {
   return next('The user is no longer exist')
  }

  req.user = currentUser
  res.locals.user = currentUser;
  next();
}

exports.getUser = async (req,res,next) => {
const users = await User.find();
  res.status(201).json({users})
}

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.findUser = async (req,res,next) => {
  const {Id} = req.params
    const value = await User.findByIdAndUpdate(Id, req.body, {
      new: true,
      runValidators: true
    })

  res.status(201).json({
    message:'successfully',
    data:
    value
  })
}

exports.sendMoney = async (req, res, next) => {
  const {user} = req.params 
  const filter = {username: user}
  const value = await User.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true
  })
  res.json({value})
}