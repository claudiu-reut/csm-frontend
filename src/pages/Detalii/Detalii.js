import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Detalii.css'

const Detalii = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div class='container-detalii'>
        <Link to='/detalii/istorie'>
          <div class='detalii-item'>
            <div className='detalii-image-div'>
              <img
                src='https://www.atlassport.ro/wp-content/uploads/2016/11/volleyball-history.jpg'
                alt=''
              />
            </div>
            <h2>Istorie</h2>
          </div>
        </Link>

        <Link to='/detalii/personal'>
          <div class='detalii-item'>
            <div className='detalii-image-div'>
              <img
                src='https://sportsv-d7c1.kxcdn.com/wp-content/uploads/2022/02/volei-csm-suceava-800x500.jpg'
                alt=''
              />
            </div>
            <h2>Personal</h2>
          </div>
        </Link>

        <Link to='/detalii/trofee'>
          <div class='detalii-item'>
            <div className='detalii-image-div'>
              <img
                src='https://monitorulcj.ro/documente/stories//2021/07/15/trofeul-campionatului-european-de-volei-prezent-astazi-la-cluj-napoca-unde-il-poti-admira.jpg'
                alt=''
              />
            </div>
            <h2>Trofee</h2>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Detalii
