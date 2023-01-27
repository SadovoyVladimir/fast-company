import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Link } from 'react-router-dom'

export default function TableBody({ data, columns, url }) {
  const renderContent = (item, column) => {
    const component = columns[column].component
    if (component) {
      if (typeof component === 'function') {
        return component(item)
      }
      return component
    }
    if (columns[column].link) {
      return (
        <Link to={'/' + (url ? url + '/' : '') + item._id}>
          {_.get(item, columns[column].path)}
        </Link>
      )
    }
    return _.get(item, columns[column].path)
  }

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderContent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  url: PropTypes.string
}
