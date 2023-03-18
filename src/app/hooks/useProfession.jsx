import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/profession.service'
import { toast } from 'react-toastify'

const ProfessionContext = React.createContext()

export const useProfessions = () => {
  return useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [professions, setProfessions] = useState([])
  const [error, setError] = useState([])

  useEffect(() => {
    getProfessionsList()
  }, [])

  useEffect(() => {
    if (error) {
      toast(error)
      setError(null)
    }
  }, [error])

  function getProfession(id) {
    return professions.find((p) => p._id === id)
  }

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
      setIsLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(err) {
    const { message } = err.response.data
    setError(message)
  }

  return (
    <ProfessionContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
