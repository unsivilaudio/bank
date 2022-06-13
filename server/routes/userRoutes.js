const express = require('express')
const router = express.Router();
const authController = require('../controller/authController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/d/:Id', authController.findUser)
router.post('/da/:user', authController.sendMoney)
router.get('/getUser', authController.getUser)

router.use(authController.protect);

module.exports = router