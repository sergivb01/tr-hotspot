const express = require('express')
const router = express.Router()

const adminUser = require('../../utils/adminUser')

router.get('/', (req, res) => {
  res.render('index', {
    loggedIn: req.user != null,
    authed: req.session.authed,
    mac: req.session.details ? req.session.details.mac : 'none'
  })
})

router.get('/statistics', (req, res) => {
  if (!adminUser.isAdmin(req.user)) {
    return res.redirect('/')
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
