import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useDispatch, useSelector } from 'react-redux'
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities'

export default function QualitiesList({ qualitiesId }) {
  const dispatch = useDispatch()
  const isLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualitiesId))

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  if (isLoading) return 'Loading...'

  return (
    <>
      {qualitiesList.map((qual) => (
        <Quality key={qual._id} {...qual} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualitiesId: PropTypes.array.isRequired
}
