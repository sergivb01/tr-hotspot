const HOSTNAMES = process.env.HOSTNAMES.split(',') || ['localhost']

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
    res.send('invalid hostname')
  }
  next()
}

module.exports = {
  notFound,
  errorHandler,
  blockPageHandler
}
