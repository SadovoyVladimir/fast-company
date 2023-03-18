import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import qualitiesService from '../services/qualities.service'
import { toast } from 'react-toastify'

const QualitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState([])

  useEffect(() => {
    getQualitiessList()
  }, [])

  useEffect(() => {
    if (error) {
      toast(error)
      setError(null)
    }
  }, [error])

  function getQualities(id) {
    return qualities.find((q) => q._id === id)
  }

  async function getQualitiessList() {
    try {
      const { content } = await qualitiesService.get()
      setQualities(content)
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
    <QualitiesContext.Provider value={{ isLoading, qualities, getQualities }}>
      {children}
    </QualitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
