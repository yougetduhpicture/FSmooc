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


test('posting user with too short password returns 400', async () => {
  const newUser = {
    username: 'newuser',
    password: 'se',
    name: 'New User',
  }

  const postResponse = await api.post('/api/users').send(newUser)
  assert.strictEqual(postResponse.status, 400)
})

after(async () => {
  await mongoose.connection.close()
})
