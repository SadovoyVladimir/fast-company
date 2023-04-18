import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/users'

export default function Logout() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logOut())
  }, [])

  return <h1>Loading</h1>
}
