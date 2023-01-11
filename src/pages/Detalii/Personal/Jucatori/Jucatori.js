import React from 'react'
import Jucator from './Jucator'
import './Jucatori.css'
function Jucatori() {
    const jucatori_init=[
        {
            img:'./images/sergio.png',
            numeComplet:"Sergio",
            dataNasterii:"17 Octombrie 2002",
            nationalitate:"Brazilia",
            post:"Libero",
            inaltime:"1.85m"
        },
        {
            img:'./images/sergio.png',
            numeComplet:"Ion",
            dataNasterii:"20 Octombrie 2000",
            nationalitate:"Romaniaa",
            post:"Libero",
            inaltime:"1.85m"
        },
        {
            img:'./images/sergio.png',
            numeComplet:"Vasile",
            dataNasterii:"12 Octombrie 2000",
            nationalitate:"Romaniaa",
            post:"Libero",
            inaltime:"1.85m"
        }
    ]
  return (
    <div className='cards'>
      {jucatori_init
        .map((jucator) => {
          return (
            <Jucator
            img={jucator.img}
            numeComplet={jucator.numeComplet}
            dataNasterii={jucator.dataNasterii}
            nationalitate={jucator.nationalitate}
            post={jucator.post}
            inaltime={jucator.inaltime}
            />
          )
        })} 
    </div>
  )
}

export default Jucatori