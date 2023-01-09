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
const Jucator = () => {
  return (
    <MDBRow className='row-cols-1 row-cols-md-6 g-3' >
      <MDBCol>
        <MDBCard>
          <MDBCardImage className='bg-image hover-zoom w-100'
            src={require('./images/sergio.png')} 
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle className='text-center'>Player Name </MDBCardTitle>
            <MDBCardText>
              <ul>
                <li>Nationalitate:Brazilia</li>
                <li>Post:Libero</li>
                <li>Data Nasterii:15 Octombrie 1975</li>
                <li>Inaltime:1.84m</li>
              </ul>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/042.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Player Name
            </MDBCardTitle>
            <MDBCardText>
              Player Information
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/043.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Player Name
            </MDBCardTitle>
            <MDBCardText>
              Player Information
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src='https://mdbootstrap.com/img/new/standard/city/044.webp'
            alt='...'
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>Player Name
            </MDBCardTitle>
            <MDBCardText>
              Player Information
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  )
}

export default Jucator
