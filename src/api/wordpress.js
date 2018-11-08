const express = require('express')
const axios = require('axios')

const router = express.Router()
const formatFeed = require('../utils/wordpressFormatter')
const URL = 'http://' + (process.env.WP_URL || 'localhost')

router.get('/', async (req, res) => {
  const response = await axios.get(`${URL}/feed/`)
  const formattedFeed = await formatFeed.formatFeed(response.data)

  res.send({
    error: false,
    message: 'Successfuly fetched latest post from Wordpress Blog',
    data: formattedFeed
  })
})

module.exports = router
