import React from 'react'
import PropTypes from 'prop-types'

export default function TextAreaField({ label, value, name, onChange, error }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }

  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group has-validation'>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  )
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}
