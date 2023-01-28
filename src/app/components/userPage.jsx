import React, { useState, useEffect } from 'react'
import api from '../api'
import PropTypes from 'prop-types'
import QualitiesList from './qualitiesList'
import { Link } from 'react-router-dom'

export default function UserPage({ id }) {
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data))
  }, [])

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <h3>completedMeetings: {user.completedMeetings}</h3>
        <h1>Rate: {user.rate}</h1>
        <Link to='/users'>
          <button>Все пользователи</button>
        </Link>
      </div>
    )
  }
  return <h1>Loading</h1>
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired
}
