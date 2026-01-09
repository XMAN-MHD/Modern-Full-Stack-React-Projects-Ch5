import { useQuery } from '@tanstack/react-query'
import { Post } from './components/Post'
import CreatePost from './components/CreatePost'
import PostFilter from './components/PostFilter'
import PostSorting from './components/PostSorting'
import { PostList } from './components/PostList'
import { getPosts } from './api/posts'

export function Blog() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
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
      <PostFilter field='author' />
      <br />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}