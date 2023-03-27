import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureKey: true })
      setTokens(data)
      await createUser({ id: data.localId, email, ...rest })
    } catch (error) {
      const { code, message } = error.response.data.error
      errorCatcher(error)

      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObj = { email: 'Пользователь с таким Email уже сущуствует' }
          throw errorObj
        }
      }
    }
  }

  async function signIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureKey: true })
      setTokens(data)
    } catch (error) {
      const { code, message } = error.response.data.error
      errorCatcher(error)

      if (code === 400) {
        if (message === 'INVALID_PASSWORD') {
          const errorObj = { password: 'Неверный пароль' }
          throw errorObj
        } else if (message === 'EMAIL_NOT_FOUND') {
          const errorObj = { email: 'Неверный email' }
          throw errorObj
        } else if (message === 'USER_DISABLED') {
          const errorObj = { email: 'Учетная запись пользователя отключена администратором' }
          throw errorObj
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = userService.create(data)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(err) {
    const { message } = err.response.data
    setError(message)
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
      { children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
