import React from 'react'
import axios from '../api/axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
import Meci from './Meci/Meci'
import './Calendar.css'
import { GrPowerReset } from 'react-icons/gr'

const Calendar = () => {
  const [startDate, setStartDate] = useState('')
  const [matches, setMatches] = useState([])
  const [matchesOrigin, setMatchesOrigin] = useState([])
  const [locations, setLocations] = useState([])
  const [championships, setChampionships] = useState([])
  const [divisions, setDivisions] = useState([])
  const [locationFilter, setLocationFilter] = useState('')
  const [championshipFilter, setChampionshipFilter] = useState('')
  const [divisionFilter, setDivisionFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const get_all_locations = () => {
    let locations = []
    for (let i = 0; i < matches.length; i++) {
      if (!locations.includes(matches[i].locatia.toLowerCase())) {
        locations.push(matches[i].locatia.toLowerCase())
      }
    }
    setLocations(locations)
  }
  const get_all_championships = () => {
    let championships = []
    for (let i = 0; i < matches.length; i++) {
      if (!championships.includes(matches[i].campionat.toLowerCase())) {
        championships.push(matches[i].campionat.toLowerCase())
      }
    }
    setChampionships(championships)
  }
  const get_all_divisions = () => {
    let divisions = []
    for (let i = 0; i < matches.length; i++) {
      if (!divisions.includes(matches[i].divizia.toLowerCase())) {
        divisions.push(matches[i].divizia.toLowerCase())
      }
    }
    setDivisions(divisions)
  }
  const get_matches = async () => {
    try {
      let result = await axios.get('getmatchlogos')
      if (result.status === 200) {
        setMatches(result.data)
        setMatchesOrigin(result.data)
      } else {
        console.log(result.data.err)
      }
    } catch (error) {}
  }
  const order_by_date = () => {
    let sorted = matches.sort(function (a, b) {
      let result = new Date(b.data) - new Date(a.data)
      return result
    })
    setMatches(sorted)
    forceUpdate()
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    get_matches()
  }, [])
  useEffect(() => {
    get_all_locations()
    get_all_championships()
    get_all_divisions()
    order_by_date()
  }, [matchesOrigin])

  const filter_matches = (
    genderFilter,
    locationFilter,
    championshipFilter,
    divisionFilter,
    date = ''
  ) => {
    let result = matchesOrigin
    if (championshipFilter !== '') {
      result = result.filter(
        (match) =>
          match.campionat.toUpperCase() === championshipFilter.toUpperCase()
      )
    }
    if (divisionFilter !== '') {
      result = result.filter(
        (match) => match.divizia.toUpperCase() === divisionFilter.toUpperCase()
      )
    }
    if (locationFilter !== '') {
      result = result.filter(
        (match) => match.locatia.toUpperCase() === locationFilter.toUpperCase()
      )
    }
    if (genderFilter !== '') {
      result = result.filter(
        (match) => match.gen.toUpperCase() === genderFilter.toUpperCase()
      )
    }
    if (date !== '') {
      result = result.filter((match) => {
        const matchDate = new Date(match.data)
        return (
          matchDate.getFullYear() === date.getFullYear() &&
          matchDate.getMonth() === date.getMonth() &&
          matchDate.getDate() === date.getDate()
        )
      })
    }
    setMatches(result)
    window.scrollTo(0, 0)
  }
  return (
    <>
      <div className='calendar-container'>
        <div className='matches-toolbar'>
          <div className='matches-toolbar-item'>
            <label htmlFor='select-filter-matches-championship'>Turneu</label>
            <select
              value={championshipFilter}
              id='select-filter-matches-championship'
              defaultValue={''}
              className='form-select option-capitalise'
              aria-label='Default select example'
              onChange={(e) => {
                setChampionshipFilter(e.target.value)
                filter_matches(
                  genderFilter,
                  locationFilter,
                  e.target.value,
                  divisionFilter
                )
              }}
            >
              <option value=''>All</option>
              {championships.map((championship, index) => {
                return (
                  <option
                    key={index}
                    value={championship}
                    className='option-capitalise'
                  >
                    {championship}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='matches-toolbar-item'>
            <label htmlFor='select-filter-matches-location'>Oras</label>
            <select
              value={locationFilter}
              id='select-filter-matches-location'
              defaultValue={''}
              className='form-select option-capitalise'
              aria-label='Default select example'
              onChange={(e) => {
                setLocationFilter(e.target.value)
                filter_matches(
                  genderFilter,
                  e.target.value,
                  championshipFilter,
                  divisionFilter
                )
              }}
            >
              <option value=''>All</option>
              {locations.map((location, index) => {
                return (
                  <option
                    key={index}
                    value={location}
                    className='option-capitalise'
                  >
                    {location}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='matches-toolbar-item'>
            <label htmlFor='select-filter-matches-division'>Divizia</label>
            <select
              value={divisionFilter}
              id='select-filter-matches-division'
              defaultValue={''}
              className='form-select option-capitalise'
              aria-label='Default select example'
              onChange={(e) => {
                setDivisionFilter(e.target.value)
                filter_matches(
                  genderFilter,
                  locationFilter,
                  championshipFilter,
                  e.target.value
                )
              }}
            >
              <option value=''>All</option>
              {divisions.map((division, index) => {
                return (
                  <option
                    key={index}
                    value={division}
                    className='option-capitalise'
                  >
                    {division}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='matches-toolbar-item'>
            <label htmlFor='select-filter-matches-gender'>Gen</label>
            <select
              value={genderFilter}
              id='select-filter-matches-gender'
              defaultValue={''}
              className='form-select option-capitalise'
              aria-label='Default select example'
              onChange={(e) => {
                setGenderFilter(e.target.value)
                filter_matches(
                  e.target.value,
                  locationFilter,
                  championshipFilter,
                  divisionFilter
                )
              }}
            >
              <option value=''>All</option>
              <option value='masculin'>Masculin</option>
              <option value='feminin'>Feminin</option>
            </select>
          </div>
          <div className='matches-toolbar-item'>
            <label htmlFor='select-filter-matches-date'>Data</label>
            <DatePicker
              id='select-filter-matches-date'
              className='select-filter-matches-date'
              selected={startDate}
              onChange={(date) => {
                setStartDate(date)
                filter_matches(
                  genderFilter,
                  locationFilter,
                  championshipFilter,
                  divisionFilter,
                  date
                )
              }}
              dateFormat='dd/MM/yyyy'
              placeholderText='--/--/----'
            />
          </div>
          <div
            className='matches-reset'
            onClick={() => {
              setLocationFilter('')
              setDivisionFilter('')
              setChampionshipFilter('')
              setGenderFilter('')
              setStartDate('')
              setMatches(matchesOrigin)
            }}
          >
            <GrPowerReset size={20} />
            <span>Reset</span>
          </div>
        </div>
        <div className='matches'>
          {matches.map((match) => {
            return <Meci match={match} key={match.id_meci} />
          })}
        </div>
      </div>
    </>
  )
}

export default Calendar
