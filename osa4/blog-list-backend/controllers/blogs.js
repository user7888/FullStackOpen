const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response, next) => {
  const muuttuja = await Blog.find({})
  response.json(muuttuja)
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
  
  try { 
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    console.log(exception)
    next(exception)
  }
  })

module.exports = blogsRouter
