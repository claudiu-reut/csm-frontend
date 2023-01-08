import React from 'react'
import { Link } from 'react-router-dom'
import './Detalii.css'

const Detalii = () => {
  return (
    <>
      <div class='main-container'>
        <Link to='/detalii/istorie'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src=''
                alt=''
              />
            </div>
            <h2>Istorie</h2>
          </div>
        </Link>

        <Link to='/detalii/trofee'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src=''
                alt=''
              />
            </div>
            <h2>Trofee</h2>
          </div>
        </Link>

        <Link to='/detalii/viziune'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src=''
                alt=''
              />
            </div>
            <h2>Viziune</h2>
          </div>
        </Link>

        <Link to='/detalii/personal'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src=''
                alt=''
              />
            </div>
            <h2>Personal</h2>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Detalii
