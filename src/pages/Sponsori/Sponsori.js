import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Sponsor from './Sponsor/Sponsor'
import './Sponsori.css'
import axios from '../api/axios'
import UseAnimations from 'react-useanimations'
import { Oval } from 'react-loading-icons'
// let iconLoading = (
//   <UseAnimations animation={loading} size={45} strokeColor='blue' />
// )
let iconLoading = <Oval strokeOpacity={1} stroke='#06bcee' fill='blue' />
const Sponsori = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [sponsori, setSponsori] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    async function fetchData() {
      setIsLoading(true)
      const response = await axios.get('/getsponsors')
      setSponsori(response.data)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: '90vh',
        }}
      >
        <div className='lot'>
          <h1>Lotul 2022-2023</h1>
          <div className='lot-container'>
            <div
              className='loading-content-spinner'
              style={{ display: isLoading ? 'flex' : 'none' }}
            >
              {iconLoading}
            </div>
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
            <div
              className='loading-content-spinner'
              style={{ display: isLoading ? 'flex' : 'none' }}
            >
              {iconLoading}
            </div>
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
            <div
              className='loading-content-spinner'
              style={{ display: isLoading ? 'flex' : 'none' }}
            >
              {iconLoading}
            </div>
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
