import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost({
        title,
        author,
        contents,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      setTitle('')
      setAuthor('')
      setContents('')
      setTags('')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-author'>Author: </label>
        <input
          type='text'
          name='create-author'
          id='create-author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-tags'>Tags: </label>
        <input
          type='text'
          name='create-tags'
          id='create-tags'
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder='e.g. react, nodejs, blog'
        />
      </div>
      <br />
      <label htmlFor='contents'>Contents :</label>
      <textarea
        name='contents'
        id='contents'
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}
