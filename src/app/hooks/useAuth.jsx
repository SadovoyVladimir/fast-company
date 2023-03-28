import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, { email, password, returnSecureKey: true })
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
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, { email, password, returnSecureKey: true })
      setTokens(data)
    } catch (error) {
      const { code, message } = error.response.data.error
      errorCatcher(error)

      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD':
            throw new Error('Email или пароль введены некорректно')
          case 'EMAIL_NOT_FOUND':
            throw new Error('Email или пароль введены некорректно')
          case 'USER_DISABLED': {
            const errorObj = { email: 'Учетная запись пользователя отключена администратором' }
            throw errorObj
          }
          default:
            throw new Error('Слишком много попыток входа. Попробуйте позднее')
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
