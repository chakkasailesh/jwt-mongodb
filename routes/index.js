const express = require('express')
const router = express.Router()
const users = require('./users')
const products = require('./products')

router.use('/user', users)
router.use('/products', products)

module.exports = router
