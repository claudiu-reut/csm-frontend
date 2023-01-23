import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Register.css'
import axios from '../api/axios'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../CheckMessage/CheckMessage'
import { useEffect } from 'react'

const LOGIN_URL = '/register'

let iconSucces = <Checkmark size='25px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='25px' />
let iconLoading = <UseAnimations animation={loading} size={35} />

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [role, setRole] = useState('')
  const [selectedFile,setSelectedFile] = useState();
  const errRef = useRef()

  //confirm
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(iconLoading)
  const [message, setMessage] = useState('')
  const [textColor, setTextColor] = useState('black')
  const [valid, setValid] = useState(true)
  const user = new FormData();
  const handleFile=(e)=>{
    setSelectedFile(e.target.files[0])
    const src=e.target.files[0];
    const imag=document.getElementById("image");
   
  
  
   imag.src=URL.createObjectURL(src);
 
  }
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
    window.scrollTo(0, 0)
  }, [])
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
        user.append('firstName',fname);
        user.append('lastName',lname);
        user.append('email',email);
        user.append('password',password)
        user.append('role',role);
        user.append('imagine',selectedFile);
        const response = await axios({
          method: 'post',
          url: 'register',
          data: user,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        console.log(JSON.stringify(response?.data))
        if (response.data.status !== 'ERROR') {
          setIcon(iconSucces)
          setMessage('User creat cu succes')
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
    <div className='Register-form-container'>
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
          </div>
          <div className='form-group mt-3'>
          <label>Imagine</label>
            <input
              type='file'
              accept='image/png, image/gif, image/jpeg'
              onChange={(e) => handleFile(e)}
            />
              <div className='form-group mt-2'>
              <img id="image" src="./placeholder.jpg" alt="imagine" className='imgprev'  />
                </div>
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
export default Register
