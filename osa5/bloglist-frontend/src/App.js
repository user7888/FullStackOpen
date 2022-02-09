import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
//undefined is not iterable  [] => ()
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // aiheuttaa uudelleen renderöinnin ja efektin suorituksen
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      console.log('print in handleLogin:', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error..', exception)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      setBlogs(blogs.concat(newBlog))
    } catch (exception) {
      console.log('error...', exception)
    }
  }

  const loginForm = () => (
    <div>
    <h2>login to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>      
  )

  const createBlogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog} noValidate={true}>
        <div>
          title:
          <input
          type="title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
          type="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
          type="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <div>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <div>
              {createBlogForm()}
            </div>
          </div>
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App