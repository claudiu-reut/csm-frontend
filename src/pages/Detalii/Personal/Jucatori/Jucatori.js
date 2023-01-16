import React, { useState, useEffect } from 'react'
import Jucator from './Jucator'
import { Form } from 'react-bootstrap'
import { FaLongArrowAltRight } from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Jucatori.css'
import { GrPowerReset } from 'react-icons/gr'
import axios from '../../../api/axios'
function Jucatori() {
  const [searchFilter, setSearchFilter] = useState('')
  const [jucatori, setJucatori] = useState([])
  const [jucatoriOrigin, setJucatoriOrigin] = useState([])
  const [positions, setPositions] = useState([])
  const [positionFilter, setPositionFilter] = useState('')
  const [ageMinFilter, setAgeMinFilter] = useState('')
  const [ageMaxFilter, setAgeMaxFilter] = useState('')
  const getJucatori = async () => {
    const response = await axios.get('/getpersonal')
    console.log(response)
    setJucatori(response.data)
    setJucatoriOrigin(response.data)
  }
  const get_all_positions = () => {
    let positions = []
    for (let i = 0; i < jucatori.length; i++) {
      if (!positions.includes(jucatori[i].post.toLowerCase())) {
        positions.push(jucatori[i].post.toLowerCase())
      }
    }
    setPositions(positions)
  }
  useEffect(() => {
    getJucatori()
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    get_all_positions()
  }, [jucatori])
  const filter_jucatori = (
    searchFilter,
    ageMinFilter,
    ageMaxFilter,
    positionFilter
  ) => {
    let result = jucatoriOrigin
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
    setJucatori(result)
    window.scrollTo(0, 0)
  }
  function calcAge(data_nasterii) {
    var birthday = +new Date(data_nasterii)
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
                filter_jucatori(
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
              id='filter-player-by-age-min'
              className='searchForm filter-player-age'
              value={ageMinFilter}
              onChange={(e) => {
                filter_jucatori(
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
              id='filter-player-by-age-end'
              className='searchForm filter-player-age'
              value={ageMaxFilter}
              onChange={(e) => {
                filter_jucatori(
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
              filter_jucatori(
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
            setJucatori(jucatoriOrigin)
          }}
        >
          <GrPowerReset size={20} />
          <span>Reset</span>
        </div>
      </div>
      <div className='jucatori'>
        {jucatori.map((jucator) => {
          return (
            <Jucator
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
