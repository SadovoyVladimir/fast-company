import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  getProfessionById,
  getProfessionsLoadingStatus
} from '../../store/professions'

export default function Profession({ id }) {
  const profession = useSelector(getProfessionById(id))
  const isLoading = useSelector(getProfessionsLoadingStatus())

  return <>{!isLoading ? <p>{profession.name}</p> : 'loading...'}</>
}

Profession.propTypes = {
  id: PropTypes.string
}
