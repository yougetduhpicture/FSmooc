const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {

    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})


test('posting a blog increases amount by one and returns correct format', async () => {
  const newBlog = {
    title: 'New Blog for Testing',
    author: 'Test Author',
    url: 'http://example.com/test-blog',
    likes: 4,
  }

  const beforeResponse = await api.get('/api/blogs')
  const beforeCount = beforeResponse.body.length

  const postResponse = await api.post('/api/blogs').send(newBlog)
  assert.strictEqual(postResponse.status, 201)
  const saved = postResponse.body

  // returned blog should have id (string) and not _id or __v
  assert.ok(saved.id, 'saved blog missing id')
  assert.strictEqual(typeof saved.id, 'string')
  assert.strictEqual(saved._id, undefined)
  assert.strictEqual(saved.__v, undefined)

  // returned contents should match what we sent (except id)
  assert.strictEqual(saved.title, newBlog.title)
  assert.strictEqual(saved.author, newBlog.author)
  assert.strictEqual(saved.url, newBlog.url)
  assert.strictEqual(saved.likes, newBlog.likes)

  const afterResponse = await api.get('/api/blogs')
  const afterCount = afterResponse.body.length
  assert.strictEqual(afterCount, beforeCount + 1)

  // verify the new blog is present by title
  const titles = afterResponse.body.map((b) => b.title)
  assert.ok(titles.includes(newBlog.title))
})

after(async () => {
  await mongoose.connection.close()
})
