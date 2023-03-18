import React from 'react'
import { useProfessions } from '../../hooks/useProfession'
import PropTypes from 'prop-types'

export default function Profession({ id }) {
  const { isLoading, getProfession } = useProfessions()
  const prof = getProfession(id)

  return <>{!isLoading ? <p>{prof.name}</p> : 'loading...'}</>
}

Profession.propTypes = {
  id: PropTypes.string
}
