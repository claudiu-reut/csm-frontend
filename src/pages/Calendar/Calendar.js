import React from 'react'
import axios from '../api/axios'
import { useEffect, useState } from 'react'
import Meci from './Meci/Meci'
import './Calendar.css'
import { GrPowerReset } from 'react-icons/gr'
const meciuri_init = [
  {
    id: '1',
    location: 'Bucuresti',
    championship: 'Liga Nationala',
    division: 'Divizia A1',
    gender: 'Masculin',
    score: '-:-',
    firstTeam: {
      name: 'Steaua București',
      logo: 'https://www.proballers.com/api/getTeamLogo?id=2070',
    },
    secondTeam: {
      name: 'CSM Suceava',
      logo: 'http://res.hattrick.org/teamlogo/2/19/185/184441/184441.png',
    },
    sets: '',
  },
  {
    id: '2',
    location: 'Cluj-Napoca',
    championship: 'Amical',
    division: 'Divizia A1',
    gender: 'Masculin',
    score: '-:-',
    firstTeam: {
      name: 'U. Cluj',
      logo: 'http://www.voleiromania.ro/images/echipe/mari/universitatea-cluj-2015-2016-218.jpg',
    },
    secondTeam: {
      name: 'CSM Suceava',
      logo: 'http://res.hattrick.org/teamlogo/2/19/185/184441/184441.png',
    },
    sets: '',
  },
  {
    id: '3',
    location: 'Bucuresti',
    championship: 'Liga Nationala',
    division: 'Divizia A1',
    gender: 'Masculin',
    score: '3:1',
    firstTeam: {
      name: 'Dinamo Bucuresti',
      logo: 'https://upload.wikimedia.org/wikipedia/ro/f/fd/C.S._Dinamo.png',
    },
    secondTeam: {
      name: 'CSM Suceava',
      logo: 'http://res.hattrick.org/teamlogo/2/19/185/184441/184441.png',
    },
    sets: '25-20 27-29 25-18 25-20',
  },
  {
    id: '4',
    location: 'Suceava',
    championship: 'Amical',
    division: 'Juniori',
    gender: 'Femenin',
    score: '3:0',
    firstTeam: {
      name: 'CSM Suceava',
      logo: 'http://res.hattrick.org/teamlogo/2/19/185/184441/184441.png',
    },
    secondTeam: {
      name: 'Tomis Constanta',
      logo: 'https://upload.wikimedia.org/wikipedia/en/a/a8/CVM_Tomis_Constan%C5%A3a_logo.jpg',
    },
    sets: '25-13 25-17 25-21',
  },
  {
    id: '8',
    location: 'Zalău',
    championship: 'Amical',
    division: 'Divizia A1',
    gender: 'Masculin',
    score: '1:3',
    firstTeam: {
      name: 'Zalău',
      logo: 'https://upload.wikimedia.org/wikipedia/en/6/62/VM_Zal%C4%83u_logo.jpg',
    },
    secondTeam: {
      name: 'CSM Suceava',
      logo: 'http://res.hattrick.org/teamlogo/2/19/185/184441/184441.png',
    },
    sets: '25-14 26-28 21-25 24-26',
  },
  {
    id: '5',
    location: 'Suceava',
    championship: 'Amical',
    division: 'Divizia A1',
    gender: 'Femenin',
    score: '3:2',
    firstTeam: {
      name: 'CSM Suceava',
      logo: 'http://res.hattrick.org/teamlogo/2/19/185/184441/184441.png',
    },
    secondTeam: {
      name: 'Știința Baia Mare',
      logo: 'https://www.stiintaexplorari.ro/images/sigla-expl.png',
    },
    sets: '25-20 25-23 15-25 18-25 25-19',
  },
  {
    id: '6',
    location: 'Craiova',
    championship: 'Liga Nationala',
    division: 'Divizia A1',
    gender: 'Masculin',
    score: '3:1',
    firstTeam: {
      name: 'Craiova',
      logo: 'https://upload.wikimedia.org/wikipedia/en/c/cb/SCM_Craiova_logo.png',
    },
    secondTeam: {
      name: 'CSM Suceava',
      logo: 'http://res.hattrick.org/teamlogo/2/19/185/184441/184441.png',
    },
    sets: '25-17 27-25 16-25 25-13',
  },
  {
    id: '7',
    location: 'Suceava',
    championship: 'Liga Nationala',
    division: 'Divizia A1',
    gender: 'Femenin',
    score: '3:1',
    firstTeam: {
      name: 'CSM Suceava',
      logo: 'http://res.hattrick.org/teamlogo/2/19/185/184441/184441.png',
    },
    secondTeam: {
      name: 'Arcada Galaţi',
      logo: 'https://upload.wikimedia.org/wikipedia/en/2/25/CS_Arcada_Gala%C8%9Bi_logo.png',
    },
    sets: '25-17 21-25 25-19 25-22',
  },
]
const Calendar = () => {
  const [teams, setTeams] = useState([])
  const [matches, setMatches] = useState(meciuri_init)
  const [matchesOrigin, setMatchesOrigin] = useState(meciuri_init)
  const [locations, setLocations] = useState([])
  const [championships, setChampionships] = useState([])
  const [divisions, setDivisions] = useState([])
  const [locationFilter, setLocationFilter] = useState('')
  const [championshipFilter, setChampionshipFilter] = useState('')
  const [divisionFilter, setDivisionFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')

  const get_all_locations = () => {
    let locations = []
    for (let i = 0; i < matches.length; i++) {
      if (!locations.includes(matches[i].location)) {
        locations.push(matches[i].location)
      }
    }
    setLocations(locations)
  }
  const get_all_championships = () => {
    let championships = []
    for (let i = 0; i < matches.length; i++) {
      if (!championships.includes(matches[i].championship)) {
        championships.push(matches[i].championship)
      }
    }
    setChampionships(championships)
  }
  const get_all_divisions = () => {
    let divisions = []
    for (let i = 0; i < matches.length; i++) {
      if (!divisions.includes(matches[i].division)) {
        divisions.push(matches[i].division)
      }
    }
    setDivisions(divisions)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    get_all_locations()
    get_all_championships()
    get_all_divisions()
  }, [])

  const filter_matches = (
    genderFilter,
    locationFilter,
    championshipFilter,
    divisionFilter
  ) => {
    let result = matchesOrigin
    if (championshipFilter !== '') {
      result = result.filter(
        (match) => match.championship === championshipFilter
      )
    }
    if (divisionFilter !== '') {
      result = result.filter((match) => match.division === divisionFilter)
    }
    if (locationFilter !== '') {
      result = result.filter((match) => match.location === locationFilter)
    }
    if (genderFilter !== '') {
      result = result.filter((match) => match.gender === genderFilter)
    }
    setMatches(result)
    window.scrollTo(0, 0)
  }
  return (
    <>
      <div className='calendar-container'>
        <div className='matches-toolbar'>
          <div className='matches-toolbar-item'>
            <label htmlFor='select-filter-matches-gender'>Gen</label>
            <select
              value={genderFilter}
              id='select-filter-matches-gender'
              defaultValue={''}
              class='form-select'
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
              <option value='Masculin'>Masculin</option>
              <option value='Femenin'>Femenin</option>
            </select>
          </div>
          <div className='matches-toolbar-item'>
            <label htmlFor='select-filter-matches-location'>Oras</label>
            <select
              value={locationFilter}
              id='select-filter-matches-location'
              defaultValue={''}
              class='form-select'
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
                  <option key={index} value={location}>
                    {location}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='matches-toolbar-item'>
            <label htmlFor='select-filter-matches-championship'>Turneu</label>
            <select
              value={championshipFilter}
              id='select-filter-matches-championship'
              defaultValue={''}
              class='form-select'
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
                  <option key={index} value={championship}>
                    {championship}
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
              class='form-select'
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
                  <option key={index} value={division}>
                    {division}
                  </option>
                )
              })}
            </select>
          </div>
          <div
            className='matches-reset'
            onClick={() => {
              setLocationFilter('')
              setDivisionFilter('')
              setChampionshipFilter('')
              setGenderFilter('')
              setMatches(matchesOrigin)
            }}
          >
            <GrPowerReset size={20} id='matches-reset' />
            <span>Reset</span>
          </div>
        </div>
        <div className='matches'>
          {matches.map((match) => {
            return <Meci match={match} key={match.id} />
          })}
        </div>
      </div>
    </>
  )
}

export default Calendar
