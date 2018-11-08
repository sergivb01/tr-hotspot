const axios = require('axios')

const formatFeed = require('./wordpressFormatter')
const URL = 'http://' + (process.env.WP_URL || 'localhost')

let data = {}

const readRSS = async () => {
  const response = await axios.get(`${URL}/feed/`)
  data = await formatFeed.formatFeed(response.data)

  setTimeout(() => readRSS(), 60 * 60 * 1000)
}

const getFeed = () => {
  return data
}

module.exports = {
  getFeed,
  readRSS
}
