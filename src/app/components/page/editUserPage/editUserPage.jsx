import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useAuth } from '../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {
  getQualities,
  getQualitiesLoadingStatus
} from '../../../store/qualities'
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions'

export default function EditUserPage() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const { currentUser, updateUser } = useAuth()
  const qualities = useSelector(getQualities())
  const qualLoading = useSelector(getQualitiesLoadingStatus())
  const professions = useSelector(getProfessions())
  const profLoading = useSelector(getProfessionsLoadingStatus())
  const [profOptions, setProfOptions] = useState([])
  const [qualOptions, setQualOptions] = useState([])

  const userProfession = professions.find(
    (p) => p._id === currentUser.profession
  )
  const userQualities = currentUser.qualities.map((id) =>
    qualities.find((q) => q._id === id)
  )
  const [errors, setErrors] = useState({})

  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }))
  }

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя'
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return !Object.keys(errors).length
  }
  const isValid = !Object.keys(errors).length

  useEffect(() => {
    setIsLoading(true)
    if (!profLoading && !qualLoading && currentUser && !data) {
      setData((prevState) => ({
        ...prevState,
        ...currentUser,
        qualities: transformData(userQualities),
        profession: userProfession._id
      }))
      setProfOptions(
        professions.map((prof) => ({
          label: prof.name,
          value: prof._id
        }))
      )
      setQualOptions(
        qualities.map((qual) => ({
          label: qual.name,
          value: qual._id,
          color: qual.color
        }))
      )
    }
  }, [profLoading, qualLoading, currentUser, data])

  useEffect(() => {
    if (data?._id) setIsLoading(false)
    validate()
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      await updateUser({
        ...data,
        qualities: data.qualities.map((q) => q.value)
      })
      history.replace(`/users/${data._id}`)
    } catch (error) {
      setErrors(error)
    }
  }

  return (
    <div className='container mt-5'>
      <BackHistoryButton />
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label='Имя'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label='Электронная почта'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label='Выберите свою профессию'
                name='profession'
                options={profOptions}
                onChange={handleChange}
                value={data.profession}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
                label='Выберите ваш пол'
              />
              <MultiSelectField
                options={qualOptions}
                onChange={handleChange}
                defaultValue={data.qualities}
                name='qualities'
                label='Выберите ваши качества'
              />
              <button
                disabled={!isValid}
                className='btn btn-primary w-100 mx-auto'
              >
                Обновить
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}
