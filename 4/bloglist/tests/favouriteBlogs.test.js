// tests/totalLikes.test.js
const { test, describe } = require('node:test')
const assert = require('node:assert')
const { favouriteBlogs } = require('../utils/favouriteBlogs')

describe('favourite blog', () => {
  const blogs = [
    { likes: 7 },
    { likes: 5 },
    { likes: 12 },
    { likes: 10 },
    { likes: 0 },
    { likes: 2 },
  ]

  test('The blog with most likes is 12', () => {
    const result = favouriteBlogs(blogs)
    assert.deepStrictEqual(result, 12)
  })
})
