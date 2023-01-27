import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Users from './layouts/users'
import NavBar from './components/navBar'
import Login from './layouts/login'
import Main from './layouts/main'

export default function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:userId?' component={Users} />
      </Switch>
    </>
  )
}
