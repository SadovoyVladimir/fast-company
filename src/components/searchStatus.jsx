import React from 'react'
import PropTypes from 'prop-types'

export default function SearchStatus({ length }) {
  const renderPhrase = (number) => {
    return number % 10 > 1 &&
      number % 10 < 5 &&
      (Math.floor(number % 100) < 10 || Math.floor(number % 100) > 20)
      ? 'человека тусанут'
      : 'человек тусанет'
  }

  return (
    <h2>
      <span
        className={'badge m-2 p-2 ' + (length > 0 ? 'bg-primary' : 'bg-danger')}
      >
        {length > 0
          ? `${length} ${renderPhrase(length)} с тобой сегодня`
          : 'Никто с тобой не тусанет'}
      </span>
    </h2>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
}
