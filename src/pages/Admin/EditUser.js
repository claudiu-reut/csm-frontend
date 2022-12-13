import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../SignIn/Register.css'
import axios from '../api/axios'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../CheckMessage/CheckMessage'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

let iconSucces = <Checkmark size='25px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='25px' />
let iconLoading = <UseAnimations animation={loading} size={35} />

function Register() {
  const match = useParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [role, setRole] = useState('')
  const errRef = useRef()
  const [user, setUser] = useState({})
  //confirm
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(iconLoading)
  const [message, setMessage] = useState('')
  const [textColor, setTextColor] = useState('black')
  const [valid, setValid] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      console.log(match.id)
      const response = await axios.get(`/getuser/${match.id}`)
      console.log(response)
      const user = response.data
      setEmail(user.email)
      setFname(user.firstName)
      setLname(user.lastName)
      setPassword(user.password)
      setConfirm(user.password)
      setRole(user.role)
    }
    getUser()
  }, [])

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
  useEffect(() => {
    setCheckmark(false)
    setIcon(iconLoading)
    setMessage('Logging..')
    setTextColor('black')
  }, [email, password, fname, lname, role])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIcon(iconLoading)
    setMessage('Logging..')
    setTextColor('black')
    if (valid) {
      try {
        setCheckmark(true)
        const response = await axios.put(`/edituser/${match.id}`, {
          firstName: fname,
          lastName: lname,
          email: email,
          role: role,
          password: password,
        })
        console.log(JSON.stringify(response?.data))
        if (response.data.status !== 'ERROR') {
          setIcon(iconSucces)
          setMessage('User editat cu succes')
          setTextColor('black')
        } else {
          setIcon(iconError)
          setMessage('Oops, Eroare.Incearca din nou...')
          setTextColor('red')
        }
      } catch (err) {
        console.log(err)
        if (!err?.response) {
          setIcon(iconError)
          setMessage('No Server Response')
          setTextColor('red')
        } else if (err.response?.status === 400) {
          setIcon(iconError)
          setMessage('Missing Username or Password')
          setTextColor('red')
        } else if (err.response?.status === 401) {
          setTextColor('red')
          setIcon(iconError)
          setMessage('Unauthorized')
        } else {
          setIcon(iconError)
          setMessage('Register Failed')
          setTextColor('red')
        }
      }
      errRef.current.focus()
    } else {
      setIcon(iconError)
      setMessage('Password is invalid')
      setTextColor('red')
    }
  }

  return (
    <div className='Auth-form-container'>
      <form className='Auth-form'>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Edit User</h3>
          <div className='text-center'></div>
          <div className='form-group mt-3'>
            <label>First Name</label>
            <input
              type='text'
              className='form-control mt-1'
              placeholder='First Name'
              required
              value={fname}
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
              value={lname}
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
              value={email}
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
              value={password}
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
              onChange={(e) => setConfirm(e.target.value)}
              message={message}
              value={confirm}
            />
            <label>Role</label>
            <select
              class='form-select'
              aria-label='Default select example'
              onChange={(e) => setRole(e.target.value)}
              required
              value={role}
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
              textColor={textColor}
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
export default Register
