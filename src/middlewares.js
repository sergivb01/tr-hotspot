const HOSTNAMES = process.env.HOSTNAMES ? process.env.HOSTNAMES.split(',') : ['localhost', '127.0.0.1']

function notFound(req, res, next) {
  res.status(404)
  const error = new Error('🔍 - Not Found - ' + req.originalUrl)
  next(error)
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  })
}

function isValidHostname(hostname) {
  return HOSTNAMES.indexOf(hostname) !== -1
}

function blockPageHandler(req, res, next) {
  if (!isValidHostname(req.hostname)) {
    //TODO: Send to blockpage
    return res.send({
      error: true,
      message: 'Should print blockpage',
      hostname: req.hostname
    })
  }
  next()
}

module.exports = {
  notFound,
  errorHandler,
  blockPageHandler
}
