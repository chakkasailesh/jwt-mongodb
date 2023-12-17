const jwt = require('jsonwebtoken')
const { users } = require('../utils/db')
const log = require('../utils/logger')
require('dotenv').config()
const authenticate = async (req, res, next) => {
  try {
    if (!req.url.includes('/products')) next()
    else {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token)
        return res.status(401).json({ message: 'Authorization field missing' })
      const user = jwt.verify(token, process.env.SECRET)
      const founduser = await users.findOne({ email: user.email })
      if (founduser) next()
      else return res.status(401).json({ message: 'Token invalid' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
