import React, { useState } from 'react'
import Pagination from './pagination'
import User from './user'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'

export default function Users({ users, ...rest }) {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const userCrop = paginate(users, currentPage, pageSize)

  return (
    <>
      {count > 0 && (
        <table className='table'>
          <thead>
            <tr>
              <th className='user-names' scope='col'>
                Имя
              </th>
              <th className='user-qualities' scope='col'>
                Качества
              </th>
              <th className='user-professions' scope='col'>
                Профессия
              </th>
              <th className='user-meetings' scope='col'>
                Встретился, раз
              </th>
              <th className='user-rates' scope='col'>
                Оценка
              </th>
              <th className='user-favorites' scope='col'>
                Избранное
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User key={user._id} user={user} rest={rest} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  rest: PropTypes.object
}
