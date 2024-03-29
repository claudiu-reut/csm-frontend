import { useRef, useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../CheckMessage/CheckMessage'
import AuthContext from './context/AuthProvider'
import axios from '../api/axios'
const LOGIN_URL = '/login'
let iconError = <VscError className='icon-inside' color='red' size='30px' />
let iconLoading = <UseAnimations animation={loading} size={40} />
const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  //const [auth, setAuth] = useState({})
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const { setAuth } = useContext(AuthContext)
  //validate
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(undefined)
  const [message, setMessage] = useState('')
  const [textColor, setTextColor] = useState('black')
  const nav = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setCheckmark(false)
    setMessage('Loading')
    setIcon(iconLoading)
    setTextColor('black')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCheckmark(true)
    try {
      const response = await axios.post(LOGIN_URL, {
        email: user,
        password: pwd,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      const accessToken = response?.data?.token
      const roles = response?.data?.role
      localStorage.setItem('token', accessToken)
      setUser('')
      setPwd('')
      if ((response.status = 200)) {
        if (roles === 'admin') {
          nav('/admin')
        } else {
          nav('/creatorcontinut')
        }
      }
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setMessage('No Server Response')
        setTextColor('red')
        setIcon(iconError)
      } else if (err.response?.status === 400) {
        setMessage('Missing Username or Password')
        setTextColor('red')
        setIcon(iconError)
      } else if (err.response?.status === 401) {
        setMessage('Invalid login or password')
        setTextColor('red')
        setIcon(iconError)
      } else {
        setMessage('Login Failed')
        setTextColor('red')
        setIcon(iconError)
      }
      errRef.current.focus()
    }
    // window.location.reload(false)
  }
  return (
    <div className='Add-form-container'>
      <form onSubmit={handleSubmit} className='Auth-form'>
        <h1 className='Auth-form-title'>Sign In</h1>
        <div className='Auth-form-content'>
          <div className='form-group mt-3'>
            <label htmlFor='username'>Email:</label>
            <input
              type='email'
              id='username'
              ref={userRef}
              autoComplete='on'
              className='form-control mt-1'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </div>
          <div className='form-group mt-3'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              className='form-control mt-1'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button type='submit' className='btn btn-primary'>
              Sign In
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

export default Login
