const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/user')

const api = supertest(app)

const initialUsers = [
  
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})


test('posting a blog increases amount by one and returns correct format', async () => {
  const newUser = {
    username: 'newuser',
    password: 'securepassword',
    name: 'New User',
  }

  const beforeResponse = await api.get('/api/users')
  const beforeCount = beforeResponse.body.length

  const postResponse = await api.post('/api/users').send(newUser)
  assert.strictEqual(postResponse.status, 201)
  const saved = postResponse.body

  const afterResponse = await api.get('/api/users')
  const afterCount = afterResponse.body.length
  assert.strictEqual(afterCount, beforeCount + 1)

  // verify the new blog is present by title
  const titles = afterResponse.body.map((b) => b.title)
  assert.ok(titles.includes(newBlog.title))
})

after(async () => {
  await mongoose.connection.close()
})
