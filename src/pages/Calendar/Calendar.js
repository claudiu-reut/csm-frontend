import React from 'react'
import axios from '../api/axios'
import { useEffect, useState } from 'react'
const Calendar = () => {
  const [teams, setTeams] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/getteams')
      console.log(response.data)
      setTeams(response.data)
    }
    fetchData()
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',
        }}
      >
        <h1>Calendar</h1>
      </div>
    </>
  )
}

export default Calendar
