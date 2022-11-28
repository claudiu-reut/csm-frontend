import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { decodeJwt } from 'jose'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SideBar.css'
import {
  SideBarContainer,
  Icon,
  CloseIcon,
  SideBarWrapper,
  SideBarLink,
  SideBarRoute,
  SideBtnWrap,
  SideBarMenu,
} from './SideBarComponents'

function SideBar({ isOpen, toggle }) {
  const [openDropDownSignIn, setOpenDropDownSignIn] = useState(false)
  const [openDropDownJuv, setOpenDropDownJuv] = useState(true)
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
    <SideBarContainer isOpen={isOpen}>
      <SideBtnWrap
        style={{ display: user === '' ? 'inherit' : 'none' }}
        onClick={toggle}
        className='btn-wrap'
      >
        <SideBarRoute to='signin'>Sign In</SideBarRoute>
      </SideBtnWrap>
      <div
        class='dropdown-sidebar'
        style={{ display: user !== '' ? 'block' : 'none' }}
        onClick={() => {
          setOpenDropDownSignIn(!openDropDownSignIn)
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
        <div
          class='dropdown-menu'
          aria-labelledby='dropdownMenuLink'
          onClick={toggle}
        >
          <button class='dropdown-item'>Action</button>
          <button class='dropdown-item'>Action</button>
          <button class='dropdown-item'>Action</button>
          <button class='dropdown-item'>Action</button>
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
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>

      <SideBarWrapper>
        <SideBarMenu>
          <SideBarLink to='/acasa' onClick={toggle}>
            Acasa
          </SideBarLink>
          <SideBarLink to='/detalii' onClick={toggle}>
            Detalii
          </SideBarLink>
          <SideBarLink to='/calendar' onClick={toggle}>
            Calendar
          </SideBarLink>
          <SideBarLink to='/Noutati' onClick={toggle}>
            Noutati
          </SideBarLink>
          <SideBarLink to='/juvenil' onClick={toggle}>
            Volei Juvenil
          </SideBarLink>
          <SideBarLink to='/sponsori' onClick={toggle}>
            Sponsori
          </SideBarLink>
          <SideBarLink to='/contact' onClick={toggle}>
            Contact
          </SideBarLink>
        </SideBarMenu>
      </SideBarWrapper>
    </SideBarContainer>
  )
}

export default SideBar
