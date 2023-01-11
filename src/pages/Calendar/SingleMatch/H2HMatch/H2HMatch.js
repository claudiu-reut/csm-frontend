import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './H2HMatch.css'
import { TfiCup } from 'react-icons/tfi'
import { FaRegHandshake } from 'react-icons/fa'
import { BsClock } from 'react-icons/bs'
import axios from '../../../api/axios'
const logoAmical = <FaRegHandshake size={18} color={'gold'} />
const logoTurneu = <TfiCup size={18} color={'gold'} />
function H2HMatch({ match }) {
  const [logo1, setLogo1] = useState('')
  const [logo2, setLogo2] = useState('')
  const [cupLogo, setCupLogo] = useState(logoTurneu)
  let navigate = useNavigate()
  const getLogos = async () => {
    const response1 = await axios.get(`/getteamlogo/${match.id_echipa1}`)
    const response2 = await axios.get(`/getteamlogo/${match.id_echipa2}`)
    setLogo1(response1.data)
    setLogo2(response2.data)
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
      '.' +
      addZero(date.getMonth() + 1) +
      '.' +
      date.getFullYear()
    )
  }
  useEffect(() => {}, [])
  useEffect(() => {
    if (match.campionat === 'Amical') {
      setCupLogo(logoAmical)
    } else {
      setCupLogo(logoTurneu)
    }
    getLogos()
  }, [match])
  return (
    <div
      className='h2h-match'
      onClick={() => {
        navigate(`/calendar/${match.id_meci}`)
      }}
    >
      <div className='h2h-match-date'>
        <BsClock size={14} />
        <p>{get_date_from_str(match.data)}</p>
      </div>
      <div className='h2h-match-championship'>
        {cupLogo}
        <p>{match.campionat}</p>
      </div>
      <div className='h2h-match-teams'>
        <div className='h2h-match-first-team h2h-match-team'>
          <img
            src={`data:image/jpeg;base64,${logo1}`}
            alt=''
            className='h2h-match-team-logo'
          />
          <p
            style={{
              fontWeight:
                match.rezultat.split(':')[0] > match.rezultat.split(':')[1]
                  ? 'bold'
                  : 'normal',
            }}
          >
            {match.nume1}
          </p>
        </div>
        <div className='h2h-match-first-team h2h-match-team'>
          <img
            src={`data:image/jpeg;base64,${logo2}`}
            alt=''
            className='h2h-match-team-logo'
          />
          <p
            style={{
              fontWeight:
                match.rezultat.split(':')[0] < match.rezultat.split(':')[1]
                  ? 'bold'
                  : 'normal',
            }}
          >
            {match.nume2}
          </p>
        </div>
      </div>
      <div className='h2h-match-score'>
        <p
          className='h2h-match-score-item h2h-match-score-first-item'
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
        <p
          className='h2h-match-score-item h2h-match-score-second-item'
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
      </div>
    </div>
  )
}

export default H2HMatch
