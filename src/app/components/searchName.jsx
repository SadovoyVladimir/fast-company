import React from 'react'
import PropTypes from 'prop-types'

export default function SearchName({ name, onChange, value }) {
  return (
    <input
      type='text'
      placeholder='Search...'
      value={value}
      name={name}
      onChange={onChange}
    />
  )
}

SearchName.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}
