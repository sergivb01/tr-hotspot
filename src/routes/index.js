const express = require('express')

const router = express.Router()

router.use('/', require('./default'))
router.use('/guest', require('./guest'))
router.use('/auth', require('./auth'))
router.use('/api/v1', require('./api'))

module.exports = router
