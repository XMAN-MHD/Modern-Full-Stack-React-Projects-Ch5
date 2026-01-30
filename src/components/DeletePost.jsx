import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '../api/posts'
import PropTypes from 'prop-types'

export default function DeletePost({ postId }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate()
    setShowConfirm(false)
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={deleteMutation.isPending}
        style={{ color: 'white', background: 'red', marginTop: 8 }}
      >
        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
      </button>
      {deleteMutation.isError && (
        <div style={{ color: 'red' }}>Erreur lors de la suppression</div>
      )}

      {/* Modale de confirmation */}
      {showConfirm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: 24,
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              minWidth: 300,
              textAlign: 'center',
            }}
          >
            <p>Are you sure you want to delete this post?</p>
            <button
              onClick={handleDelete}
              style={{ color: 'white', background: 'red', marginRight: 8 }}
              disabled={deleteMutation.isPending}
            >
              Yes, delete
            </button>
            <button onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  )
}

DeletePostButton.propTypes = {
  postId: PropTypes.string.isRequired,
}
