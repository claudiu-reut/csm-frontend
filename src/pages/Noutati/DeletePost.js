import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
export default function DeletePost() {
  const match = useParams()
  const history = useNavigate()

  useEffect(() => {
    const deletePost = async () => {
      console.log(match.id)
      const response = await axios.delete(`/deletepost/${match.id}`)
      history('/creatorcontinut')
      console.log(response)
    }
    deletePost()
  }, [])
  return <div>DeletePost</div>
}
