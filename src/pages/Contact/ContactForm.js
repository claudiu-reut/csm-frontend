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
