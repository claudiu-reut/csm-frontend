import React from 'react'
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
  return (
    <SideBarContainer isOpen={isOpen} onClick={toggle}>
      <SideBtnWrap>
        <SideBarRoute to='signin'>Sign In</SideBarRoute>
      </SideBtnWrap>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>

      <SideBarWrapper>
        <SideBarMenu>
          <SideBarLink to='/acasa'>Acasa</SideBarLink>
          <SideBarLink to='/detalii'>Detalii</SideBarLink>
          <SideBarLink to='/calendar'>Calendar</SideBarLink>
          <SideBarLink to='/Noutati'>Noutati</SideBarLink>
          <SideBarLink to='/juvenil'>Volei Juvenil</SideBarLink>
          <SideBarLink to='/sponsori'>Sponsori</SideBarLink>
          <SideBarLink to='/contact'>Contact</SideBarLink>
        </SideBarMenu>
      </SideBarWrapper>
    </SideBarContainer>
  )
}

export default SideBar
