const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    hey: true,
    emojis: ['😀', '😳', '🙄'],
    sup: false
  })
})

module.exports = router
