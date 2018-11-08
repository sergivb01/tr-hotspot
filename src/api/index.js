const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  })
})

router.use('/emojis', require('./emojis'))

module.exports = router
