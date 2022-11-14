import React from 'react'
import ImageShadow from 'react-image-shadow'
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavBarComponents'
const Navbar = ({ toggle }) => {
  return (
    <Nav>
      <NavLink to='/'>
        <img
          src={require('./images/csm-logo2.png')}
          alt='Logo'
          const style={{ maxWidth: '80px', paddingTop: '3rem'}}
        />
        {/* <h1>Logo</h1> */}
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
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </NavMenu>
    </Nav>
  )
}

export default Navbar
