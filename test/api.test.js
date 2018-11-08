/* global describe it */
/* eslint-disable no-return-assign */
const request = require('supertest')

const app = require('../src/app')

describe('Check API returns', () => {
  it('responds with a json message', done => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done)
  })

  it('responds with formatted data', done => {
    request(app)
      .get('/api/v1/wp')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => res.body.error = false)
      .end(done)
  })
})
