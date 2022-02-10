import React from 'react'

const CreateBlogForm = ({
  handleAddBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddBlog} noValidate={true}>
        <div>
          title:
          <input
          type="title"
          value={title}
          name="Title"
          onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
          type="author"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
          type="url"
          value={url}
          name="Url"
          onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm