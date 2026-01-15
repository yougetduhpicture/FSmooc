const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})

// Create a new blog
blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

// Delete a blog

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    console.log('DELETE id:', request.params.id)
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    console.error('DELETE error:', error)
    next(error)
  }
})
// Update a blog
blogsRouter.put('/:id', async (request, response, next) => {
  try {
   
  await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.status(200).end()
     console.log('update body:', request.body)
    } catch (error) {
    console.error('UPDATE error:', error)
    next(error)
  }
})
 
module.exports = blogsRouter
