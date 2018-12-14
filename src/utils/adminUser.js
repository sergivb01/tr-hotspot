const ADMIN_EMAILS = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : ['sergi.vos16@ieslabisbal.cat']

const isAdmin = user => {
  if (!user) return false

  return ADMIN_EMAILS.indexOf(user.email) !== -1
}

const getRedirect = user => {
  return isAdmin ? '/statistics' : '/'
}

module.exports = {
  isAdmin,
  getRedirect
}
