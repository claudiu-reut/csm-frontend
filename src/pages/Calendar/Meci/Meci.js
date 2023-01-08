import React from 'react'
import './Meci.css'
import { GoLocation } from 'react-icons/go'
import { TfiCup } from 'react-icons/tfi'
import { FaRegHandshake } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'
import { useEffect } from 'react'
import { useState } from 'react'
const logoAmical = <FaRegHandshake size={25} color={'gold'} />
const logoTurneu = <TfiCup size={22} color={'gold'} />
function Meci({ match }) {
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
  useEffect(() => {
    if (match.championship === 'Amical') {
      setCupLogo(logoAmical)
    }
  }, [])

  return (
    <div className='match'>
      <div className='match-top'>
        <span className='match-top-item'>
          <span className='match-top-item-logo'>
            <GoLocation size={21} color={'blue'} />
          </span>
          <p className='match-location'>{match.location}</p>
        </span>
        <span className='match-top-item match-top-center'>
          <span className='match-top-item-logo'>{cupLogo}</span>
          <p className='match-championship'>{match.championship}</p>
        </span>
        <span className='match-top-item'>
          <span className='match-top-item-logo'>
            <MdDateRange size={22} color={'red'} />
          </span>
          <p className='match-date'>
            {get_date_from_str(match.createdAt.toString())}
          </p>
        </span>
      </div>
      <div className='match-info-container'>
        <span className='match-division'>
          <p>{match.division},</p>
        </span>
        <span className='match-gender'>
          <p>{match.gender}</p>
        </span>
      </div>
      <div className='teams'>
        <div className='first-team team'>
          <h4 className='team-name'>{match.firstTeam.name}</h4>
          <img src={match.firstTeam.logo} alt='' className='team-logo' />
        </div>
        <div className='score'>
          <span>
            <p
              className='score-item'
              style={{
                color:
                  match.score.split(':')[0] > match.score.split(':')[1]
                    ? 'red'
                    : 'black',
                fontWeight:
                  match.score.split(':')[0] > match.score.split(':')[1]
                    ? 'bold'
                    : 'normal',
              }}
            >
              {match.score.split(':')[0]}
            </p>
            <p>:</p>
            <p
              className='score-item'
              style={{
                color:
                  match.score.split(':')[0] < match.score.split(':')[1]
                    ? 'red'
                    : 'black',
                fontWeight:
                  match.score.split(':')[0] < match.score.split(':')[1]
                    ? 'bold'
                    : 'normal',
              }}
            >
              {match.score.split(':')[1]}
            </p>
          </span>
        </div>
        <div className='second-team team'>
          <img src={match.secondTeam.logo} alt='' className='team-logo' />
          <h4 className='team-name'>{match.secondTeam.name}</h4>
        </div>
      </div>
      <div className='sets-scores'>
        {match.sets.split(' ').map((set, index) => {
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
