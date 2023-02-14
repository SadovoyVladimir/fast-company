import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import { useHistory } from 'react-router-dom'

export default function UserEditPage({ user, id }) {
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    profession: user.profession._id,
    sex: user.sex,
    qualities: user.qualities.map((quality) => {
      return { label: quality.name, value: quality._id, color: quality.color }
    })
  })
  const [qualities, setQualities] = useState([])
  const [professions, setProfessions] = useState([])
  const history = useHistory()

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionsList)
    })
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api.users.update(id, {
      ...data,
      qualities: data.qualities.map(quality => {
        return {
          _id: quality.value,
          name: quality.label,
          color: quality.color
        }
      }),
      profession: {
        _id: data.profession,
        name: professions.find(
          (profession) => profession.value === data.profession
        ).label
      }
    })
    history.replace(`users/${id}`)
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {professions.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label='Имя'
                name='name'
                value={data.name}
                onChange={handleChange}
              />
              <TextField
                label='Электронная почта'
                name='email'
                value={data.email}
                onChange={handleChange}
              />
              <SelectField
                label='Выберите свою профессию'
                name='profession'
                options={professions}
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
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name='qualities'
                label='Выберите ваши качества'
              />
              <button className='btn btn-primary w-100 mx-auto'>
                Обновить
              </button>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}

UserEditPage.propTypes = {
  user: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired
}
