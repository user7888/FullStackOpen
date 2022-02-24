import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
// run tests: CI=true npm test

test('blog title & author are rendered, url & likes are not', () => {
  const blog  = {
    title: 'Title of blog',
    author: 'Author',
    url: 'www.pagename.com',
    likes: 5
  }

  render(<Blog blog={blog} />)
  screen.debug()

  const titleElement = screen.getByText('Title of blog', { exact: false })
  const authorElement = screen.getByText('Author', { exact: false })
  const urlElement = screen.queryByText('www.pagename.com', { exact: false })
  const likesElement = screen.queryByText('5', { exact: false })

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})