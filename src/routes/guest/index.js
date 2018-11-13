const express = require('express')

const router = express.Router()

router.get('/s/default', (req, res) => {
  req.session.details = {
    mac: req.query.id,
    ap: req.query.ap,
    time: req.query.t,
    ssid: req.query.ssid,
    url: req.query.url
  }
  req.session.save()

  res.redirect('/')
})

module.exports = router
