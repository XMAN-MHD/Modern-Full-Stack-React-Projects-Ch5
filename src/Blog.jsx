import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import CreatePost from './components/CreatePost'
import PostFilter from './components/PostFilter'
import PostSorting from './components/PostSorting'
import { PostList } from './components/PostList'
import { getPosts } from './api/posts'
import { useDebounce } from './hooks/useDebounce'

export function Blog() {
  // **** States
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  // **** Debounce the filter value
  const debouncedAuthor = useDebounce(author) 

  const postsQuery = useQuery({
    queryKey: ['posts', { author: debouncedAuthor, sortBy, sortOrder }],
    queryFn: () => getPosts({ author: debouncedAuthor, sortBy, sortOrder }),
  })

  // Get the posts from the backend api using Tanstack
  const posts = postsQuery.data ?? []

  // Handle errors from the Tanstack postQuery
  if (postsQuery.isLoading) return <div>Loading...</div>
  if (postsQuery.error) return <div>Error: {postsQuery.error.message}</div>

  console.log(postsQuery)

  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter field="author" value={author} onChange={setAuthor} />
      <br />
      <PostSorting 
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)} 
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}