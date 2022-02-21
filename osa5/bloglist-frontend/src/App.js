import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
//undefined is not iterable  [] => ()

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const blogsSorted = blogs.sort( compareFunction ).reverse()
      setBlogs( blogsSorted )
    })
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
      notifications(`User ${user.name} logged in`)
    } catch (exception) {
      console.log('error..', exception)
      notifications(`wrong username or password`)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    notifications(`Logged out`)
  }

  const handleAddBlog = async ( blogObject ) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notifications(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      console.log('error...', exception)
    }
  }

  const handleLikeButton = async ( blogObject ) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      // Key error axios .put
      // state update -> Blog component refresh render -> unique key error
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      notifications(`added a new like for blog ${updatedBlog.title} by ${updatedBlog.author}`)
    } catch (exception) {
      console.log('error...', exception)
    }
  }

  const compareFunction = (a, b) => {
    if (a.likes < b.likes) {
      return -1
    }
    if (a.likes > b.likes) {
      return 1
    }
    return 0
  }

  const loginForm = () => (
    <div className="loginformstyle">
    <Notification message={notification}/>
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

  // vaihto {} => ()
  const createBlogForm = () => (
    <Toggleable buttonLabel='create'>
      <BlogForm handleAddBlog={handleAddBlog}/>
    </Toggleable>
  )

  const notifications = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 2500)
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <div className="loginformstyle">
          <Notification message={notification}/>
          <h2>blogs</h2>
          <div>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            {createBlogForm()}
          </div>
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikeButton={handleLikeButton}/>
      )}
    </div>
  )
}

export default App