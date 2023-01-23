import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { decodeJwt } from 'jose'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineSettings } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'
import { TbHandClick } from 'react-icons/tb'
import './SideBar.css'
import axios from '../../pages/api/axios'
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
import data from '../NavBar/images/img.json'
function SideBar({ isOpen, toggle }) {
  const [openDropDownSignIn, setOpenDropDownSignIn] = useState(false)
  const [openDropDownJuv, setOpenDropDownJuv] = useState(true)
  const token = localStorage.getItem('token')
  const [img, setImg] = useState(data.image)
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
        const response = await axios.get(
          `/getuserphoto/${decodeJwt(token).user_id}`
        )
        const result = response.data
        if (result) setImg(result)
        else setImg(data.image)
      } catch (err) {
        console.log(err)
      }
    }
    func()
  }, [token])
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
        onMouseEnter={() => {
          setOpenDropDownSignIn(true)
        }}
        onMouseLeave={() => {
          setOpenDropDownSignIn(false)
        }}
      >
        <div className='profile'>
          <img src={`data:image/jpeg;base64,${img}`} alt='user profile image' />
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
          <div
            className='dropdown-item'
            onClick={() => {
              nav('/admin')
            }}
          >
            <MdOutlineSettings size={20} />
            <button>Administrare</button>
          </div>
          <div
            className='dropdown-item'
            onClick={() => {
              nav('/profil')
            }}
          >
            <CgProfile size={20} />
            <button>Profil</button>
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
