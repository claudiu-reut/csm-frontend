import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Sponsor from './Sponsor/Sponsor'
import './Sponsori.css'
import axios from "../SignIn/api/axios"

const Sponsori = () => {
  const [sponsori, setSponsori] = useState([])
  useEffect(() => {
    async function fetchData() {
      
      const response = await axios.get("/getsponsors");
      console.log(response.data);
      setSponsori(response.data)
    }
    fetchData();
   
  }, [])
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '90%',
        }}
      >
        <div className='lot'>
          <h1>Lotul 2022-2023</h1>
          <div className='lot-container'>
            {sponsori
              .filter((sponsor) => sponsor.editia.includes('2022-2023'))
              .map((sponsor) => {
                return (
                  <Sponsor
                    key={sponsor.id_sponsor}
                    URLsigla={sponsor.linkImagine}
                    nume_complet={sponsor.denumire}
                    URLsite={sponsor.linkSite}
                    className='sponsor'
                  />
                )
              })}
          </div>
        </div>
        <div className='lot'>
          <h1>Lotul 2021-2022</h1>
          <div className='lot-container'>
            {sponsori
              .filter((sponsor) => sponsor.editia.includes('2021-2022'))
              .map((sponsor) => {
                return (
                  <Sponsor
                  key={sponsor.id_sponsor}
                    URLsigla={sponsor.linkImagine}
                    nume_complet={sponsor.denumire}
                    URLsite={sponsor.linkSite}
                    className='sponsor'
                  />
                )
              })}
          </div>
        </div>
        <div className='lot'>
          <h1>Lotul 2020-2021</h1>
          <div className='lot-container'>
            {sponsori
              .filter((sponsor) => sponsor.editia.includes('2020-2021'))
              .map((sponsor) => {
                return (
                  <Sponsor
                  key={sponsor.id_sponsor}
                    URLsigla={sponsor.linkImagine}
                    nume_complet={sponsor.denumire}
                    URLsite={sponsor.linkSite}
                    className='sponsor'
                  />
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sponsori
