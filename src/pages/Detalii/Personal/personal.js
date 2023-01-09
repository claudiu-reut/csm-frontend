import React from 'react'
import { Link } from 'react-router-dom'
import './Personal.css'

const Personal = () => {
  return (
    <>
      <div class='main-container'>
        <Link to='/detalii/personal/antrenori'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src=''
                alt=''
              />
            </div>
            <h2>Antrenori</h2>
          </div>
        </Link>

        <Link to='/detalii/personal/jucatori'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src=''
                alt=''
              />
            </div>
            <h2>Jucatori</h2>
          </div>
        </Link>

      </div>
    </>
  )
}

export default Personal
