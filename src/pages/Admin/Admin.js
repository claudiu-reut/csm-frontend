import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import './Admin.css'
import axios from '../api/axios'
import { ThreeDots } from 'react-loading-icons'
let iconLoading = (
  <ThreeDots strokeOpacity={1} stroke='#06bcee' fill='blue' height={12} />
)

function Admin() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isLoadingSponsors, setIsLoadingSponsors] = useState(false)
  const [users, setUsers] = useState([])
  const [sponsors, setSponsors] = useState([])
  const [personal, setPersonal] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    async function fetchData() {
      setIsLoadingUsers(true)
      setIsLoadingSponsors(true)
      const response = await axios.get('/getusers')
      setUsers(response.data)
      setIsLoadingUsers(false)
      const response2 = await axios.get('/getsponsors')
      setSponsors(response2.data)
      setIsLoadingSponsors(false)
      const response3 = await axios.get('/getpersonal')
      setPersonal(response3.data)
      setIsLoadingSponsors(false)
    }
    fetchData()
  }, [])
  const get_date_from_str = (str) => {
    function addZero(i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    }
    let date = new Date(str)
    return (
      addZero(date.getDate()) +
      '-' +
      addZero(date.getMonth() + 1) +
      '-' +
      date.getFullYear()
    )
  }
  return (
    <div className='mainDiv'>
      <Link to='/creatorcontinut' class='btn btn-primary btn-add'>
        Creator Continut
      </Link>
      <div className='div-table'>
        <h1>Useri</h1>
        <br />
        <table
          class='table table-striped'
          style={{ display: isLoadingUsers ? 'none' : 'revert' }}
        >
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
        <div
          className='loading-content-spinner'
          style={{ display: isLoadingUsers ? 'flex' : 'none' }}
        >
          {iconLoading}
        </div>
        <Link to='/register' class='btn btn-primary btn-add'>
          Adauga User
        </Link>
      </div>
      <div className='div-table'>
        <h1>Sponsori</h1>
        <br />
        <table
          class='table table-striped'
          style={{ display: isLoadingSponsors ? 'none' : 'revert' }}
        >
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
        <div
          className='loading-content-spinner'
          style={{ display: isLoadingSponsors ? 'flex' : 'none' }}
        >
          {iconLoading}
        </div>
        <Link to='/addsponsor' class='btn btn-primary btn-add'>
          Adauga Sponsor
        </Link>
      </div>
      <div className='div-table'>
        <h1>Personal</h1>
        <br />
        <table
          class='table table-striped'
          style={{ display: isLoadingSponsors ? 'none' : 'revert' }}
        >
          <thead>
            <tr>
              <th scope='col' className='hidde-on-overflow'>
                Nr.
              </th>
              <th scope='col'>Nume</th>
              <th scope='col' className='hidde-on-overflow'>
                Data Nasterii
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Descriere
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Gen
              </th>
              <th scope='col'>Post</th>
              <th scope='col' className='hidde-on-overflow'>
                Echipa
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Lot Curent
              </th>
              <th scope='col'>Tip Personal</th>
              <th scope='col' className='hidde-on-overflow'>
                Inaltime
              </th>
              <th scope='col'>Actiune</th>
            </tr>
          </thead>
          <tbody>
            {personal.map((individ, index) => (
              <tr key={individ.id_personal}>
                <td className='hidde-on-overflow'>{index + 1}</td>
                <td>{individ.nume + ' ' + individ.prenume}</td>
                <td className='hidde-on-overflow'>
                  {get_date_from_str(individ.data_nasterii)}
                </td>
                <td className='hidde-on-overflow'>{individ.descriere}</td>
                <td className='hidde-on-overflow'>{individ.gen}</td>
                <td>{individ.post}</td>
                <td className='hidde-on-overflow'>{individ.nume_echipa}</td>
                <td className='hidde-on-overflow'>{individ.lot_curent}</td>
                <td>{individ.tip_personal}</td>
                <td className='hidde-on-overflow'>{individ.inaltime}</td>
                <td>
                  <span className='problematic'>
                    <Link
                      to={`/detalii/personal/editpersonal/${individ.id_personal}`}
                      className='edit'
                    >
                      <AiOutlineEdit size={20} />
                    </Link>
                    <Link
                      to={`/detalii/personal/delete/${individ.id_personal}`}
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
        <div
          className='loading-content-spinner'
          style={{ display: isLoadingSponsors ? 'flex' : 'none' }}
        >
          {iconLoading}
        </div>
        <Link
          to='/detalii/personal/addpersonal'
          class='btn btn-primary btn-add'
        >
          Adauga Personal
        </Link>
      </div>
    </div>
  )
}

export default Admin
