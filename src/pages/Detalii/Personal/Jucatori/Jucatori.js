import React, { useState, useEffect } from 'react'
import Jucator from './Jucator'
import { Form } from 'react-bootstrap'
import { FaLongArrowAltRight } from 'react-icons/fa'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Jucatori.css'
import { GrPowerReset } from 'react-icons/gr'
import axios from '../../../api/axios'
function Jucatori() {
  const [search, setSearch] = useState('')
  const [jucatori, setJucatori] = useState([])
  const [jucatoriOrigin, setJucatoriOrigin] = useState([])
  const [positions, setPositions] = useState([])
  const [positionFilter, setPositionFilter] = useState('')
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
  }, [])
  useEffect(() => {
    get_all_positions()
  }, [jucatori])
  return (
    <div className='container-jucatori'>
      <div className='jucatori-toolbar'>
        <div className='jucatori-toolbar-item'>
          <label htmlFor='search-player-by-name'>Search</label>
          <div>
            <Form.Control
              id='search-player-by-name'
              className='searchForm'
              onChange={(e) => setSearch(e.target.value)}
              placeholder='search by name'
            />
          </div>
        </div>
        <div className='jucatori-toolbar-item'>
          <label htmlFor='filter-player-by-age'>Age</label>
          <div className='filter-player-by-age-container'>
            <Form.Control
              id='filter-player-by-age-start'
              className='searchForm filter-player-age'
              onChange={(e) => {}}
              placeholder='start'
            />
            <FaLongArrowAltRight size={40} />
            <Form.Control
              id='filter-player-by-age-end'
              className='searchForm filter-player-age'
              onChange={(e) => {}}
              placeholder='end'
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
            setPositionFilter('')
            setJucatori(jucatoriOrigin)
          }}
        >
          <GrPowerReset size={20} />
          <span>Reset</span>
        </div>
      </div>
      <div className='jucatori'>
        {jucatori
          .filter((jucator) => {
            const numeComplet = jucator.nume + ' ' + jucator.prenume
            return search.toLowerCase() === ''
              ? jucator
              : numeComplet.toLowerCase().includes(search)
          })
          .map((jucator) => {
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
              />
            )
          })}
      </div>
    </div>
  )
}

export default Jucatori
