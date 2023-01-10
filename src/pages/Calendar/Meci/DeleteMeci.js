import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
export default function DeleteMeci() {
  const match = useParams()
  const history = useNavigate()

  useEffect(() => {
    const deleteMeci = async () => {
      console.log(match.id)
      const response = await axios.delete(`/deletematch/${match.id}`)
      history('/creatorcontinut')
      console.log(response)
    }
    deleteMeci()
  }, [])
  return <div>DeleteMeci</div>
}
