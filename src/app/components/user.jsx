import React from 'react'
import Quality from './quality'
import Bookmark from './bookmark'
import PropTypes from 'prop-types'

export default function User({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggleBookmark
}) {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>
          {qualities.map((quality) => (
            <Quality key={quality._id} {...quality} />
          ))}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate}/5</td>
        <td>
          <Bookmark status={bookmark} onClick={() => onToggleBookmark(_id)} />
        </td>
        <td>
          <button
            className='btn btn-danger btn-sm'
            onClick={() => onDelete(_id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  )
}

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
}
