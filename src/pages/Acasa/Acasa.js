import React from 'react'
import { decodeJwt } from 'jose'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Acasa = () => {
  const token = localStorage.getItem('token')
  const [user, setUser] = useState('')
  const nav = useNavigate()
  const logOut = () => {
    localStorage.setItem('token', undefined)
    nav('/acasa')
  }
  useEffect(() => {
    console.log(token)
    try {
      console.log(decodeJwt(token))
      setUser(decodeJwt(token).email)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90%',
        }}
      >
        <h1>Acasa, bun venit {user}</h1>
        <button onClick={logOut}>Sign Out</button>
      </div>
    </>
  )
}

export default Acasa
