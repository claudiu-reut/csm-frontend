import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CgProfile } from 'react-icons/cg'
import { decodeJwt } from 'jose'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavBarComponents'

const Navbar = ({ toggle }) => {
  const [openDropDownSignIn, setOpenDropDownSignIn] = useState(false)
  const [openDropDownJuv, setOpenDropDownJuv] = useState(false)
  const token = localStorage.getItem('token')
  const [user, setUser] = useState('')
  const nav = useNavigate()
  const logOut = () => {
    localStorage.setItem('token', undefined)
    nav('/signin')
    setUser('')
  }
  useEffect(() => {
    const func = async () => {
      try {
        await setUser(decodeJwt(token).name)
      } catch (err) {
        console.log(err)
      }
    }
    func()
  }, [])
  return (
    <Nav>
      <NavLink to='/'>
        <img
          src={require('./images/csm-logo.png')}
          alt='Logo'
          style={{ width: '80px', paddingTop: '2rem' }}
        />
      </NavLink>
      <Bars onClick={toggle} />
      <NavMenu>
        <NavLink to='/acasa'>Acasa</NavLink>
        <NavLink to='/detalii' activestyle='true'>
          Detalii Club
        </NavLink>
        <NavLink to='/calendar' activestyle='true'>
          Calendar
        </NavLink>
        <NavLink to='/noutati' activestyle='true'>
          Noutati
        </NavLink>
        <NavLink
          to='/juvenil'
          activestyle='true'
          onMouseEnter={() => {
            setOpenDropDownJuv(true)
          }}
          onMouseLeave={() => {
            setOpenDropDownJuv(false)
          }}
        >
          <div class='dropdown'>
            Volei Juvenil
            <input
              style={{ display: 'none' }}
              type='checkbox'
              name='chk-dropdown'
              id='chk-dropdown'
              checked={openDropDownJuv}
              onChange={() => {
                setOpenDropDownJuv(!openDropDownJuv)
              }}
            />
            <div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>
              <button class='dropdown-item'>Action</button>
              <button
                class='dropdown-item'
                onClick={() => {
                  nav('/juvenil/cadet')
                }}
              >
                Cadet
              </button>
              <button class='dropdown-item'>Another action</button>
              <button class='dropdown-item'>Another action</button>
              <button class='dropdown-item'>Another action</button>
            </div>
          </div>
        </NavLink>
        <NavLink to='/sponsori' activestyle='true'>
          Sponsori
        </NavLink>
        <NavLink to='/contact' activestyle='true'>
          Contact
        </NavLink>
        <NavBtn style={{ display: user === '' ? 'inherit' : 'none' }}>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
        <div
          class='dropdown'
          style={{ display: user !== '' ? 'block' : 'none' }}
          onMouseEnter={() => {
            setOpenDropDownSignIn(true)
          }}
          onMouseLeave={() => {
            setOpenDropDownSignIn(false)
          }}
        >
          <div className='profile'>
            <CgProfile size={30} />
            <p>Hi, {user}</p>
          </div>

          <input
            style={{ display: 'none' }}
            type='checkbox'
            name='chk-dropdown'
            id='chk-dropdown'
            checked={openDropDownSignIn}
            onChange={() => {
              setOpenDropDownSignIn(!openDropDownSignIn)
            }}
          />
          <div class='dropdown-menu' aria-labelledby='dropdownMenuLink'>
            <button
              class='dropdown-item'
              onClick={() => {
                nav('/admin')
              }}
            >
              Administration
            </button>
            <button class='dropdown-item'>Another action</button>
            <button
              class='dropdown-item'
              onClick={() => {
                logOut()
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </NavMenu>
    </Nav>
  )
}

export default Navbar
