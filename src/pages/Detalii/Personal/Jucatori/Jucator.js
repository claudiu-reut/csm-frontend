import React, { useEffect, useState } from 'react'
import './Jucator.css'
import axios from '../../../api/axios'
function Jucator({
  img,
  nume,
  prenume,
  data_nasterii,
  nationalitate,
  post,
  inaltime,
  id_personal,
  lot_curent,
}) {
  const numeComplet = nume + ' ' + prenume
  function calcAge(data_nasterii) {
    var birthday = +new Date(data_nasterii)

    return ~~((Date.now() - birthday) / 31557600000)
  }

  return (
    <div className='card'>
      <div className='img-card'>
        <img
          className='imag'
          src={`data:image/jpeg;base64,${img}`}
          alt='...'
          position='top'
        ></img>
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{numeComplet}</h5>
        <p className='card-text'></p>
        <ul className='List'>
          <li>
            <b>Naționalitate:</b>
            {nationalitate}
          </li>
          <li>
            <b>Poziție:</b>
            {post}
          </li>
          <li>
            <b>Vârstă:</b>
            {calcAge(data_nasterii)}
          </li>
          <li>
            <b>Inalțime:</b>
            {inaltime}
          </li>
          <li>
            <b>Lot:</b>
            {lot_curent}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Jucator
