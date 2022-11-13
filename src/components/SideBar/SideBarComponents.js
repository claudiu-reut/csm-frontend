import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'

export const SideBarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #0504b7;
  color: black;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '95%' : '0')};
  top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`
export const CloseIcon = styled(FaTimes)`
  color: #fff;
`
export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`
export const SideBarWrapper = styled.div`
  color: #fff;
`
export const SideBarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 60px);
  text-align: center;

  @media screen and(max-width:480px) {
    grid-template-rows: repeat(6, 50px);
  }
`

export const SideBarLink = styled(LinkR)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  trasnsition: 0.5s ease-in-out;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #6db1ff;
    transition: 0.2s ease-in-out;
  }
`

export const SideBtnWrap = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
`
export const SideBarRoute = styled(LinkR)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  white-space: nowrap;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`
