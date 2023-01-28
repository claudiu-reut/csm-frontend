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
        <Link to='/juvenil/juniori/feminin'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src='https://img.svnews.ro/foto/2018/03/02/143880/781c08692a02044100dcaa8d706500325.jpg'
                alt='imagine cadeti U20 feminin'
              />
            </div>
            <h2>Juniori Feminin</h2>
          </div>
        </Link>
        <Link to='/juvenil/juniori/masculin'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src='https://img.svnews.ro/foto/2019/03/07/171005/6eb428a8fc15ce1c915ce8a1d06500325.jpg'
                alt='imagine juniori U20 masculin'
              />
            </div>
            <h2>Juniori Masculin</h2>
          </div>
        </Link>
        <Link to='/juvenil/cadeti/feminin'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src='https://doarvolei.ro/wp-content/uploads/2016/04/volei-nationala-sperante.jpg'
                alt='imagine cadeti U18 feminin'
              />
            </div>
            <h2>Cadeti Feminin</h2>
          </div>
        </Link>
        <Link to='/juvenil/cadeti/masculin'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src='https://img.svnews.ro/foto/2022/10/12/314804/a50ccb4fc5352d141e2e877f1.jpg'
                alt='imagine cadeti U18 masculin'
              />
            </div>
            <h2>Cadeti Masculin</h2>
          </div>
        </Link>

        <Link to='/juvenil/sperante/feminin'>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src='https://doarvolei.ro/wp-content/uploads/2021/07/sperante-kinder-suceava.jpg'
                alt='imagine sperante U17 feminin'
              />
            </div>
            <h2>Sperante Feminin</h2>
          </div>
        </Link>

        <Link to={`/juvenil/sperante/masculin`}>
          <div class='container-lot'>
            <div className='image-div'>
              <img
                src='https://www.gazetasv.ro/wp-content/uploads/2022/04/Volei-LPS-Suceava-Sperante-1000x563.jpg'
                alt='imagine sperante U17 masculin'
              />
            </div>
            <h2>Sperante Masculin</h2>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Juvenil
