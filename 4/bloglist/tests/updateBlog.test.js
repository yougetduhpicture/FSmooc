const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { url } = require('inspector')

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


test('update works and returns 200', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const updatedBlog = {
        title: 'Updated Title',
        author: 'Test Author',
        url: 'http://updatedurl.com',
        likes: 4,
            }

    const updateResponse = await api
      .put(`/api/blogs/${blogsAtStart.body[0].id}`)
      .send(updatedBlog)
    assert.strictEqual(updateResponse.status, 200)

    const blogsAtEnd =  await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body[0].title, updatedBlog.title)
})

after(async () => {
  await mongoose.connection.close()
})
