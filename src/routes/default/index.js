const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {
    loggedIn: req.user != null,
    authed: req.session.authed,
    mac: req.session.details ? req.session.details.mac : 'none'
  })
})

router.get('/statistics', (req, res) => {
  res.render('statistics', {
    authed: req.session.authed,
    mac: req.session.details ? req.session.details.mac : 'none'
  })
})

router.get('/debug', (req, res) => {
  res.send(req.session)
})

module.exports = router
