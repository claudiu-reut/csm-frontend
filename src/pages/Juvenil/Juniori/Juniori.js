import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PersonalSingle from '../../Detalii/Personal/PersonalSingle/PersonalSingle.js'
import axios from '../../api/axios'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
let iconLoading = (
  <UseAnimations animation={loading} size={55} strokeColor='blue' />
)
const Juniori = () => {
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const [personal, setPersonal] = useState([])
  const getJucatori = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('/getpersonal')
      setPersonal(response.data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    getJucatori()
  }, [])
  return (
    <div className='juvenil-container'>
      <div className='juvenil-lot'>
        <h1 className='juvenil-header'>
          Lotul Sucevean De Juniori {params.gen} U20
        </h1>
        <div className='lot-image'>
          <img
            src={
              params.gen === 'masculin'
                ? 'https://img.svnews.ro/foto/2019/03/07/171005/6eb428a8fc15ce1c915ce8a1d06500325.jpg'
                : 'https://img.svnews.ro/foto/2018/03/02/143880/781c08692a02044100dcaa8d706500325.jpg'
            }
            alt={`imagine juniori U20 ${params.gen}`}
          />
        </div>
        <h2 className='lot-title'>Componenta Lotului</h2>
        <div className='lot-players'>
          <div
            className='loading-content-spinner'
            style={{ display: isLoading ? 'flex' : 'none' }}
          >
            {iconLoading}
          </div>
          {personal.map((persoana) => {
            if (
              persoana.tip_personal === 'juniori' &&
              persoana.gen === params.gen
            ) {
              return (
                <PersonalSingle
                  personal={persoana}
                  key={persoana.id_personal}
                />
              )
            }
          })}
        </div>
        <h2 className='lot-title'>Antrenori</h2>
        <div className='lot-coaches'>
          <div
            className='loading-content-spinner'
            style={{ display: isLoading ? 'flex' : 'none' }}
          >
            {iconLoading}
          </div>
          {personal.map((persoana) => {
            if (persoana.tip_personal === 'antrenor') {
              return (
                <PersonalSingle
                  personal={persoana}
                  key={persoana.id_personal}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Juniori
