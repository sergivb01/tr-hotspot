const app = require('./app')

const port = process.env.PORT || 80

app.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Listening: http://localhost:${port}`)
})