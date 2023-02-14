import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Login from './layouts/login'
import Main from './layouts/main'

export default function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/users/:userId?/:edit?' component={Users} />
        <Route path='/login/:type?' component={Login} />
        <Route path='/' exact component={Main} />
        <Redirect to='/' />
      </Switch>
    </>
  )
}
