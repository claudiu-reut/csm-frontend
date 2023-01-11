import React from 'react'
import './Jucator.css'
function Jucator({img,numeComplet,dataNasterii,nationalitate,post,inaltime}){
  return (
    
        <div className='card'>
          <img
            src={img} 
            alt='...'
            position='top'></img>
          <div className='card-body'>
            <h5 className='card-title'>{numeComplet}</h5>
            <p className='card-text'></p>
              <ul className='List'>
                <li>Nationalitate:{nationalitate}</li>
                <li>Post:{post}</li>
                <li>Data Nasterii:{dataNasterii}</li>
                <li>Inaltime:{inaltime}</li>
              </ul>
          </div>
        </div>
      
  )
}

export default Jucator

