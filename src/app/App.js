import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Login from './layouts/login'
import Main from './layouts/main'
import Logout from './layouts/logout'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
  }, [])
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Switch>
          <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
          <Route path='/login/:type?' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={Main} />
          <Redirect to='/' />
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}
