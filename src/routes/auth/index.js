const express = require('express')
const router = express.Router()
const passport = require('passport')

const unifi = require('../../utils/unifi')

router.get('/logout', (req, res) => {
  req.session.destroy()
  req.logout()
  res.redirect('/')
})

router.get('/google', passport.authenticate('google', {
  hd: process.env.EMAIL,
  prompt: 'select_account',
  scope: [
    'email',
    'profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/plus.login'
  ]
}))

router.get('/google/redirect', passport.authenticate('google', {
  hd: process.env.EMAIL,
  prompt: 'select_account',
  scope: [
    'email',
    'profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/plus.login'
  ]
}), (req, res) => {
  let details = req.session.details

  if (details && process.env.AUTH_USERS) {
    unifi.authMAC(details.mac)
      .then(data => {
        if (process.env.DEBUG) console.info(data)
      }).catch(err => {
        throw err
      })
  }

  req.session.authed = (details != null)
  req.session.save()

  return res.redirect('/statistics')
})

module.exports = router
