import React from 'react'
import PropTypes from 'prop-types'

export default function Quality({ _id, color, name }) {
  return <span className={'badge m-1 bg-' + color}>{name}</span>
}

Quality.propTypes = {
  _id: PropTypes.string.isRequired,
  color: PropTypes.string,
  name: PropTypes.string
}
