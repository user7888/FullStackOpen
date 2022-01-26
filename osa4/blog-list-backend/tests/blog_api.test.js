const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')
const { config } = require('dotenv')
// npm test -- tests/blog_api.test.js

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.type).toBe('application/json')
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the author of first blog is Michael Chan', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].author).toBe(helper.initialBlogs[0].author)
})

test('id field is named correctly', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body[0])
  expect(response.body[0].id).toBeDefined()
})

test('adding a new blog to database works correctly', async () => {
  const testBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

// tsekkaa materiaali
  await api.post('/api/blogs')
    .send(testBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  console.log(blogsAtEnd)
  console.log(helper.initialBlogs.length)
  console.log(blogsAtEnd[2])
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('ensure that value of likes is 0 even if no value was given', async () => {
 const testBlog = {
  title: "Type warsz",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  }

  await api.post('/api/blogs')
    .send(testBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[2].likes).toBe(0)
})

test('if title and url properties are missing server responds with status code 400', async () => {
  const testBlog = {
    author: "Robert C. Martin",
    likes: 2
  }
  await api.post('/api/blogs')
    .send(testBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})