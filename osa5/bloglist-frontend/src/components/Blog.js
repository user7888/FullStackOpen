import React, { useState } from 'react'

const Blog = ({ blog, user, button, handleLikeButton, handleRemoveButton }) => {
  const [showContent, setShowContent] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  const toggleVisibility = () => {
    if (showContent === false) {
      setButtonLabel('hide')
    } else if (showContent === true) {
      setButtonLabel('view')
    }

    setShowContent(!showContent)
  }

  const removeBlog = () => {
    const answer = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (answer) {
      handleRemoveButton(blog)
    } else {
      return
    }
  }

  const removeButton = () => {
    if (!user) {
      return
    } else if (blog.user.username === user.username) {
      return (
        <button onClick={removeBlog}>remove</button>
      )
    } else {
      return
    }
  }

  const updateLikes = () => {
    console.log('blog id:', blog.id)
    const updatedBlog = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    handleLikeButton(updatedBlog)
  }

  const showSimple = () => {
    return (
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
    )
  }

  const showDetailed = () => {
    return (
      <div className="blogstyle">
        <p>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button><br/>
          {blog.url}<br/>
          Likes {blog.likes} <button onClick={updateLikes}>like</button><br/>
          {blog.author}<br/>
          {removeButton()}
        </p>
      </div>
    )
  }

  return (
    <div className="blogstyle">
      {showContent === false ?
        showSimple() :
        showDetailed()
      }
    </div>
  )
}

export default Blog