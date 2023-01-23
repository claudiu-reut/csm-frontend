import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MdOutlineSettings } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'
import { TbHandClick } from 'react-icons/tb'
import { decodeJwt } from 'jose'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../pages/api/axios'
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
  const token = localStorage.getItem('token')
  const [user, setUser] = useState('')
  const [img,setImg] = useState(' ')
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
        const response = await axios.get(`/getphoto/${decodeJwt(token).user_id}`)
        const result=response.data;
        console.log(result.imagine);
        setImg(result);
      } catch (err) {
        console.log(err)
      }
    }
    func()
  }, [token])
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
        <NavLink to='/juvenil' activestyle='true'>
          Volei Juvenil
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
          className='dropdown'
          style={{ display: user !== '' ? 'block' : 'none' }}
          onMouseEnter={() => {
            setOpenDropDownSignIn(true)
          }}
          onMouseLeave={() => {
            setOpenDropDownSignIn(false)
          }}
        >
          <div className='profile'>
            <img
              src={`data:image/jpeg;base64,${img}`}
              alt='user profile image'
            />
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
          <div className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
            <div
              className='dropdown-item'
              onClick={() => {
                nav('/admin')
              }}
            >
              <MdOutlineSettings size={20} />
              <button>Administration</button>
            </div>
            <div className='dropdown-item'>
              <TbHandClick size={20} />
              <button>Another action</button>
            </div>
            <div className='dropdown-item'>
              <TbHandClick size={20} />
              <button>Another action</button>
            </div>
            <div
              className='dropdown-item'
              onClick={() => {
                logOut()
              }}
            >
              <BiLogOut size={20} />
              <button>Sign Out</button>
            </div>
          </div>
        </div>
      </NavMenu>
    </Nav>
  )
}

export default Navbar
