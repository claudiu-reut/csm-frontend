import React from 'react'
import axios from '../api/axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
import Meci from './Meci/Meci'
import './Calendar.css'
import { GrPowerReset } from 'react-icons/gr'
let dateForMatch = new Date('2022-01-15T15:53:00').toString()
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
    createdAt: dateForMatch,
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
    createdAt: dateForMatch,
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
    createdAt: dateForMatch,
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
    createdAt: dateForMatch,
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
    createdAt: dateForMatch,
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
    createdAt: dateForMatch,
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
    createdAt: dateForMatch,
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
    createdAt: dateForMatch,
  },
]
const Calendar = () => {
  const [teams, setTeams] = useState([])
  const [startDate, setStartDate] = useState('')
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
      if (!locations.includes(matches[i].locatia)) {
        locations.push(matches[i].locatia)
      }
    }
    setLocations(locations)
  }
  const get_all_championships = () => {
    let championships = []
    for (let i = 0; i < matches.length; i++) {
      if (!championships.includes(matches[i].championat)) {
        championships.push(matches[i].championat)
      }
    }
    setChampionships(championships)
  }
  const get_all_divisions = () => {
    let divisions = []
    for (let i = 0; i < matches.length; i++) {
      if (!divisions.includes(matches[i].divizia)) {
        divisions.push(matches[i].divizia)
      }
    }
    setDivisions(divisions)
  }
  const get_matches = async () => {
    try {
      let result = await axios.get('getmatchlogos')
      if (result.status === 200) {
        setMatches(result.data)
        console.log(result.data);
      } else {
        console.log(result.data.err)
      }
    } catch (error) {}
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    console.log("meciuri");
    get_matches();
    get_all_locations()
    get_all_championships()
    get_all_divisions()
    
  }, [])

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
        (match) => match.championat === championshipFilter
      )
    }
    if (divisionFilter !== '') {
      result = result.filter((match) => match.divizia === divisionFilter)
    }
    if (locationFilter !== '') {
      result = result.filter((match) => match.locatia === locationFilter)
    }
    if (genderFilter !== '') {
      result = result.filter((match) => match.gen === genderFilter)
    }
    if (date !== '') {
      result = result.filter((match) => {
        const matchDate = new Date(match.createdAt)
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
          <div className='matches-toolbar-item filter-matches-date'>
            <label htmlFor='select-filter-matches-date'>Data</label>
            <DatePicker
              className='select-filter-matches-date'
              placeHolder={'Please Select...'}
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
