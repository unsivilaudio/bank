const express = require('express')
const router = express.Router();
const RedeemController = require('../controller/redeemController')

router.post('/create', RedeemController.createCode)
router.get('/get', RedeemController.getCode)
router.delete('/delete/:id', RedeemController.deleteCode)

module.exports = router