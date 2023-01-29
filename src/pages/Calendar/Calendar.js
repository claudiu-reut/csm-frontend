import React from 'react'
import axios from '../api/axios'
import { DateRangePicker } from 'rsuite'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
import Meci from './Meci/Meci'
import './Calendar.css'
import { GrPowerReset } from 'react-icons/gr'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
let iconLoading = (
  <UseAnimations animation={loading} size={55} strokeColor='blue' />
)
const Calendar = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
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
    setIsLoading(true)
    try {
      let result = await axios.get('getmatchlogos')
      if (result.status === 200) {
        setMatches(result.data)
        setMatchesOrigin(result.data)
      } else {
        console.log(result.data.err)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
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
    dateMinFilter,
    dateMaxFilter
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

    if (dateMinFilter !== '') {
      result = result.filter((match) => new Date(match.data) >= dateMinFilter)
    }
    if (dateMaxFilter !== '') {
      result = result.filter((match) => new Date(match.data) <= dateMaxFilter)
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
                  divisionFilter,
                  startDate,
                  endDate
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
                  divisionFilter,
                  startDate,
                  endDate
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
                  e.target.value,
                  startDate,
                  endDate
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
                  divisionFilter,
                  startDate,
                  endDate
                )
              }}
            >
              <option value=''>All</option>
              <option value='masculin'>Masculin</option>
              <option value='feminin'>Feminin</option>
            </select>
          </div>
          <div className='matches-toolbar-item date-range-picker-item'>
            <label htmlFor='select-filter-matches-date'>Data</label>
            <DateRangePicker
              showOneCalendar
              appearance='default'
              value={[startDate, endDate]}
              onChange={(value) => {
                setStartDate(value[0])
                setEndDate(value[1])
                filter_matches(
                  genderFilter,
                  locationFilter,
                  championshipFilter,
                  divisionFilter,
                  value[0],
                  value[1]
                )
              }}
            />
          </div>
          <div
            className='matches-toolbar-item matches-reset'
            onClick={() => {
              setLocationFilter('')
              setDivisionFilter('')
              setChampionshipFilter('')
              setGenderFilter('')
              setStartDate('')
              setEndDate('')
              setMatches(matchesOrigin)
            }}
          >
            <GrPowerReset size={20} />
            <span>Reset</span>
          </div>
        </div>
        <div className='matches'>
          <div
            className='loading-content-spinner'
            style={{ display: isLoading ? 'flex' : 'none' }}
          >
            {iconLoading}
          </div>
          <div
            className='nothing-found'
            style={{
              display:
                matches.length < 1 && isLoading === false ? 'flex' : 'none',
            }}
          >
            <img
              src='https://cdn.dribbble.com/users/1242216/screenshots/9326781/dribbble_shot_hd_-_3_4x.png'
              alt='nothing found image'
            />
          </div>
          {matches.map((match) => {
            return <Meci match={match} key={match.id_meci} />
          })}
        </div>
      </div>
    </>
  )
}

export default Calendar
