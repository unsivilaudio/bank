const express = require('express')
const router = express.Router();
const authController = require('../controller/documents')


router.post('/add', authController.addDocument)
router.get('/get', authController.getDocument)

module.exports = router