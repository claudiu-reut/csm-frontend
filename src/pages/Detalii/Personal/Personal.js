import React, { useState, useEffect } from 'react'
import PersonalSingle from './PersonalSingle.js'
import { Form } from 'react-bootstrap'
import { FaLongArrowAltRight } from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Personal.css'
import { GrPowerReset } from 'react-icons/gr'
import axios from '../../api/axios'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
let iconLoading = (
  <UseAnimations animation={loading} size={55} strokeColor='blue' />
)
function Jucatori() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')
  const [personal, setPersonal] = useState([])
  const [personalOrigin, setPersonalOrigin] = useState([])
  const [positions, setPositions] = useState([])
  const [positionFilter, setPositionFilter] = useState('')
  const [ageMinFilter, setAgeMinFilter] = useState('')
  const [ageMaxFilter, setAgeMaxFilter] = useState('')
  const getJucatori = async () => {
    setIsLoading(true)
    const response = await axios.get('/getpersonal')
    console.log(response)
    setPersonal(response.data)
    setPersonalOrigin(response.data)
    setIsLoading(false)
  }
  const get_all_positions = () => {
    let positions = []
    for (let i = 0; i < personal.length; i++) {
      if (!positions.includes(personal[i].post.toLowerCase())) {
        positions.push(personal[i].post.toLowerCase())
      }
    }
    setPositions(positions)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    getJucatori()
  }, [])
  useEffect(() => {
    get_all_positions()
  }, [personal])
  const filter_personal = (
    searchFilter,
    ageMinFilter,
    ageMaxFilter,
    positionFilter
  ) => {
    let result = personalOrigin
    if (searchFilter !== '') {
      result = result.filter((jucator) => {
        const numeComplet = jucator.nume + ' ' + jucator.prenume
        return searchFilter.toLowerCase() === ''
          ? jucator
          : numeComplet.toLowerCase().includes(searchFilter)
      })
    }
    if (ageMinFilter !== '') {
      result = result.filter(
        (jucator) => calcAge(jucator.data_nasterii) >= ageMinFilter
      )
    }
    if (ageMaxFilter !== '') {
      result = result.filter(
        (jucator) => calcAge(jucator.data_nasterii) <= ageMaxFilter
      )
    }
    if (positionFilter !== '') {
      result = result.filter(
        (jucator) => jucator.post.toUpperCase() === positionFilter.toUpperCase()
      )
    }
    setPersonal(result)
    window.scrollTo(0, 0)
  }
  function calcAge(data_nasterii) {
    let birthday = +new Date(data_nasterii)
    return ~~((Date.now() - birthday) / 31557600000)
  }
  return (
    <div className='container-jucatori'>
      <div className='jucatori-toolbar'>
        <div className='jucatori-toolbar-item'>
          <label htmlFor='search-player-by-name'>Search</label>
          <div>
            <Form.Control
              id='search-player-by-name'
              className='searchForm'
              onChange={(e) => {
                filter_personal(
                  e.target.value,
                  ageMinFilter,
                  ageMaxFilter,
                  positionFilter
                )
                setSearchFilter(e.target.value)
              }}
              placeholder='search by name'
            />
          </div>
        </div>
        <div className='jucatori-toolbar-item'>
          <label htmlFor='filter-player-by-age'>Age</label>
          <div className='filter-player-by-age-container'>
            <Form.Control
              type='number'
              min='8'
              max='78'
              id='filter-player-by-age-min'
              className='searchForm filter-player-age'
              value={ageMinFilter}
              onChange={(e) => {
                filter_personal(
                  searchFilter,
                  e.target.value,
                  ageMaxFilter,
                  positionFilter
                )
                setAgeMinFilter(e.target.value)
              }}
              placeholder='min'
            />
            <FaLongArrowAltRight size={40} />
            <Form.Control
              type='number'
              min='8'
              max='78'
              id='filter-player-by-age-end'
              className='searchForm filter-player-age'
              value={ageMaxFilter}
              onChange={(e) => {
                filter_personal(
                  searchFilter,
                  ageMinFilter,
                  e.target.value,
                  positionFilter
                )
                setAgeMaxFilter(e.target.value)
              }}
              placeholder='max'
            />
          </div>
        </div>
        <div className='jucatori-toolbar-item'>
          <label htmlFor='select-filter-jucatori-position'>Position</label>
          <select
            value={positionFilter}
            id='select-filter-jucatori-position'
            defaultValue={''}
            className='form-select option-capitalise'
            aria-label='Default select example'
            onChange={(e) => {
              filter_personal(
                searchFilter,
                ageMinFilter,
                ageMaxFilter,
                e.target.value
              )
              setPositionFilter(e.target.value)
            }}
          >
            <option value=''>All</option>
            {positions.map((position, index) => {
              return (
                <option
                  key={index}
                  value={position}
                  className='option-capitalise'
                >
                  {position}
                </option>
              )
            })}
          </select>
        </div>
        <div
          className='jucatori-reset'
          onClick={() => {
            setSearchFilter('')
            setAgeMaxFilter('')
            setAgeMinFilter('')
            setPositionFilter('')
            setPersonal(personalOrigin)
          }}
        >
          <GrPowerReset size={20} />
          <span>Reset</span>
        </div>
      </div>
      <div className='jucatori'>
        <div
          className='loading-content-spinner'
          style={{ display: isLoading ? 'flex' : 'none' }}
        >
          {iconLoading}
        </div>
        {personal.map((jucator) => {
          return (
            <PersonalSingle
              img={jucator.imagine}
              nume={jucator.nume}
              prenume={jucator.prenume}
              data_nasterii={jucator.data_nasterii}
              nationalitate={jucator.nationalitate}
              post={jucator.post}
              inaltime={jucator.inaltime}
              id_personal={jucator.id_personal}
              lot_curent={jucator.lot_curent}
              key={jucator.id_personal}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Jucatori
