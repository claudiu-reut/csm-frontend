import React from 'react'
import {Nav, NavLink, Bars, NavMenu,NavBtn,NavBtnLink} from './NavBarComponents'
const Navbar = () => {
  return (
    <Nav>
        <NavLink to="/">
            <h1>Logo</h1>
        </NavLink>
        <Bars/>
        <NavMenu>
            <NavLink to="/acasa" activeStyle >
                Acasa
            </NavLink>
            <NavLink to="/detalii" activeStyle >
                Detalii Club
            </NavLink>
            <NavLink to="/calendar" activeStyle >
                Calendar
            </NavLink>
            <NavLink to="/noutati" activeStyle >
                Noutati
            </NavLink>
            <NavLink to="/juvenil" activeStyle >
                Volei Juvenil
            </NavLink>
            <NavLink to="/sponsori" activeStyle >
                Sponsori
            </NavLink>
            <NavLink to="/contact" activeStyle >
                Contact
            </NavLink>
            <NavBtn>
                <NavBtnLink to="/signin">Sign In</NavBtnLink>
            </NavBtn>
        </NavMenu>

    </Nav>
  )
}

export default Navbar
