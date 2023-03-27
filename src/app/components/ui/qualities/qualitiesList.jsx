import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

export default function QualitiesList({ qualitiesId }) {
  const { isLoading } = useQualities()

  return (
    <>
      {!isLoading
        ? qualitiesId.map((qual) => <Quality key={qual} id={qual} />)
        : 'Loading...'}
    </>
  )
}

QualitiesList.propTypes = {
  qualitiesId: PropTypes.array.isRequired
}
