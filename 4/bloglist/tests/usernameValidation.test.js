const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})


test('posting user with too short username returns 400', async () => {
  const newUser = {
    username: 'ne',
    password: 'securePassword',
    name: 'New User',
  }
  const preResponse = await api.get('/api/users')

  const postResponse = await api.post('/api/users').send(newUser)
  assert.strictEqual(postResponse.status, 400)
  console.log(postResponse.body)

  const afterResponse = await api.get('/api/users')

    assert.strictEqual(preResponse.body.length, afterResponse.body.length)
})

after(async () => {
  await mongoose.connection.close()
})
