import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import './Admin.css'
import axios from '../api/axios'
function Admin() {
  const [users, setUsers] = useState([])
  const [sponsors, setSponsors] = useState([])
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/getusers')
      const response2 = await axios.get('/getsponsors')
      setUsers(response.data)
      setSponsors(response2.data)
    }
    fetchData()
  }, [])
  return (
    <div className='mainDiv'>
      <Link to='/creatorcontinut' class='btn btn-primary btn-add'>
        Creator Continut
      </Link>
      <div className='div-table'>
        <h1>Useri</h1>
        <br />
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col' className='hidde-on-overflow'>
                Nr.
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Nume
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Prenume
              </th>
              <th scope='col'>Email</th>
              <th scope='col'>Rol</th>
              <th scope='col'>Actiune</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id_user}>
                <td className='hidde-on-overflow'>{index + 1}</td>
                <td className='hidde-on-overflow'>{user.firstName}</td>
                <td className='hidde-on-overflow'>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className='problematic'>
                  <Link to={`/users/${user.id_user}`} className='edit'>
                    <AiOutlineEdit size={20} />
                  </Link>
                  <Link to={`/users/delete/${user.id_user}`} className='delete'>
                    <MdDeleteForever size={20} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to='/register' class='btn btn-primary btn-add'>
          Adauga User
        </Link>
      </div>
      <div className='div-table'>
        <h1>Sponsori</h1>
        <br />
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col' className='hidde-on-overflow'>
                Nr.
              </th>
              <th scope='col'>Denumire</th>
              <th scope='col' className='hidde-on-overflow'>
                Link Site
              </th>
              <th scope='col'>Editia</th>
              <th scope='col'>Actiune</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor, index) => (
              <tr key={sponsor.id_sponsor}>
                <td className='hidde-on-overflow'>{index + 1}</td>
                <td>{sponsor.denumire}</td>
                <td className='hidde-on-overflow'>{sponsor.linkSite}</td>
                <td>{sponsor.editia}</td>

                <td>
                  <span className='problematic'>
                    <Link
                      to={`/sponsors/${sponsor.id_sponsor}`}
                      className='edit'
                    >
                      <AiOutlineEdit size={20} />
                    </Link>
                    <Link
                      to={`/sponsors/delete/${sponsor.id_sponsor}`}
                      className='delete'
                    >
                      <MdDeleteForever size={20} className='icon' />
                    </Link>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to='/addsponsor' class='btn btn-primary btn-add'>
          Adauga Sponsor
        </Link>
      </div>
    </div>
  )
}

export default Admin
