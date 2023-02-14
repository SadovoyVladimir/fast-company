import React from 'react'
import PropTypes from 'prop-types'
import Qualities from '../../ui/qualities'
import { Link } from 'react-router-dom'

export default function UserPage({ user, id }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      <Qualities qualities={user.qualities} />
      <h3>completedMeetings: {user.completedMeetings}</h3>
      <h1>Rate: {user.rate}</h1>
      <Link to={'/users/' + id + '/edit'}>
        <button>Изменить</button>
      </Link>
    </div>
  )
}

UserPage.propTypes = {
  user: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}
