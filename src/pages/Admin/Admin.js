import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { decodeJwt } from 'jose'
import { useNavigate } from 'react-router-dom'
function Admin() {
  const [user, setUser] = useState('')
  const [role, setRole] = useState('')
  const token = localStorage.getItem('token')
  const nav = useNavigate()
  useEffect(() => {
    if (token) {
      setUser(decodeJwt(token).email)
      setRole(decodeJwt(token).role)
    }
    if (role !== 'admin') {
      nav('/acasa')
    }
  }, [])
  console.log(user)
  console.log(role)
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
      }}
    >
      <h1>Admin</h1>
    </div>
  )
}

export default Admin
