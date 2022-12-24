import React, { useState } from "react"
import api from "../api"

export default function Users() {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const renderPhrase = number => {
    return number % 10 > 1 && number % 10 < 5 && (Math.floor(number % 100) < 10 || Math.floor(number % 100) > 20) 
      ? 'человека тусанут' 
      : 'человек тусанет'
  }
  
  return (
    <>
      <h2>
        <span className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}>
          {users.length > 0 
            ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня` 
            : "Никто с тобой не тусанет"
          }
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th className="user-names" scope="col">Имя</th>
              <th className="user-qualities" scope="col">Качества</th>
              <th className="user-professions" scope="col">Профессия</th>
              <th className="user-meetings" scope="col">Встретился, раз</th>
              <th className="user-rates" colSpan="2" scope="col">Оценка</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.qualities.map(quality => (
                    <span className={"badge m-1 bg-" + quality.color} key={quality._id}>{quality.name}</span>
                  ))
                }</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDelete(user._id)}
                  >delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
