import React from 'react'
import User from './user'

export default function Users({ users, ...rest }) {

  return (
    <>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th className="user-names" scope="col">Имя</th>
              <th className="user-qualities" scope="col">Качества</th>
              <th className="user-professions" scope="col">Профессия</th>
              <th className="user-meetings" scope="col">Встретился, раз</th>
              <th className="user-rates" scope="col">Оценка</th>
              <th className="user-favorites" scope="col">Избранное</th>
              <th className="user-delete" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <User key={user._id} user={user} rest={rest} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
