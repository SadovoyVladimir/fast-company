import React, { useState, useEffect } from 'react'
import api from '../../../api'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import UserEditPage from '../userEditPage'
import UserPage from './userPage'

export default function UserRoute({ id }) {
  const [user, setUser] = useState()
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data))
  })

  if (user) {
    return (
      <Switch>
        <Route
          path={'/users/' + id + '/edit'}
          render={() => <UserEditPage user={user} id={id} />}
        />
        <Route
          path={'/users/' + id}
          render={() => <UserPage user={user} id={id} />}
        />
      </Switch>
    )
  }
  return <h1>Loading</h1>
}

UserRoute.propTypes = {
  id: PropTypes.string.isRequired
}
