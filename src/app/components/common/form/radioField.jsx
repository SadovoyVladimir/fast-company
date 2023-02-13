import React from 'react'
import PropTypes from 'prop-types'

export default function RadioField({ options, name, onChange, value, label }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  return (
    <div className='mb-4'>
      <label className='form-label'>{label}</label>
      <div>
        {options.map((option) => (
          <div
            key={option.name + '_' + option.value}
            className='form-check form-check-inline'
          >
            <input
              className='form-check-input'
              type='radio'
              name={name}
              id={option.name + '_' + option.value}
              checked={option.value === value}
              value={option.value}
              onChange={handleChange}
            />
            <label
              className='form-check-label'
              htmlFor={option.name + '_' + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

RadioField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array
}
