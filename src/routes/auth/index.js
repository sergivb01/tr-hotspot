const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/logout', (req, res) => {
  req.session.destroy()
  req.logout()
  res.redirect('/')
})

router.get('/google', passport.authenticate('google', {
  hd: 'ieslabisbal.cat',
  prompt: 'select_account',
  scope: ['email profile']
}))

router.get('/google/redirect', passport.authenticate('google', {
  hd: 'ieslabisbal.cat',
  prompt: 'select_account',
  scope: ['email profile']
}), (req, res) => {
  let details = req.session.details

  if (details) {
    // TODO: auth details.mac address
  }

  req.session.authed = (details != null)
  req.session.save()
  console.log('redirectt')

  return res.redirect('/statistics')
})

module.exports = router
