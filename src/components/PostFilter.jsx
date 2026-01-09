import React from 'react'
import PropTypes from 'prop-types'

export default function PostFilter({ field }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>{field}: </label>
      <input
        type='text'
        name={`filter-${field}`}
        id={`filter-${field}`}
      />
    </div>
  )
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
}
