import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes, { oneOfType } from 'prop-types'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({
  component: Component,
  children,
  ...rest
}) {
  const { currentUser } = useAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
        if ({ ...props }.match.params.edit && { ...props }.match.params.userId !== currentUser._id) {
          return (
            <Redirect to={`/users/${currentUser._id}/edit`} />
          )
        }
        return Component ? <Component {...props} /> : children
      }}
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
