import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes, { oneOfType } from 'prop-types'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

export default function ProtectedRoute({
  component: Component,
  children,
  ...rest
}) {
  const isLoggedIn = useSelector(getIsLoggedIn())
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
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
