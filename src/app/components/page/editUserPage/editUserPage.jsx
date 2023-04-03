import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useQualities } from '../../../hooks/useQualities'
import { useProfessions } from '../../../hooks/useProfession'
import { useUsers } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'

export default function EditUserPage() {
  const { userId } = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  })
  const { isLoading: qualLoading, qualities, getQuality } = useQualities()
  const { isLoading: profLoading, professions, getProfession } = useProfessions()
  const { getUserById } = useUsers()
  const { updateUser } = useAuth()
  const [profOptions, setProfOptions] = useState([])
  const [qualOptions, setQualOptions] = useState([])
  const user = getUserById(userId)

  const userProfession = getProfession(user.profession)
  const userQualities = user.qualities.map((q) => getQuality(q))
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
    setData((prevState) => ({
      ...prevState,
      ...user,
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
  }, [])

  // useEffect(() => {
  //   console.log('from here', professions, qualities)
  //   setData((prevState) => ({
  //     ...prevState,
  //     ...user,
  //     qualities: transformData(userQualities),
  //     profession: userProfession._id
  //   }))
  // }, [professions, qualities])

  useEffect(() => {
    if (data._id) setIsLoading(false)
    validate()
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      await updateUser(userId, {
        ...data,
        qualities: data.qualities.map(q => q.value)
      })
      history.replace(`/users/${data._id}`)
    } catch (error) {
      setErrors(error)
      console.log('error: ', error)
    }
  }

  console.log('loading', isLoading)
  console.log('qualloading', qualLoading)
  console.log('profloading', profLoading)

  return (
    <div className='container mt-5'>
      <BackHistoryButton />
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {!isLoading && !qualLoading && !profLoading && Object.keys(professions).length > 0 ? (
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
