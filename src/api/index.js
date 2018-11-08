const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  })
})

router.use('/wp', require('./wordpress'))
router.use('/pihole', require('./pihole'))

module.exports = router
