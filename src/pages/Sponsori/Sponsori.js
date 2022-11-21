import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Sponsor from './Sponsor/Sponsor'
import './Sponsori.css'
import axios from "../SignIn/api/axios"
const sponsori_init = [
  {
    lot: '2022-2023',
    URLsigla: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lidl-Logo.svg/1024px-Lidl-Logo.svg.png`,
    nume_complet: 'LIDL',
    URLsite: `https://www.lidl.ro/`,
  },
  {
    lot: '2022-2023 2021-2022',
    URLsigla: `https://www.liveradio.ie/files/images/329741/resized/180x172c/kiss_fm_romania.jpg`,
    nume_complet: 'KISS FM',
    URLsite: `https://www.kissfm.ro/`,
  },
  {
    lot: '2022-2023 2020-2021',
    URLsigla: `https://play-lh.googleusercontent.com/dbY_2K9PV8YAUYGgDlyHKG2hAT5k9yJ1F1V0sDhu_dO3_HXfNab7XICkXc23f3OgDZZI`,
    nume_complet: 'IKEA',
    URLsite: `https://www.ikea.com/`,
  },
  {
    lot: '2022-2023',
    URLsigla: `https://upload.wikimedia.org/wikipedia/commons/7/70/Banca_Transilvania_Logo.png`,
    nume_complet: 'BT',
    URLsite: `https://www.bancatransilvania.ro/`,
  },
  {
    lot: '2022-2023 2020-2021',
    URLsigla: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Kaufland_Logo.svg/1200px-Kaufland_Logo.svg.png`,
    nume_complet: 'KAUFLAND',
    URLsite: `https://www.kaufland.ro/`,
  },
  {
    lot: '2022-2023',
    URLsigla: `https://bucurestimall.ro/wp-content/uploads/2019/12/Carturesti-LOGO_550x550px.jpg`,
    nume_complet: 'Carturesti',
    URLsite: `https://www.carturesti.ro/`,
  },
  {
    lot: '2022-2023 2020-2021',
    URLsigla: `https://seeklogo.com/images/P/Petrom-logo-036EBED180-seeklogo.com.png`,
    nume_complet: 'Petrom',
    URLsite: `https://www.petrom.ro/`,
  },
  {
    lot: '2022-2023',
    URLsigla: `https://seeklogo.com/images/R/Raiffeisen-logo-BC017CD109-seeklogo.com.png`,
    nume_complet: 'Raiffeisen BANK',
    URLsite: `https://www.raiffeisen.ro/`,
  },
  {
    lot: '2022-2023',
    URLsigla: `https://i0.wp.com/www.numeroservicioalcliente.com/wp-content/uploads/2018/07/344.png?fit=300%2C300&ssl=1`,
    nume_complet: 'SCHENKER',
    URLsite: `https://www.dbschenker.com/`,
  },
  {
    lot: '2022-2023 2021-2022 2020-2021',
    URLsigla: `https://upload.wikimedia.org/wikipedia/ro/2/29/Pepco_logo.jpg`,
    nume_complet: 'Pepco',
    URLsite: `https://www.pepco.ro/`,
  },
  {
    lot: '2022-2023 2021-2022 2020-2021',
    URLsigla: `https://media.timisoreni.ro/upload/photo/2020-06/farmacia-catena-timisoara-8_large.png`,
    nume_complet: 'Catena',
    URLsite: `https://www.catena.ro/`,
  },
  {
    lot: '2021-2022 2020-2021',
    URLsigla: `https://brasov.cnfc.ro/wp-content/uploads/2018/08/iquest-logo.png`,
    nume_complet: 'IQUEST',
    URLsite: `https://www.nagaro.com/`,
  },
  {
    lot: '2022-2023 2020-2021',
    URLsigla: `http://upload.wikimedia.org/wikipedia/commons/9/9a/Rock-FM-2017-2019.png`,
    nume_complet: 'ROCK FM',
    URLsite: `https://www.rockfm.ro/`,
  },
  {
    lot: '2021-2022 2022-2023',
    URLsigla: `https://www.orange.ro/blackfriday/_next/static/media/orange-logo.bca59c66.svg`,
    nume_complet: 'Orange',
    URLsite: `https://www.orange.ro/`,
  },
  {
    lot: '2021-2022 2022-2023',
    URLsigla: `https://seeklogo.com/images/C/Centric_Software-logo-26394805D7-seeklogo.com.gif`,
    nume_complet: 'Centric',
    URLsite: `https://www.careers.centric.eu/`,
  },
  {
    lot: '2021-2022',
    URLsigla: `https://ideea-fishing.ro/wp-content/uploads/2021/03/fan-courier-logo.png`,
    nume_complet: 'FAN Courier',
    URLsite: `https://www.fancourier.ro/`,
  },
  {
    lot: '2021-2022',
    URLsigla: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSoRHQpFGimj194Zv2H2O9x9gaEAOLyebjgH3o6bp7sUd89DxLKWn1O5VC8QmTmESNCo&usqp=CAU`,
    nume_complet: 'Dent Estet',
    URLsite: `https://www.dentestet.ro/`,
  },
  {
    lot: '2021-2022 2020-2021',
    URLsigla: `https://www.unitedwaygt.org/wp-content/uploads/2021/06/uwgt-theme-icon.png`,
    nume_complet: 'United Way',
    URLsite: `https://www.unitedway.ro/`,
  },
  {
    lot: '2021-2022 2020-2021',
    URLsigla: `https://seeklogo.com/images/P/Pro_Energ_Romania-logo-3566A53274-seeklogo.com.gif`,
    nume_complet: 'PRO ENERG',
    URLsite: `https://www.proenerg.com.ro/`,
  },
]
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
