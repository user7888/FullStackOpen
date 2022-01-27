const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  if (body.likes === undefined) {
    blog.likes = 0
  }
// send() vs. end() (json = send)
  if (body.ttle === undefined && body.url === undefined) {
    return response.status(400).end()
  }
  
  try { 
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    console.log(exception)
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
  

module.exports = blogsRouter
