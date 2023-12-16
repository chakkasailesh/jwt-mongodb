const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { users } = require('../utils/db')
const log = require('../utils/logger')

require('dotenv').config()

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await users.findOne({ email })
    if (user) return res.status(200).json({ message: 'user already exists' })
    const encryptedpwd = await bcrypt.hash(password, 12)
    users
      .insertOne({ email, password: encryptedpwd })
      .then(() =>
        res.status(201).json({ message: 'user signed up successfully' })
      )
      .catch((error) => {
        log.error(error)
        return res.status(500).json({ message: 'failed to register the user' })
      })
  } catch (error) {
    log.error(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    let user = await users.findOne({ email })
    if (user) {
      let result = await bcrypt.compare(password, user.password)
      if (result) {
        const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1h' })
        return res.status(200).json({ token })
      }
    }
    return res.status(401).json({ message: 'Invalid email or password' })
  } catch (error) {
    log.error(error)
    return res.status(500).json({ message: 'something went wrong' })
  }
})

module.exports = router
