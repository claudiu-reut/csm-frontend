import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GoLocation } from 'react-icons/go'
import { TfiCup } from 'react-icons/tfi'
import { FaRegHandshake } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'
import './SingleMatch.css'
import axios from '../../api/axios'
import OtherMatch from './OtherMatch/OtherMatch'
import H2HMatch from './H2HMatch/H2HMatch'
let demo_match = {
  campionat: 'Liga Nationala',
  data: '2022-12-15T07:30:00.000Z',
  description: 'confruntare shaolin',
  divizia: 'Divizia A1',
  gen: 'masculin',
  id_meci: 10,
  id_echipa1: 6,
  id_echipa2: 4,
  locatia: 'Cluj-Napoca',
  nume1: 'U.Cluj',
  nume2: 'CSM Suceava',
  rezultat: '3:1',
  sets: '25-17 27-25 16-25 25-13',
}
const logoAmical = <FaRegHandshake size={28} color={'gold'} />
const logoTurneu = <TfiCup size={28} color={'gold'} />
function SingleMatch() {
  const params = useParams()
  const [match, setMatch] = useState(demo_match)
  const [matches, setMatches] = useState([])
  const [matchesOrigin, setMatchesOrigin] = useState([])
  const [logo1, setLogo1] = useState(
    'https://w7.pngwing.com/pngs/751/463/png-transparent-beach-volleyball-sport-volleyball-sport-logo-monochrome.png'
  )
  const [logo2, setLogo2] = useState(
    'https://w7.pngwing.com/pngs/751/463/png-transparent-beach-volleyball-sport-volleyball-sport-logo-monochrome.png'
  )
  const [cupLogo, setCupLogo] = useState(logoTurneu)
  const [sets, setSets] = useState('')
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const getLogos = async () => {
    const response1 = await axios.get(`/getteamlogo/${match.id_echipa1}`)
    const response2 = await axios.get(`/getteamlogo/${match.id_echipa2}`)
    setLogo1(response1.data)
    setLogo2(response2.data)
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
  const getMatch = async () => {
    try {
      const response = await axios.get(`/getmatchlogos/${params.id}`)
      setMatch(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const get_date_from_str = (str) => {
    function addZero(i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    }
    let date = new Date(str)
    return (
      addZero(date.getDate()) +
      '-' +
      addZero(date.getMonth() + 1) +
      '-' +
      date.getFullYear() +
      '     ' +
      addZero(date.getHours()) +
      ':' +
      addZero(date.getMinutes())
    )
  }
  useEffect(() => {
    order_by_date()
  }, [matchesOrigin])

  useEffect(() => {
    window.scrollTo(0, 0)
    getMatch()
    get_matches()
  }, [params])
  useEffect(() => {
    if (match.sets !== null) {
      setSets(match.sets)
    }
    if (match.campionat.toUpperCase() === 'AMICAL') {
      setCupLogo(logoAmical)
    } else {
      setCupLogo(logoTurneu)
    }
    getLogos()
  }, [match])
  let counter = 0
  let otherMatchesArray = matches.map((meci_curent) => {
    if (counter < 4 && match.id_meci !== meci_curent.id_meci) {
      counter += 1
      return <OtherMatch match={meci_curent} key={meci_curent.id_meci} />
    }
  })
  let h2hmatches = matches.filter((meci_curent) => {
    return (
      (meci_curent.id_meci !== match.id_meci &&
        new Date(meci_curent.data) < new Date() &&
        meci_curent.id_echipa1 === match.id_echipa1 &&
        meci_curent.id_echipa2 === match.id_echipa2) ||
      (meci_curent.id_echipa1 === match.id_echipa2 &&
        meci_curent.id_echipa2 === match.id_echipa1 &&
        new Date(meci_curent.data) < new Date())
    )
  })
  return (
    <div className='single-match-container'>
      <div className='single-match-ads'>
        <span>Ads</span>
      </div>
      <div className='single-match'>
        <div className='single-match-top'>
          <span className='single-match-top-item'>
            <span className='single-match-top-item-logo'>
              <GoLocation size={28} color={'blue'} />
            </span>
            <p className='single-match-location'>{match.locatia}</p>
          </span>
          <span className='single-match-top-item single-match-top-center'>
            <span className='single-match-top-item-logo'>{cupLogo}</span>
            <p className='single-match-championship'>{match.campionat}</p>
          </span>
          <span className='single-match-top-item'>
            <span className='single-match-top-item-logo'>
              <MdDateRange size={28} color={'red'} />
            </span>
            <p className='single-match-date'>{get_date_from_str(match.data)}</p>
          </span>
        </div>
        <div className='single-match-info-container'>
          <span className='single-match-division'>
            <p>{match.divizia},</p>
          </span>
          <span className='single-match-gender'>
            <p>{match.gen}</p>
          </span>
        </div>
        <div className='single-match-teams'>
          <div className='single-match-first-team single-match-team'>
            <h4 className='single-match-team-name'>{match.nume1}</h4>
            <img
              src={`data:image/jpeg;base64,${logo1}`}
              alt=''
              className='single-match-team-logo'
            />
          </div>
          <div className='single-match-score'>
            <span>
              <p
                className='single-match-score-item'
                style={{
                  color:
                    match.rezultat.split(':')[0] > match.rezultat.split(':')[1]
                      ? 'red'
                      : 'black',
                  fontWeight:
                    match.rezultat.split(':')[0] > match.rezultat.split(':')[1]
                      ? 'bold'
                      : 'normal',
                }}
              >
                {match.rezultat.split(':')[0]}
              </p>
              <p>:</p>
              <p
                className='single-match-score-item'
                style={{
                  color:
                    match.rezultat.split(':')[0] < match.rezultat.split(':')[1]
                      ? 'red'
                      : 'black',
                  fontWeight:
                    match.rezultat.split(':')[0] < match.rezultat.split(':')[1]
                      ? 'bold'
                      : 'normal',
                }}
              >
                {match.rezultat.split(':')[1]}
              </p>
            </span>
          </div>
          <div className='single-match-second-team single-match-team'>
            <img
              src={`data:image/jpeg;base64,${logo2}`}
              alt=''
              className='team-logo'
            />
            <h4 className='single-match-team-name'>{match.nume2}</h4>
          </div>
        </div>
        <div className='single-match-sets-scores'>
          {sets.split(' ').map((set, index) => {
            if (set === '') {
              return <span key={index}></span>
            }
            let firstTeamSet = set.split('-')[0]
            let secondTeamSet = set.split('-')[1]
            let firstTeamBool = firstTeamSet > secondTeamSet
            let secondTeamBool = firstTeamSet < secondTeamSet
            return (
              <span key={index}>
                <p
                  style={{
                    color: firstTeamBool ? 'red' : 'black',
                    fontWeight: firstTeamBool ? 'bold' : 'normal',
                  }}
                >
                  {firstTeamSet}
                </p>
                <p>-</p>
                <p
                  style={{
                    color: secondTeamBool ? 'red' : 'black',
                    fontWeight: secondTeamBool ? 'bold' : 'normal',
                  }}
                >
                  {secondTeamSet}
                </p>
              </span>
            )
          })}
        </div>
        <div className='h2h-container'>
          <h4>Head-To-Head</h4>
          <div className='single-match-h2h'>
            <div
              className='nothing-found'
              style={{
                display: h2hmatches.length < 1 ? 'flex' : 'none',
              }}
            >
              <img
                src='https://cdn.dribbble.com/users/760295/screenshots/4433975/media/03494b209a1511a61868ced337b97931.png?compress=1&resize=400x300'
                alt='nothing found image'
              />
            </div>
            {h2hmatches.map((meci) => {
              return <H2HMatch match={meci} key={meci.id_meci} />
            })}
          </div>
        </div>
      </div>
      <div className='other-matches'>
        <div className='other-matches-see-also'>
          <h4>Recente</h4>
        </div>
        {otherMatchesArray}
      </div>
    </div>
  )
}

export default SingleMatch
