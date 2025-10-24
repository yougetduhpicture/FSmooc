// tests/totalLikes.test.js
const { test, describe } = require('node:test')
const assert = require('node:assert')
const { totalLikes } = require('../utils/totalLikes')

describe('total likes', () => {
  const blogs = [
    { likes: 7 },
    { likes: 5 },
    { likes: 12 },
    { likes: 10 },
    { likes: 0 },
    { likes: 2 },
  ]

  test('when list has multiple blogs, equals the sum of likes', () => {
    const result = totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})
