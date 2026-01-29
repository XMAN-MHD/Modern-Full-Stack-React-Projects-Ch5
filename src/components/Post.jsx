import PropTypes from 'prop-types'

export function Post({ title, contents, author, tags }) {
  console.log('Rendering Post Tags:', tags)
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      <br />
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
      <br />
      {Array.isArray(tags) && tags.length > 0 && (
        <em>
          <br />
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
      <br />
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}