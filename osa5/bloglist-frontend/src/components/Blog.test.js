import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
// run tests: CI=true npm test

test('blog title & author are rendered, url & likes are not', () => {
  const blog  = {
    title: 'Title of blog',
    author: 'Author',
    url: 'www.pagename.com',
    likes: 5
  }

  render(
    <Blog blog={blog} />
  )
  // prints the html
  //screen.debug()

  const titleElement = screen.getByText('Title of blog', { exact: false })
  const authorElement = screen.getByText('Author', { exact: false })
  const urlElement = screen.queryByText('www.pagename.com', { exact: false })
  const likesElement = screen.queryByText('5', { exact: false })

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('url & likes are displayed after view-button is pressed', async () => {
  const blog  = {
    title: 'Title of blog',
    author: 'Author',
    url: 'www.pagename.com',
    likes: 5
  }

  render(
    <Blog blog={blog}/>
  )

  // getByRole can be used to query a specific element
  // if multiple elements with the same role are
  // presented on the screen.
  const button = screen.getByRole('button', {
    name: /view/i
  })
  userEvent.click(button)

  const urlElement = screen.queryByText('www.pagename.com', { exact: false })
  const likesElement = screen.queryByText('5', { exact: false })

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('amount of likes increases when like button is pressed', async () => {
  const blog  = {
    title: 'Title of blog',
    author: 'Author',
    url: 'www.pagename.com',
    likes: 5
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} handleLikeButton={mockHandler}/>
  )

  const viewButton = screen.getByRole('button', {
    name: /view/i
  })
  userEvent.click(viewButton)

  const likeButton = screen.getByRole('button', {
    name: /like/i
  })
  userEvent.click(likeButton)
  userEvent.click(likeButton)

  const likesElement = screen.queryByText('Likes 2', { exact: false })
  expect(likesElement).toBeDefined()
})