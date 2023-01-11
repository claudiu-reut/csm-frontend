import React from 'react'
import './Jucator.css'
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
function Jucator({img,numeComplet,dataNasterii,nationalitate,post,inaltime}){
  return (
    
        <MDBCard>
          <MDBCardImage className='bg-image hover-zoom w-100'
            src={img} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle className='text-center'>{numeComplet} </MDBCardTitle>
            <MDBCardText>
              <ul className='List'>
                <li>Nationalitate:{nationalitate}</li>
                <li>Post:{post}</li>
                <li>Data Nasterii:{dataNasterii}</li>
                <li>Inaltime:{inaltime}</li>
              </ul>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      
  )
}

export default Jucator

