import React, { useState, useEffect } from 'react'
import TextField from '../common/form/textField'
import { validator } from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

export default function LoginForm() {
  const history = useHistory()
  const [data, setData] = useState({
    email: '',
    password: '',
    stayOn: false
  })
  const { signIn } = useAuth()
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    setEnterError(null)
  }

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' }
    },
    password: {
      isRequired: { message: 'Пароль обязателен для заполнения' }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return !Object.keys(errors).length
  }

  const isValid = !Object.keys(errors).length

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    try {
      await signIn(data)
      history.push('/')
    } catch (error) {
      error.message ? setEnterError(error.message) : setErrors(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Электронная почта'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Пароль'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>
        Оставаться в системе
      </CheckBoxField>
      {enterError && <p className='text-danger'>{enterError}</p>}
      <button disabled={!isValid || enterError} className='btn btn-primary w-100 mx-auto'>
        Submit
      </button>
    </form>
  )
}
