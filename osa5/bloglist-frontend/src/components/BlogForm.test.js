import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm passes correct values to callback function', () => {
  const handleAddBlog = jest.fn()

  render(<BlogForm handleAddBlog={handleAddBlog}/>)

  const titleInput = screen.getByPlaceholderText('Title..')
  const authorInput = screen.getByPlaceholderText('Author..')
  const urlInput = screen.getByPlaceholderText('Url..')
  const createButton = screen.getByRole('button', {
    name: /create/i
  })

  userEvent.type(titleInput, 'test title' )
  userEvent.type(authorInput, 'test author' )
  userEvent.type(urlInput, 'www.test.com' )
  userEvent.click(createButton)
  screen.debug()

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].title).toBe('test title' )
  expect(handleAddBlog.mock.calls[0][0].author).toBe('test author' )
  expect(handleAddBlog.mock.calls[0][0].url).toBe('www.test.com' )



})