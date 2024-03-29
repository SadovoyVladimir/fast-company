import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/usersTable'
import Pagination from '../../common/pagination'
import { paginate } from '../../../utils/paginate'
import { useSelector } from 'react-redux'
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions'
import { getCurrentUserId, getUsersList } from '../../../store/users'

export default function UsersListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const currentUserId = useSelector(getCurrentUserId())
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const pageSize = 4
  const [searchQuery, setSearchQuery] = useState('')

  const users = useSelector(getUsersList())

  const handleDelete = (userId) => {
    // setUsers(users.filter((user) => user._id !== userId))
    console.log(userId)
  }
  const handleToggleBookmark = (id) => {
    // setUsers(
    //   users.map((user) =>
    //     user._id === id ? { ...user, bookmark: !user.bookmark } : user
    //   )
    // )
    console.log(id)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, searchQuery])

  const handleProfessionSelect = (item) => {
    if (searchQuery !== '') setSearchQuery('')
    setSelectedProf(item)
  }
  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined)
    setSearchQuery(target.value)
  }
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }

  if (users) {
    function filterUsers(data) {
      const filteredUsers = searchQuery
        ? data.filter(
            (user) =>
              user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
          )
        : selectedProf
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : data

      return filteredUsers.filter((u) => u._id !== currentUserId)
    }

    const filteredUsers = filterUsers(users)

    const count = filteredUsers.length
    if (currentPage > Math.ceil(count / pageSize) && currentPage !== 1) {
      setCurrentPage((prevState) => --prevState)
    }
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
      setSelectedProf()
    }

    return (
      <div className='d-flex'>
        {professions && !professionsLoading && (
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
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            name='searchQuery'
            onChange={handleSearchQuery}
          />
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
