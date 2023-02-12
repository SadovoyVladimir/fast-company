import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'

export default function QualitiesList({ qualities }) {
  return (
    <>
      {qualities.map((quality) => (
        <Quality key={quality._id} {...quality} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
}
