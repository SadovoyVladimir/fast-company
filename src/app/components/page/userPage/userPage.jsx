import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../ui/qualities'
import { useHistory } from 'react-router-dom'

export default function UserPage({ userId }) {
  const history = useHistory()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
  }, [])

  const handleClick = () => {
    history.push(history.location.pathname + '/edit')
  }

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <h3>completedMeetings: {user.completedMeetings}</h3>
        <h1>Rate: {user.rate}</h1>
        <button onClick={handleClick}>Изменить</button>
      </div>
    )
  }
  return <h1>Loading</h1>
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}
