import React from 'react'
import PropTypes from 'prop-types'

export default function Bookmark({ status, ...rest }) {
  return (
    <button {...rest}>
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
    </button>
  )
}

Bookmark.propTypes = {
  status: PropTypes.bool
}
