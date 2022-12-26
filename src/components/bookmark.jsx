import React from 'react'

export default function Bookmark({ status, onToggleBookmark, id }) {
  
  return (
    <button onClick={() => onToggleBookmark(id)}>
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')} ></i>
    </button>
  )
}
