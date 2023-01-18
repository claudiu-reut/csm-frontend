import React from 'react'
import './Sponsor.css'
function Sponsor({ imagine, nume_complet, URLsite }) {
  return (
    <>
      <a href={URLsite} target='_blank'>
        <div className='sponsor'>
          <div className='sponsor-img'>
            <img src={`data:image/jpeg;base64,${imagine}`} className="imagine" alt={`Sigla ${nume_complet}`} />
          </div>
          <div className='sponsor-name'>
            <h1>{nume_complet}</h1>
          </div>
        </div>
      </a>
    </>
  )
}

export default Sponsor
