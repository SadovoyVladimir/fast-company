import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Logout() {
  const { signOut } = useAuth()
  useEffect(() => {
    signOut()
  }, [])

  return <h1>Loading</h1>
}
