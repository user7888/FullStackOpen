import React, { useState } from 'react'

const Blog = ({blog}) => {
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
          Likes {blog.likes}<br/>
          {blog.author}
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