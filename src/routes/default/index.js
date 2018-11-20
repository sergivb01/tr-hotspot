const express = require('express')
const ADMIN_EMAILS = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : ['sergi.vos16@ieslabisbal.cat']
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    loggedIn: req.user != null,
    authed: req.session.authed,
    mac: req.session.details ? req.session.details.mac : 'none'
  })
})
console.log(ADMIN_EMAILS)

router.get('/statistics', (req, res) => {
  let user = req.user
  console.log(user)

  if (req.user ? (ADMIN_EMAILS.indexOf(req.user.email) === -1) : true) {
    return res.send('unauthorized')
  }

  res.render('statistics', {
    authed: req.session.authed,
    mac: req.session.details ? req.session.details.mac : 'none'
  })
})

router.get('/debug', (req, res) => {
  res.send(req.session)
})

module.exports = router
