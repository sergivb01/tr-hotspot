const HOSTNAMES = process.env.HOSTNAMES ? process.env.HOSTNAMES.split(',') : ['localhost', '127.0.0.1']
const REDIRECT_HOSTNAME = process.env.REDIRECT_HOSTNAME || 'hs.vostele.com'

const notFound = (req, res, next) => {
  res.status(404)
  const error = new Error('🔍 - Not Found - ' + req.originalUrl)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)

  res.render('error', {
    title: err.message,
    link: `http://${REDIRECT_HOSTNAME}`,
    description: process.env.NODE_ENV === 'production' ? '🤦 Error 🔧' : err.stack
  })
}

const isAccessingByDomain = hostname => {
  return hostname === process.env.REDIRECT_HOSTNAME || 'hs.vostele.com'
}

const isValidHostname = hostname => {
  return HOSTNAMES.indexOf(hostname) !== -1
}

const blockPageHandler = (req, res, next) => {
  if (!isValidHostname(req.hostname)) {
    return res.render('error', {
      title: '🚫 Page Blocked 🙅‍',
      link: `http://${REDIRECT_HOSTNAME}`,
      description: `${req.hostname} és una pàgina bloquejada!`
    })
  }

  if (!isAccessingByDomain(req.hostname) && (process.env.BLOCK_IP || false)) {
    return res.redirect(`http://${process.env.REDIRECT_HOSTNAME}`)
  }

  next()
}

module.exports = {
  notFound,
  errorHandler,
  blockPageHandler
}
