import React from 'react'
import './Jucator.css'
function Jucator({img,numeComplet,varsta,nationalitate,post,inaltime}){

  function calcAge(varsta) {
    var birthday = +new Date(varsta);
    return ~~((Date.now() - birthday) / (31557600000));
  }

  return (
    
        <div className='card'>
          <div className='img-card'>
          <img
            src={require('./images/sergio.png')} 
            alt='...'
            position='top'></img></div>
          <div className='card-body'>
            <h5 className='card-title'>{numeComplet}</h5>
            <p className='card-text'></p>
              <ul className='List'>
                <li><b>Nationalitate:</b>{nationalitate}</li>
                <li><b>Post:</b>{post}</li>
                <li><b>Data Nasterii:</b>{calcAge(varsta)}</li>
                <li><b>Inaltime:</b>{inaltime}</li>
              </ul>
          </div>
        </div>
      
  )
}

export default Jucator

