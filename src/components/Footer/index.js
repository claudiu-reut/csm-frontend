import React, { useEffect, useState } from 'react'
import Sponsor from '../../pages/Sponsori/Sponsor/Sponsor'
import axios from '../../pages/api/axios'
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import { FaHome, FaEnvelope, FaPhone, FaFax } from 'react-icons/fa'
import './Footer.css'
function Footer() {
  const [sponsori, setSponsori] = useState([])
  const get_sponsors = async () => {
    try {
      const response = await axios.get('/getsponsors')
      setSponsori(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    get_sponsors()
  }, [])
  return (
    <div className='footer'>
      <div className='footer-sponsors-section'>
        <h2 className='footer-sponsors-section-name'>
          Mulțumim partenerilor CSM Suceava
        </h2>
        <div className='footer-sponsors'>
          {sponsori
            .filter((sponsor) => sponsor.editia.includes('2022-2023'))
            .map((sponsor) => {
              return (
                <Sponsor
                  key={sponsor.id_sponsor}
                  imagine={sponsor.imagine}
                  nume_complet={sponsor.denumire}
                  URLsite={sponsor.linkSite}
                  className='sponsor'
                />
              )
            })}
        </div>
      </div>
      <MDBFooter className=' footer text-center ' bgColor='blue' color='white'>
        <MDBContainer className='p-4'>
          <section className='mb-4'>
            <h3 className='text-white fw-bold'>Istoria noastră</h3>
            <p>
              CSM Suceava a fost fondat pe 19 iulie 1972 și includea secțiuni de
              fotbal, atletism, rugby și volei. Pe parcursul anilor, mai multe
              secțiuni au fost adăugate, printre care tir cu arcul, baseball,
              box, lupte greco-romane, handbal, hochei pe gheață, canotaj,
              patinaj viteză și înot.
            </p>
          </section>
          <section className=''>
            <MDBRow>
              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <a href='/acasa' className=' text-uppercase text-white '>
                  <h5>Acasa</h5>
                </a>
                <a href='/calendar' className=' text-uppercase text-white'>
                  <h5>Calendar</h5>
                </a>
                <a href='/noutati' className=' text-uppercase text-white'>
                  <h5>Noutati</h5>
                </a>
                <a href='/sponsori' className=' text-uppercase text-white'>
                  <h5>Sponsori</h5>
                </a>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <h5 className='text-uppercase'>DETALII CLUB</h5>
                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='/detalii/istorie' className='text-white'>
                      Istorie
                    </a>
                  </li>
                  <li>
                    <a href='/detalii/trofee' className='text-white'>
                      Trofee
                    </a>
                  </li>
                  <li>
                    <a href='/detalii/personal' className='text-white'>
                      Personal
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <h5 className='text-uppercase' href='/calendar'>
                  Volei Juvenil
                </h5>

                <ul className='list-unstyled mb-0'>
                  <li>
                    <a href='/juvenil/cadet' className='text-white'>
                      Cadet
                    </a>
                  </li>
                  <li>
                    <a href='/juvenil/junior' className='text-white'>
                      Junior
                    </a>
                  </li>
                  <li>
                    <a href='/juvenil/sperante' className='text-white'>
                      Sperante
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
                <h5 className='text-uppercase' href='/contact'>
                  Contact
                </h5>
                <p>
                  <FaHome></FaHome> Bulevardul 1 Decembrie 1918, nr.7, Suceava,
                  Romania
                </p>
                <p>
                  {' '}
                  <FaEnvelope></FaEnvelope> csm.suceava@sport.gov.ro
                </p>
                <p>
                  {' '}
                  <FaPhone></FaPhone> 0230 531 289
                </p>
                <p>
                  {' '}
                  <FaFax></FaFax> 0230 524 767
                </p>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>
      </MDBFooter>
    </div>
  )
}

export default Footer
