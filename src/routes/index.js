const express = require('express')

const router = express.Router()

router.use('/', require('./default'))
router.use('/api/v1', require('./api'))

module.exports = router
