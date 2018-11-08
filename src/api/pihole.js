const express = require('express')
const axios = require('axios')

const router = express.Router()
const BASE_URL = 'http://' + (process.env.PIHOLE_DOMAIN || 'localhost') + '/admin/api.php?auth=' + process.env.PIHOLE_TOKEN

router.get('/', async (req, res) => {
  const response = await axios.get(`${BASE_URL}&summaryRaw`)

  res.send({
    error: false,
    message: 'Successfuly fetched summary data',
    data: response.data
  })
})

router.get('/querytypes', async (req, res) => {
  const response = await axios.get(`${BASE_URL}&getQueryTypes`)

  res.send({
    error: false,
    message: 'Successfuly fetched total of query types',
    data: response.data
  })
})

router.get('/topitems', async (req, res) => {
  const response = await axios.get(`${BASE_URL}&topItems=25`)

  res.send({
    error: false,
    message: 'Successfuly fetched list of top items',
    data: response.data
  })
})

router.get('/recent', async (req, res) => {
  const response = await axios.get(`${BASE_URL}&recentBlocked`)

  res.send({
    error: false,
    message: 'Successfuly fetched the lastest query',
    data: response.data
  })
})

module.exports = router
