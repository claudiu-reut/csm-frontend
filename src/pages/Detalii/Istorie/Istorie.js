import React from 'react'
import './Istorie.css'

const Istorie = () => {
  return (
    <div className='istorie-container'>
      <section id='conference-timeline'>
        <div className='timeline-start'>Start</div>
        <div className='conference-center-line'></div>
        <div className='conference-timeline-content'>
          <div className='timeline-article'>
            <div className='content-left-container'>
              <div className='content-left'>
                <p>
                  Stadionul „Areni” a găzduit un meci internaţional de volei
                  masculin între echipa locală Voinţa şi Selecţionata Sindicală
                  Franceză <span className='article-number'>01</span>
                </p>
              </div>
            </div>
            <div className='meta-date'>
              <span className='date'>1959</span>
            </div>
          </div>

          <div className='timeline-article'>
            <div className='content-right-container'>
              <div className='content-right'>
                <p>
                  CSM Suceava a fost fondata
                  <span className='article-number'>02</span>
                </p>
              </div>
            </div>
            <div className='meta-date'>
              <span className='date'>1960</span>
            </div>
          </div>

          <div className='timeline-article'>
            <div className='content-left-container'>
              <div className='content-left'>
                <p>
                  Echipa a ajuns în semifinale în sezon{' '}
                  <span className='article-number'>03</span>
                </p>
              </div>
            </div>
            <div className='meta-date'>
              <span className='date'>1975</span>
            </div>
          </div>

          <div className='timeline-article'>
            <div className='content-right-container'>
              <div className='content-right'>
                <p>
                  Echipa a ajuns în sferturile de finală în sezon.{' '}
                  <span className='article-number'>04</span>
                </p>
              </div>
            </div>
            <div className='meta-date'>
              <span className='date'>1977</span>
            </div>
          </div>

          <div className='timeline-article'>
            <div className='content-left-container'>
              <div className='content-left'>
                <p>
                  A fost obţinut locul V în campionat şi locul IV în Cupa
                  României. <span className='article-number'>05</span>
                </p>
              </div>
            </div>
            <div className='meta-date'>
              <span className='date'>1983</span>
            </div>
          </div>

          <div className='timeline-article'>
            <div className='content-right-container'>
              <div className='content-right'>
                <p>
                  Promovarea formaţiei în prima ligă.{' '}
                  <span className='article-number'>06</span>
                </p>
              </div>
            </div>
            <div className='meta-date'>
              <span className='date'>2009</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Istorie
