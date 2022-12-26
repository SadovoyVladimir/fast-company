import React from 'react'
import Quality from './quality'
import Bookmark from './bookmark'

export default function User({ user, rest }) {
  
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.qualities.map(quality => (
            <Quality key={quality._id} color={quality.color} name={quality.name} _id={quality._id} />
          ))
        }</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td>
          <Bookmark status={user.bookmark} onToggleBookmark={rest.onToggleBookmark} id={user._id} />
        </td>
        <td>
          <button 
            className="btn btn-danger btn-sm" 
            onClick={() => rest.onDelete(user._id)}
          >delete</button>
        </td>
      </tr>
    </>
  )
}
