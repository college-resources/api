/* eslint-disable no-undef */

const mongoose = require('mongoose')
const supertest = require('supertest')

jest.mock('../graphql/schema')
const app = require('../server')
const request = supertest(app)

beforeAll(async () => {
  await mongoose.connect(
    global.__MONGO_URI__,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    },
    (err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
    }
  )
})

afterAll(async () => {
  await mongoose.disconnect()
})

test('fetch lessons', async (done) => {
  request
    .post('/graphql')
    .send({
      query: '{ lessons { _id name} }'
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.data.lessons.length).toEqual(0)
      done()
    })
})
