import React, { useState } from 'react'
import './PersonalSingle.css'
function Personal({ personal }) {
  const [numeComplet, setNumeComplet] = useState(
    personal.nume + ' ' + personal.prenume
  )
  function calcAge(data_nasterii) {
    var birthday = +new Date(data_nasterii)

    return ~~((Date.now() - birthday) / 31557600000)
  }

  return (
    <div className='card'>
      <div className='img-card'>
        <img
          className='imag'
          src={`data:image/jpeg;base64,${personal.imagine}`}
          alt='...'
          position='top'
        ></img>
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{numeComplet}</h5>
        <p className='card-text'></p>
        <ul className='List'>
          <li>
            <b>Poziție:</b>
            {personal.post}
          </li>
          <li>
            <b>Vârstă:</b>
            {calcAge(personal.data_nasterii)}
          </li>
          <li>
            <b>Inalțime:</b>
            {personal.inaltime}
          </li>
          <li>
            <b>Lot:</b>
            {personal.lot_curent}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Personal
