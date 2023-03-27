import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import qualitiesService from '../services/quality.service'
import { toast } from 'react-toastify'

const QualitiesContext = React.createContext()

export const useQualities = () => {
  return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getQualitiessList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  function getQuality(id) {
    return qualities.find((q) => q._id === id)
  }

  async function getQualitiessList() {
    try {
      const { content } = await qualitiesService.fetchAll()
      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(err) {
    const { message } = err.response.data
    setError(message)
  }

  return (
    <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
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
