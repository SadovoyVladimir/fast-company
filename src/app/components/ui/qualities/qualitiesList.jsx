import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

export default function QualitiesList({ qualitiesId }) {
  const { isLoading, getQualities } = useQualities()
  const qualities = qualitiesId.map(getQualities)

  return (
    <>
      {!isLoading
        ? qualities.map((quality) => <Quality key={quality._id} {...quality} />)
        : 'Loading...'}
    </>
  )
}

QualitiesList.propTypes = {
  qualitiesId: PropTypes.array.isRequired
}
