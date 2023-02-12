import React from 'react'
import PropTypes from 'prop-types'

export default function GroupList({
  selectedItem,
  items,
  valueProperty,
  contentProperty,
  onItemSelect
}) {
  if (Array.isArray(items)) {
    return (
      <ul className='list-group'>
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            className={
              'list-group-item' + (item === selectedItem ? ' active' : '')
            }
            onClick={() => onItemSelect(item)}
            role='button'
          >
            {item[contentProperty]}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className='list-group'>
      {Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          className={
            'list-group-item' + (items[item] === selectedItem ? ' active' : '')
          }
          onClick={() => onItemSelect(items[item])}
          role='button'
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  )
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}

GroupList.propTypes = {
  selectedItem: PropTypes.object,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func
}
