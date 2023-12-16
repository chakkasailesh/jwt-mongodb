require('dotenv').config()
const uri = process.env.MONGODB_URI
const { MongoClient } = require('mongodb')
const client = new MongoClient(uri)
const users = client.db().collection('users')
const products = client.db().collection('products')

module.exports = { users, products }
