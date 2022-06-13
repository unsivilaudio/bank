const express = require('express')
const router = express.Router();
const market = require('../controller/userController')


router.post('/create', market.createUser)
router.get('/get', market.getAllUser)
router.get('/get/:userId', market.getUser)
module.exports = router