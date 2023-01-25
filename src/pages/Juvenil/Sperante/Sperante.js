import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Sperante.css'
import PersonalSingle from '../../Detalii/Personal/PersonalSingle/PersonalSingle.js'
import axios from '../../api/axios'
const Sperante = () => {
  const params = useParams()
  const [personal, setPersonal] = useState([])
  const getJucatori = async () => {
    const response = await axios.get('/getpersonal')
    setPersonal(response.data)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    getJucatori()
  }, [])
  return (
    <div className='sperante-container'>
      <div className='sperante-lot'>
        <h1 className='sperante-header'>
          Lotul Sucevean De Sperante {params.gen} U17
        </h1>
        <div className='lot-image'>
          <img
            src={
              params.gen === 'masculin'
                ? 'https://www.gazetasv.ro/wp-content/uploads/2022/04/Volei-LPS-Suceava-Sperante-1000x563.jpg'
                : 'https://doarvolei.ro/wp-content/uploads/2021/07/sperante-kinder-suceava.jpg'
            }
            alt={`imagine sperante U17 ${params.gen}`}
          />
        </div>
        <h2 className='lot-title'>Componenta Lotului</h2>
        <div className='lot-players'>
          {personal.map((persoana) => {
            if (
              persoana.tip_personal === 'sperante' &&
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
      </div>
    </div>
  )
}

export default Sperante
