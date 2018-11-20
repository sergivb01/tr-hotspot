require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')

const middlewares = require('./middlewares')
const feedFetcher = require('./utils/feedFetcher')
require('./utils/passport')

const app = express()

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(helmet())

app.engine('ejs', require('ejs-blocks'))
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')
app.use('/assets', express.static(path.join(__dirname, '/../static/assets/')))

app.use(require('express-session')({
  cookie: {
    maxAge: 1800000,
    httpOnly: true
  },
  rolling: true,
  resave: true,
  saveUninitialized: true,
  secret: process.env.SECRET
}))
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true
  }),
  passport.initialize(),
  passport.session()
)

mongoose.connect(process.env.MONGO_DB, () =>
  console.info('Connected to MongoDB successfuly!')
)

app.use(middlewares.blockPageHandler)

app.use(require('./routes'))

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

feedFetcher.readRSS()
const scheduler = setInterval(() => {
  feedFetcher.readRSS()
}, 60 * 60 * 1000)
scheduler.unref()

module.exports = app
