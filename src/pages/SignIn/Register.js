import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Register.css'
import axios from './api/axios'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../Contact/CheckMessage/CheckMessage'

const LOGIN_URL = '/register'

let iconSucces = <Checkmark size='40px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='40px' />
let iconLoading = <UseAnimations animation={loading} size={50} />

export default function (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [role, setRole] = useState('')
  const errRef = useRef()

  //confirm
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(iconLoading)
  const [message, setMessage] = useState('')
  const [valid, setValid] = useState(true)

  function checkPass() {
    var pass = document.getElementById('password')
    var confirm = document.getElementById('confirm_password')

    if (confirm.value !== pass.value) {
      pass.style.backgroundColor = 'pink'
      confirm.style.backgroundColor = 'pink'
      setValid(false)
      setMessage('Passwords must match')
    } else {
      pass.style.backgroundColor = 'white'
      confirm.style.backgroundColor = 'white'
      setValid(true)
      setMessage('')
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIcon(iconLoading)
    setMessage('Sending..')
    if (valid) {
      try {
        setCheckmark(true)
        const response = await axios.post(LOGIN_URL, {
          firstName: fname,
          lastName: lname,
          email: email,
          role: role,
          password: password,
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        console.log(JSON.stringify(response?.data))
        if (response.data.status !== 'ERROR') {
          setIcon(iconSucces)
          setMessage('User creat cu succes')
        } else {
          setIcon(iconError)
          setMessage('Oops, Eroare.Incearca din nou...')
        }
      } catch (err) {
        console.log(err)
        if (!err?.response) {
          setIcon(iconError)
          setMessage('No Server Response')
        } else if (err.response?.status === 400) {
          setIcon(iconError)
          setMessage('Missing Username or Password')
        } else if (err.response?.status === 401) {
          setIcon(iconError)
          setMessage('Unauthorized')
        } else {
          setIcon(iconError)
          setMessage('Register Failed')
        }
      }
      errRef.current.focus()
    } else {
      setIcon(iconError)
      setMessage('Password is invalid')
    }
  }

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form'>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Sign Up</h3>
          <div className='text-center'>
            Already registered?{' '}
            <span className='link-primary'>
              <a href='/signin'>Sign In</a>
            </span>
          </div>
          <div className='form-group mt-3'>
            <label>First Name</label>
            <input
              type='text'
              className='form-control mt-1'
              placeholder='First Name'
              required
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Last Name</label>
            <input
              type='text'
              className='form-control mt-1'
              placeholder='Last Name'
              required
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Email address</label>
            <input
              type='email'
              className='form-control mt-1'
              placeholder='Email Address'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              className='form-control mt-1'
              placeholder='Password'
              required
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              onInput={checkPass}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirm_password'
              className='form-control mt-1'
              placeholder='Confirm password'
              required
              id='confirm_password'
              onInput={checkPass}
              message={message}
            />
            <label>Role</label>
            <select
              class='form-select'
              aria-label='Default select example'
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option selected disabled>
                Select a role
              </option>
              <option value='admin'>Administrator</option>
              <option value='creator'>Content Creator</option>
            </select>
            <input
              type='checkbox'
              checked={checkmark}
              className='checkmark-check'
              onChange={() => {
                setCheckmark(!checkmark)
              }}
            />
            <CheckMessage
              visibility={checkmark}
              icon={icon}
              message={message}
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
