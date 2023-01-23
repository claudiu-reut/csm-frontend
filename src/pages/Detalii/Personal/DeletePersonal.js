import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
export default function DeletePersonal() {
  const match = useParams()
  const history = useNavigate()

  useEffect(() => {
    const deletePersonal = async () => {
      console.log(match.id)
      const response = await axios.delete(`deletepersonal/${match.id}`)
      history('/admin')
      console.log(response)
    }
    deletePersonal()
  }, [])
  return <div>DeletePersonal</div>
}
