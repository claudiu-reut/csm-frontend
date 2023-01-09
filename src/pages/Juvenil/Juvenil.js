import React from 'react'
import { Link } from 'react-router-dom'
import './Juvenil.css'

const Juvenil = () => {
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
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs3LNAlDLKuPf4RNaVlHyA70Hq-p6E8LOujg&usqp=CAU'
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
