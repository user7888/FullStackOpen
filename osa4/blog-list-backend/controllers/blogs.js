const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response, next) => {
  const muuttuja = await Blog.find({})
  response.json(muuttuja)
})
/*
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
*/


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  try { 
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    console.log(exception)
    next(exception)
  }
})

/*
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
*/

module.exports = blogsRouter
