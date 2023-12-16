const winston = require('winston')
const log = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(({ level, message, method, url, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}] [${method}] ${url} - ${message}`
    })
  ),
  transports: [new winston.transports.Console()],
})

const loggerstart = (req, res, next) => {
  const { method, url } = req
  log.info('request recieved', { method, url })
  next()
}
const loggerend = (req, res, next) => {
  const { method, url } = req
  log.info('response sent', { method, url })
  next()
}

module.exports = { loggerstart, loggerend }
