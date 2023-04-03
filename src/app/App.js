import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Login from './layouts/login'
import Main from './layouts/main'
import Logout from './layouts/logout'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'

export default function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
              <Route path='/login/:type?' component={Login} />
              <Route path='/logout' component={Logout} />
              <Route path='/' exact component={Main} />
              <Redirect to='/' />
            </Switch>
          </QualitiesProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}
