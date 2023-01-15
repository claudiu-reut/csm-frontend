import React ,{useState,useEffect}from 'react'
import Jucator from './Jucator'
import {Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Jucatori.css'
import axios from "../../../api/axios";
function Jucatori() {
  const [search, setSearch]= useState('')
  const [jucatori,setJucatori]=useState([]);

  const getJucatori = async () => {
    const response = await axios.get('/getsimplepersonal')
    console.log(response);
    setJucatori(response.data);
  }
  useEffect(() => {
    getJucatori();
   
  }, []) 
    
  return (
    <>
    <div className='searchPlayer'>
      <Form.Control className='searchForm'
        onChange={(e) => setSearch(e.target.value)}

        placeholder='search by name' />
    </div>
    <div className='cards'>

        {jucatori.filter((jucator) => {
          const numeComplet=jucator.nume+" "+jucator.prenume
          return search.toLowerCase() === '' ? jucator : numeComplet.toLowerCase().includes(search)
        })
          .map((jucator) => {
            return (
              <Jucator
                img={jucator.img}
                nume={jucator.nume}
                prenume={jucator.prenume}
                data_nasterii={jucator.data_nasterii}
                nationalitate={jucator.nationalitate}
                post={jucator.post}
                inaltime={jucator.inaltime} 
                id_personal={jucator.id_personal}
                lot_curent={jucator.lot_curent}
                />
            )
          })}
      </div></>
  )
}

export default Jucatori