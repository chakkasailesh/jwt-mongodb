const express = require('express')
const app = express()
const log = require('./utils/logger')
const router = require('./routes/index')
const port = 3000
const logger = require('./middleware/logger')
const authenticator = require('./middleware/authenticator')

app.use(express.json())
app.use(logger)
app.use(authenticator)
app.use(router)
app.use((err, req, res, next) => {
  log.error(err)
  const status = err.status || 400
  res.status(status).json({ message: err.message })
})

app.listen(3000, () => {
  log.info(`server is listening at port ${port}`)
})
