import React from 'react'
import { Link } from 'react-router-dom'
import './Detalii.css'
import { useState } from 'react'
import Slider from 'react-slick'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import history from './images/history.jpg'
import membri from './images/membri.jpg'
import trofeu from './images/trofeu.jpg'
import viziune from './images/viziune.jpg'
const images = [history, membri, trofeu, viziune]

function SampleNextArrow({ onClick }) {
  return (
    <div className='arrow arrow-right' onClick={onClick}>
      <BsArrowRight />
    </div>
  )
}

function SamplePrevArrow({ onClick }) {
  return (
    <div className='arrow arrow-left' onClick={onClick}>
      <BsArrowLeft />
    </div>
  )
}
function EmptyArrow({ onClick }) {
  return <div></div>
}

function App() {
  const nav = useNavigate()
  const [slideIndex, setSlideIndex] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    beforeChange: (current, next) => setSlideIndex(next),
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
    customPaging: (current, next) => (
      <div className={current === slideIndex ? 'dot dot-active' : 'dot'}></div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          nextArrow: <EmptyArrow />,
          prevArrow: <EmptyArrow />,
        },
      },
    ],
  }

  return (
    <div className='container'>
      <h2 className='header'>Detalii club</h2>
      <div className='slider'>
        <Slider {...settings} onClick={nav('/detalii/istorie')}>
          {images.map((img, index) => (
            <div
              className={index === slideIndex ? 'slide slide-active' : 'slide'}
              key={index}
            >
              <img src={img} alt='' />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default App
