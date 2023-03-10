import React from 'react'
import PropTypes from 'prop-types'

export default function Quality({ color, name }) {
  return <span className={'badge m-1 bg-' + color}>{name}</span>
}

Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
