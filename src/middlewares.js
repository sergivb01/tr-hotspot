const HOSTNAMES = process.env.HOSTNAMES ? process.env.HOSTNAMES.split(',') : ['localhost', '127.0.0.1']

const notFound = (req, res, next) => {
  res.status(404)
  const error = new Error('🔍 - Not Found - ' + req.originalUrl)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)

  res.render('error', {
    'title': err.message,
    'description': process.env.NODE_ENV === 'production' ? '🤦 Error 🔧' : err.stack
  })
}

const isValidHostname = (hostname) => {
  return HOSTNAMES.indexOf(hostname) !== -1
}

const blockPageHandler = (req, res, next) => {
  if (!isValidHostname(req.hostname)) {
    // TODO: Send to blockpage
    return res.render('error', {
      'title': '🚫 Page Blocked 🙅‍',
      'description': `${req.hostname} és una pàgina bloquejada!`
    })
  }
  next()
}

module.exports = {
  notFound,
  errorHandler,
  blockPageHandler
}
