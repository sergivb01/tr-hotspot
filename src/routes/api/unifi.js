const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    error: false,
    message: 'Successfuly fetched general Unifi data.',
    data: {
      connected_users: 1250,
      total_users: 2826,
      most_connected_ap: 'Q7'
    }
  })
})

const getRnd = () => {
  let data = []
  for (let i = 0; i < 15; i++) data[i] = Math.floor(Math.random() * 700) + 1

  return data
}

router.get('/aps', (req, res) => {
  res.send({
    error: false,
    message: 'Successfuly fetched list of Access Points.',
    data: {
      'planta-0-nou': getRnd(),
      'planta-1-nou': getRnd(),
      'planta-2-nou': getRnd(),
      'planta-3-nou': getRnd(),

      'planta-0-vell': getRnd(),
      'planta-1-vell': getRnd(),
      'planta-2-vell': getRnd()
    }
  })
})

module.exports = router
