import React, { useEffect, useState } from 'react'
import './OtherMatch.css'
import axios from '../../../api/axios'
function OtherMatch({ match }) {
  const [logo1, setLogo1] = useState('')
  const [logo2, setLogo2] = useState('')
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
  useEffect(() => {
    getLogos()
  }, [])
  return (
    <div className='other-match'>
      <div className='other-match-top'>
        <p>{match.campionat}</p>
        <p>-</p>
        <p>{match.gen}</p>
      </div>
      <div className='other-match-teams'>
        <div className='other-match-first-team other-match-team'>
          <img
            src={`data:image/jpeg;base64,${logo1}`}
            alt=''
            className='other-match-team-logo'
          />
          <h4 className='other-match-team-name'>{match.nume1}</h4>
        </div>
        <div className='other-match-score'>
          <span>
            <p
              className='other-match-score-item'
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
              className='other-match-score-item'
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
        <div className='other-match-second-team other-match-team'>
          <img
            src={`data:image/jpeg;base64,${logo2}`}
            alt=''
            className='other-match-team-logo'
          />
          <h4 className='other-match-team-name'>{match.nume2}</h4>
        </div>
      </div>
      <div className='other-match-date'>
        <p>{get_date_from_str(match.data)}</p>
      </div>
    </div>
  )
}

export default OtherMatch
