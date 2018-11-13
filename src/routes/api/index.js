const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  })
})
router.use('/pihole', require('./pihole'))
router.use('/unifi', require('./unifi'))
router.use('/wp', require('./wordpress'))

module.exports = router
