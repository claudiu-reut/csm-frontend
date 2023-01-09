import React from 'react'
import './Meci.css'
import { GoLocation } from 'react-icons/go'
import { TfiCup } from 'react-icons/tfi'
import { FaRegHandshake } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

const logoAmical = <FaRegHandshake size={25} color={'gold'} />
const logoTurneu = <TfiCup size={22} color={'gold'} />
function Meci({ match }) {
  const [logo1, setLogo1] = useState('')
  const [logo2, setLogo2] = useState('')
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
      '-' +
      addZero(date.getMonth() + 1) +
      '-' +
      date.getFullYear() +
      '   ,   ' +
      addZero(date.getHours()) +
      ':' +
      addZero(date.getMinutes())
    )
  }
  const [cupLogo, setCupLogo] = useState(logoTurneu)
  const [sets, setSets] = useState('')
  useEffect(() => {
    getLogos()
    if (match.sets !== null) {
      setSets(match.sets)
    }
    if (match.campionat === 'Amical') {
      setCupLogo(logoAmical)
    }
  }, [])

  return (
    <div
      className='match'
      onClick={() => {
        navigate(`/calendar/${match.id_meci}`)
      }}
    >
      <div className='match-top'>
        <span className='match-top-item'>
          <span className='match-top-item-logo'>
            <GoLocation size={21} color={'blue'} />
          </span>
          <p className='match-location'>{match.locatia}</p>
        </span>
        <span className='match-top-item match-top-center'>
          <span className='match-top-item-logo'>{cupLogo}</span>
          <p className='match-championship'>{match.campionat}</p>
        </span>
        <span className='match-top-item'>
          <span className='match-top-item-logo'>
            <MdDateRange size={22} color={'red'} />
          </span>
          <p className='match-date'>{get_date_from_str(match.data)}</p>
        </span>
      </div>
      <div className='match-info-container'>
        <span className='match-division'>
          <p>{match.divizia},</p>
        </span>
        <span className='match-gender'>
          <p>{match.gen}</p>
        </span>
      </div>
      <div className='teams'>
        <div className='first-team team'>
          <h4 className='team-name'>{match.nume1}</h4>
          <img
            src={`data:image/jpeg;base64,${logo1}`}
            alt=''
            className='team-logo'
          />
        </div>
        <div className='score'>
          <span>
            <p
              className='score-item'
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
              className='score-item'
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
        <div className='second-team team'>
          <img
            src={`data:image/jpeg;base64,${logo2}`}
            alt=''
            className='team-logo'
          />
          <h4 className='team-name'>{match.nume2}</h4>
        </div>
      </div>
      <div className='sets-scores'>
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
    </div>
  )
}

export default Meci
