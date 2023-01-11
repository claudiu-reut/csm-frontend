import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
export default function DeleteTeam() {
  const match = useParams()
  const history = useNavigate()

  useEffect(() => {
    const deleteTeam = async () => {
      console.log(match.id)
      const response = await axios.delete(`/deleteteam/${match.id}`)
      history('/creatorcontinut')
      console.log(response)
    }
    deleteTeam()
  }, [])
  return <div>DeleteTeam</div>
}
