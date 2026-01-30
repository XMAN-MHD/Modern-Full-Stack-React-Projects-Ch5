import { useState } from 'react'
import DeletePost from './DeletePost'
import { EditPost } from './EditPost'
import PropTypes from 'prop-types'

export function Post({ _id, title, contents, author, tags }) {
  const [isEditing, setIsEditing] = useState(false)


  if (isEditing) {
    return (
      <EditPost
        post={{ _id, title, contents, author, tags }}
        onClose={() => setIsEditing(false)}
      />
    )
  }

  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      <br />
      {author && (
        <em>
          Written by <strong>{author}</strong>
        </em>
      )}
      <br />
      <br />
      {Array.isArray(tags) && tags.length > 0 && (
        <em>
          Tags:{' '}
          {tags.map((tag) => (
            <em
              key={tag}
              style={{
                margin: '0 4px',
                fontStyle: 'oblique',
                background: 'lightgray',
                color: 'black',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              <strong>{tag}</strong>
            </em>
          ))}
        </em>
      )}
      <br />
      <button
        onClick={() => setIsEditing(true)}
        style={{ color: 'white', background: 'blue', marginTop: 8 }}
      >
        Edit
      </button>
      &nbsp;
      <DeletePost postId={_id} />
      <br />
      <br />
    </article>
  )
}

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}
