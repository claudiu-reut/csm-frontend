import { useRef, useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../Contact/CheckMessage/CheckMessage'
//import AuthContext from "./context/AuthProvider";
import axios from './api/axios'
const LOGIN_URL = '/login'
let iconSucces = <Checkmark size='40px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='40px' />
let iconLoading = <UseAnimations animation={loading} size={50} />
const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [auth, setAuth] = useState({})
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')

  //validate
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(undefined)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const nav = useNavigate()
  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setCheckmark(false)
    setMessage('Loading')
    setIcon(iconLoading)
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
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.user
      const roles = response?.data?.role
      setAuth({ user, pwd, roles, accessToken })
      localStorage.setItem('token', accessToken)
      setUser('')
      setPwd('')
      setSuccess(true)

      if ((response.status = 200)) {
        nav('/acasa')
      }
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setMessage('No Server Response')
        setIcon(iconError)
      } else if (err.response?.status === 400) {
        setMessage('Missing Username or Password')
        setIcon(iconError)
      } else if (err.response?.status === 401) {
        setMessage('Unauthorized')
        setIcon(iconError)
      } else {
        setMessage('Login Failed')
        setIcon(iconError)
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='/acasa'>Go to Home</a>
          </p>
        </section>
      ) : (
        <div className='Auth-form-container'>
          <section>
            <form onSubmit={handleSubmit} className='Auth-form1'>
              <h1 className='Auth-form-title'>Sign In</h1>
              <div className='Auth-form-content'>
                <div className='form-group mt-3'>
                  <label htmlFor='username'>Email:</label>
                  <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
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
                <CheckMessage
                  visibility={checkmark}
                  icon={icon}
                  message={message}
                />
                <div className='d-grid gap-2 mt-3'>
                  <button className='btn btn-primary'>Sign In</button>
                </div>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  )
}

export default Login
