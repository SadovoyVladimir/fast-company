import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import User from './user'
import api from '../api'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import SearchStatus from './searchStatus'

export default function Users({ users: allUsers, ...rest }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const pageSize = 4
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  const filteredUsers = selectedProf
    ? allUsers.filter((user) => user.profession === selectedProf)
    : allUsers

  const count = filteredUsers.length

  const userCrop = paginate(filteredUsers, currentPage, pageSize)

  return (
    <div className='d-flex'>
      {professions && (
        <div className='d-flex flex-column flex-shrink-0 p-3'>
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className='btn btn-secondary mt-2' onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className='d-flex flex-column'>
        <SearchStatus length={count} />
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
                <User key={user._id} {...rest} {...user} />
              ))}
            </tbody>
          </table>
        )}
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array
}