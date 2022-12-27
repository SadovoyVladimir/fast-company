import React from 'react'
import PropTypes from 'prop-types'

export default function Bookmark({ status, onToggleBookmark, id }) {
  return (
    <button onClick={() => onToggleBookmark(id)}>
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
    </button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
}
