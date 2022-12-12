import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ContactForm.css'
import axios from 'axios'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../CheckMessage/CheckMessage'
const app = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 6000,
})
let iconSucces = <Checkmark size='25px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='25px' />
let iconLoading = <UseAnimations animation={loading} size={35} />
const ContactForm = () => {
  const [status, setStatus] = useState('Send')
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(iconLoading)
  const [message, setMessage] = useState('Loading...')
  const [textColor, setTextColor] = useState('black')
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    setIcon(iconLoading)
    setMessage('Sending..')
    setTextColor('black')
    const { name, email, message } = e.target.elements
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    setStatus('Send')
    setCheckmark(true)
    try {
      let response = await app.post('/contact', {
        name: details.name,
        email: details.email,
        message: details.message,
      })
      if (response.data.status !== 'ERROR') {
        setIcon(iconSucces)
        setMessage('Mesaj trimis cu succes')
        setTextColor('black')
      } else {
        setIcon(iconError)
        setMessage('Oops, Eroare.Incearca din nou...')
        setTextColor('red')
      }
    } catch (error) {
      setIcon(iconError)
      setMessage('Oops, Eroare.Incearca din nou...')
      setTextColor('red')
    }
  }

  return (
   <div className='Contact-form-container'>
      <section>
        <div className='Email'>
          <h3>Email address</h3>
          <p>csm.suceava@sport.gov.ro</p>
        </div>
        <div className='ContactUs'>
          <h3>Contact us</h3>
          <li>0230 531 289</li>
          <li>0230 524 767</li>
        
      </div>
      <div className='locatie'>
        <h3>Location</h3>
        <p>Bulevardul 1 Decembrie 1918, nr.7, Suceava, Romania</p>
      </div><div className='map'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d21509.79141653611!2d26.2218165!3d47.6314975!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734fdd69a0678ff%3A0xc23be436f2c62390!2sBulevardul%201%20Decembrie%201918%207%2C%20Suceava!5e0!3m2!1sro!2sro!4v1670843248268!5m2!1sro!2sro"
          width="450"
          height="300"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>

      </div>
      </section>
      <form onSubmit={handleSubmit} className='Contact-form'>
        <div className='Contact-form-content'>
          <h3 className='Contact-form-title'>Lasă-ne un mesaj</h3>
          <div className='form-group mt-3'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              required
              className='form-control mt-1'
            />
          </div>
          <div className='form-group mt-3'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              required
              className='form-control mt-1'
            />
          </div>
          <div className='form-group mt-3'>
            <label htmlFor='message'>Message:</label>
            <textarea
              id='message'
              required
              rows={5}
              className='form-control mt-1'
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button type='submit' className='btn btn-primary'>
              {status}
            </button>
          </div>
          <input
            type='checkbox'
            checked={checkmark}
            className='checkmark-check'
            onChange={() => {
              setCheckmark(!checkmark)
            }}
          />
          <CheckMessage
            textColor={textColor}
            visibility={checkmark}
            icon={icon}
            message={message}
          />
        </div>
      </form>
    </div>
  )
}

export default ContactForm
