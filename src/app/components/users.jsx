import React, { useState, useEffect } from 'react'
import Pagination from './pagination'
import api from '../api'
import { paginate } from '../utils/paginate'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UserTable from './usersTable'
import _ from 'lodash'

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const pageSize = 4

  const [users, setUsers] = useState()
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }
  const handleToggleBookmark = (id) => {
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user
      )
    )
  }

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
  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users

    const count = filteredUsers.length
    if (currentPage > Math.ceil(count / pageSize)) {
      setCurrentPage((prevState) => --prevState)
    }
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf()
    }

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
              {' '}
              Очистить
            </button>
          </div>
        )}
        <div className='d-flex flex-column'>
          <SearchStatus length={count} />
          {count > 0 && (
            <UserTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookmark}
            />
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
  return 'loading...'
}

Users.propTypes = {
  users: PropTypes.array
}
