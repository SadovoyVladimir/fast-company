import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'

export default function App() {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const handleToggleBookmark = id => {
    setUsers(users.map(user => (user._id === id 
      ? {...user, bookmark: !user.bookmark}
      : user)))
  }

  return (
    <div>
      <SearchStatus length={users.length}/>
      <Users users={users} onDelete={handleDelete} onToggleBookmark={handleToggleBookmark} />
    </div>
  )
}
