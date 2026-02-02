import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'

// Composant pour créer un nouveau post via un formulaire
export default function CreatePost() {
  // États locaux pour chaque champ du formulaire
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')

  // Permet d'invalider/refetch la liste des posts après création
  const queryClient = useQueryClient()

  // Mutation pour créer un post via l'API
  const createPostMutation = useMutation({
    // Fonction appelée lors de la mutation (requête POST)
    mutationFn: () =>
      createPost({
        title,
        author,
        contents,
        // Les tags sont transformés en tableau à partir d'une chaîne séparée par des virgules
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    // Callback appelée en cas de succès
    onSuccess: () => {
      // Réinitialise les champs du formulaire
      setTitle('')
      setAuthor('')
      setContents('')
      setTags('')
      // Invalide la query 'posts' pour rafraîchir la liste
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate() // Lance la mutation
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Champ titre */}
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
      {/* Champ auteur */}
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
      {/* Champ tags */}
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
      {/* Champ contenu */}
      <label htmlFor='contents'>Contents :</label>
      <textarea
        name='contents'
        id='contents'
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      {/* Bouton de soumission */}
      <input
        type='submit'
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title || createPostMutation.isPending}
      />
      {/* Message de succès après création */}
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}
