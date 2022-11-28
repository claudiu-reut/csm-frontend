import React from 'react'
import { Link } from 'react-router-dom'
import ".//juvenil.css"

const Juvenil = () => {
  return (
    <>
  <div class="main-container">
    <div class="container">
      <h2>cadet</h2>
      <div class="btn">
        <Link to="/cadet">
        <button class="button" >Cadet</button>
        </Link>
      </div>
    </div>

    <div class="container">
      <h2>junior</h2>
      <div class="btn">
        <Link to="/junior">
        <button class="button" >Junior</button>
        </Link>
      </div>
    </div>
    <div class="container">
      <h2>sperante</h2>
      <div class="btn">
        <Link to="/sperante">
        <button class="button" >Sperante</button>
        </Link>
      </div>
    </div>
  </div>
    </>
  )
}

export default Juvenil
