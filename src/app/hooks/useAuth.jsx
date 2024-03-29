import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import userService from '../services/user.service'
import localStorageService, {
  setTokens
} from '../services/localStorage.service'

export const httpAuth = axios.create({
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
  const [currentUser, setCurrentUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const history = useHistory()

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function signOut() {
    localStorageService.removeAuthData()
    setCurrentUser(null)
    history.push('/')
  }

  async function updateUser(data) {
    try {
      const { content } = await userService.update(data)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })
    } catch (error) {
      const { code, message } = error.response.data.error
      errorCatcher(error)

      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObj = {
            email: 'Пользователь с таким Email уже сущуствует'
          }
          throw errorObj
        }
      }
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await getUserData()
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
            const errorObj = {
              email: 'Учетная запись пользователя отключена администратором'
            }
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
      const { content } = await userService.create(data)
      console.log(content)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(err) {
    const { message } = err.response.data
    setError(message)
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser()
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, updateUser, currentUser }}
    >
      {!isLoading ? children : 'Loading...'}
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
