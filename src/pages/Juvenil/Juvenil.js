import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Juvenil.css'

const Juvenil = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div class='main-container'>
        <Link to='/juvenil/cadet'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAIJziTsA4RHNioxUmKoycBp_5NtgTPbSalQ&usqp=CAU'
                alt=''
              />
            </div>
            <h2>Cadet</h2>
          </div>
        </Link>

        <Link to='/juvenil/junior'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src='https://img.svnews.ro/foto/2018/02/08/142594/6d0c00543c28a33be4db9af6d.jpg'
                alt=''
              />
            </div>
            <h2>Junior</h2>
          </div>
        </Link>

        <Link to='/juvenil/sperante'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw9xwMBcVXFvbHs2lmuSuiB0bYQhMrMIxpWw&usqp=CAU'
                alt=''
              />
            </div>
            <h2>Sperante</h2>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Juvenil
