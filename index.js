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

app.listen(3000, () => {
  log.info(`server is listening at port ${port}`)
})
