import React from 'react'

export default function Quality({ color, name, _id }) {
  
  return (
    <span className={"badge m-1 bg-" + color}>{name}</span>
  )
}
