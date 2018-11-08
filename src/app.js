require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const middlewares = require('./middlewares')
const api = require('./api')
const feedFetcher = require('./utils/feedFetcher')

const app = express()

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(helmet())

app.use(middlewares.blockPageHandler)

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  })
})

app.use('/api/v1', api)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

feedFetcher.readRSS()

module.exports = app
