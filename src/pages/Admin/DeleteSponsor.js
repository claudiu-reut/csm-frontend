import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
export default function DeleteSponsor() {
  const match = useParams()
  const history = useNavigate()

  useEffect(() => {
    const deleteSponsor = async () => {
      console.log(match.id)
      const response = await axios.delete(`/deletesponsor/${match.id}`)
      history('/admin')
      console.log(response)
    }
    deleteSponsor()
  }, [])
  return <div>DeleteSponsor</div>
}
