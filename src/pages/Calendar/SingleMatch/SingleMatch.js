import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './SingleMatch.css'
import axios from '../../api/axios'
let demo_match = {
  campionat: 'Liga Nationala',
  data: '2022-12-15T07:30:00.000Z',
  description: 'confruntare shaolin',
  divizia: 'Divizia A1',
  gen: 'masculin',
  id_meci: 10,
  img1: '',
  img2: '',
  locatia: 'Galati',
  nume1: 'Arcada Galati',
  nume2: 'CSM Suceava',
  rezultat: '3:1',
  sets: '25-17 27-25 16-25 25-13',
}
function SingleMatch() {
  const params = useParams()
  const [match, setMatch] = useState(demo_match)

  const getMatch = async () => {
    try {
      const response = await axios.get(`/getmatch/${params.id}`)
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
  return (
    <div className='single-match-container'>
      <div className='single-match-ads'>
        <span>Ads</span>
        <ins
          className='adsbygoogle'
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client='pub-6121769535334597'
          data-ad-slot='2567266440'
          data-ad-format='auto'
          data-full-width-responsive='true'
        ></ins>
      </div>
      <div className='single-match'></div>
      <div className='other-matches'>Meciuri Recente</div>
    </div>
  )
}

export default SingleMatch
