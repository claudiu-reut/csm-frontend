import React ,{useState}from 'react'
import Jucator from './Jucator'
import {Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Jucatori.css'
function Jucatori() {
  const [search, setSearch]= useState('')


    const jucatori_init=[
        {
            img:'./images/sergio.png',
            numeComplet:"Sergio",
            varsta:"17 Octombrie 2002",
            nationalitate:"Brazilia",
            post:"Libero",
            inaltime:"1.85m"
        },
        {
            img:'./images/sergio.png',
            numeComplet:"Ion",
            varsta:"20 Octombrie 2000",
            nationalitate:"Romaniaa",
            post:"Libero",
            inaltime:"1.85m"
        },
        {
            img:'./images/sergio.png',
            numeComplet:"Vasile",
            varsta:"12 Octombrie 2000",
            nationalitate:"Romaniaa",
            post:"Libero",
            inaltime:"1.85m"
        },
        {
            img:'./images/sergio.png',
            numeComplet:"Vasile",
            varsta:"12 Octombrie 2000",
            nationalitate:"Romaniaa",
            post:"Libero",
            inaltime:"1.85m"
        },
        {
            img:'./images/sergio.png',
            numeComplet:"Vasile",
            varsta:"12 Octombrie 2000",
            nationalitate:"Romaniaa",
            post:"Libero",
            inaltime:"1.85m"
        },
        {
            img:'./images/sergio.png',
            numeComplet:"Vasile",
            varsta:"12 Octombrie 2000",
            nationalitate:"Romaniaa",
            post:"Libero",
            inaltime:"1.85m"
        },
        {
            img:'./images/sergio.png',
            numeComplet:"Vasile",
            varsta:"12 Octombrie 2000",
            nationalitate:"Romaniaa",
            post:"Libero",
            inaltime:"1.85m"
        },
        {
            img:'./images/sergio.png',
            numeComplet:"Vasile",
            varsta:"12 Octombrie 2000",
            nationalitate:"Romaniaa",
            post:"Libero",
            inaltime:"1.85m"
        }
    ]
    
  return (
    <>
    <div className='searchPlayer'>
      <Form.Control className='searchForm'
        onChange={(e) => setSearch(e.target.value)}

        placeholder='search by name' />
    </div>
    <div className='cards'>

        {jucatori_init.filter((jucator) => {
          return search.toLowerCase() === '' ? jucator : jucator.numeComplet.toLowerCase().includes(search)
        })
          .map((jucator) => {
            return (
              <Jucator
                img={jucator.img}
                numeComplet={jucator.numeComplet}
                varsta={jucator.varsta}
                nationalitate={jucator.nationalitate}
                post={jucator.post}
                inaltime={jucator.inaltime} />
            )
          })}
      </div></>
  )
}

export default Jucatori