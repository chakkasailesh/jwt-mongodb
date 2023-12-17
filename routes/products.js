const express = require('express')
const router = express.Router()
const { products } = require('../utils/db')
const { ObjectId } = require('mongodb')
const log = require('../utils/logger')

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await products.findOne({ _id: new ObjectId(id) })
    if (product) {
      return res.status(200).json(product)
    }
    return res.status(404).json({ message: 'No products found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
