const express = require('express')
let feedFetcher = require('../../utils/feedFetcher')

const router = express.Router()

router.get('/', async (req, res) => {
  res.send({
    error: false,
    message: 'Successfuly fetched latest post from Wordpress Blog',
    data: feedFetcher.getFeed()
  })
})

module.exports = router
