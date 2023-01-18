import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './CreatorContinut.css'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import axios from '../api/axios'
import { ThreeDots } from 'react-loading-icons'
let iconLoading = (
  <ThreeDots strokeOpacity={1} stroke='#06bcee' fill='blue' height={12} />
)
function CreatorContinut() {
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isLoadingTeams, setIsLoadingTeams] = useState(false)
  const [isLoadingMatches, setIsLoadingMatches] = useState(false)
  const [posts, setPosts] = useState([])
  const [teams, setTeams] = useState([])
  const [matches, setMatches] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    async function fetchData() {
      setIsLoadingPosts(true)
      setIsLoadingTeams(true)
      setIsLoadingMatches(true)
      const response = await axios.get('/getpostsuser')
      setPosts(response.data)
      setIsLoadingPosts(false)
      const res = await axios.get('/getsimpleteams')
      setTeams(res.data)
      setIsLoadingTeams(false)
      const mts = await axios.get('/getmatchlogos')
      setMatches(mts.data)
      setIsLoadingMatches(false)
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
      date.getFullYear() +
      '     ' +
      addZero(date.getHours()) +
      ':' +
      addZero(date.getMinutes())
    )
  }
  return (
    <div className='mainDiv'>
      <div className='div-table'>
        <h1>Noutati</h1>
        <br />
        <table
          class='table table-striped'
          style={{ display: isLoadingPosts ? 'none' : 'revert' }}
        >
          <thead>
            <tr>
              <th scope='col' className='hidde-on-overflow'>
                Nr.
              </th>
              <th scope='col'>Titlu</th>
              <th scope='col' className='hidde-on-overflow'>
                Tags
              </th>
              <th scope='col'>Data</th>
              <th scope='col'>Autor</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              let titlu = ''
              if (post.titlu.length > 50) {
                titlu = post.titlu.slice(0, 35) + '...'
              } else {
                titlu = post.titlu
              }
              // let email=
              return (
                <tr key={post.id_postare}>
                  <td className='hidde-on-overflow'>{index + 1}</td>
                  <td>{titlu}</td>
                  <td className='hidde-on-overflow'>{post.tags}</td>
                  <td>{get_date_from_str(post.createdAt)}</td>
                  <td>{post.email.split('@')[0] + '@...'}</td>
                  <td>
                    <Link
                      to={`/noutati/edit/${post.id_postare}`}
                      className='edit'
                    >
                      <AiOutlineEdit size={20} />
                    </Link>
                    <Link
                      to={`/noutati/delete/${post.id_postare}`}
                      className='delete'
                    >
                      <MdDeleteForever size={20} />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div
          className='loading-content-spinner'
          style={{ display: isLoadingPosts ? 'flex' : 'none' }}
        >
          {iconLoading}
        </div>
        <Link to='/noutati/addpost' class='btn btn-primary btn-add'>
          Adauga postare
        </Link>
      </div>
      <div className='div-table'>
        <h1>Echipe</h1>
        <br />
        <table
          class='table table-striped'
          style={{ display: isLoadingTeams ? 'none' : 'revert' }}
        >
          <thead>
            <tr>
              <th scope='col' className='hidde-on-overflow'>
                Nr.
              </th>
              <th scope='col'>Nume</th>
              <th scope='col' className='hidde-on-overflow'>
                Oras
              </th>
              <th scope='col'>Tara</th>
              <th scope='col'>Actiune</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => {
              let nume = ''
              if (team.nume.length > 50) {
                nume = team.nume.slice(0, 35) + '...'
              } else {
                nume = team.nume
              }
              // let email=
              return (
                <tr key={team.id_echipa}>
                  <td className='hidde-on-overflow'>{index + 1}</td>
                  <td>{nume}</td>
                  <td className='hidde-on-overflow'>{team.oras}</td>
                  <td>{team.tara}</td>

                  <td>
                    <Link to={`/teams/edit/${team.id_echipa}`} className='edit'>
                      <AiOutlineEdit size={20} />
                    </Link>
                    <Link
                      to={`/teams/delete/${team.id_echipa}`}
                      className='delete'
                    >
                      <MdDeleteForever size={20} />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div
          className='loading-content-spinner'
          style={{ display: isLoadingTeams ? 'flex' : 'none' }}
        >
          {iconLoading}
        </div>
        <Link to='/teams/addteam' class='btn btn-primary btn-add'>
          Adauga echipa
        </Link>
      </div>
      <div className='div-table'>
        <h1>Meciuri</h1>
        <br />
        <table
          class='table table-striped'
          style={{ display: isLoadingMatches ? 'none' : 'revert' }}
        >
          <thead>
            <tr>
              <th scope='col' className='hidde-on-overflow'>
                Nr.
              </th>
              <th scope='col'>Data</th>
              <th scope='col' className='hidde-on-overflow'>
                Campionat
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Locatia
              </th>

              <th scope='col' className='hidde-on-overflow'>
                Gen
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Sets
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Divizia
              </th>
              <th scope='col'>Echipa 1</th>
              <th scope='col'>Echipa 2</th>
              <th scope='col'>Scor</th>
              <th scope='col' className='hidde-on-overflow'>
                Descriere
              </th>
              <th scope='col'>Actiune</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => {
              return (
                <tr key={match.id_meci}>
                  <td className='hidde-on-overflow'>{index + 1}</td>
                  <td>{get_date_from_str(match.data)}</td>
                  <td className='hidde-on-overflow'>{match.campionat}</td>
                  <td className='hidde-on-overflow'>{match.locatia}</td>
                  <td className='hidde-on-overflow'>{match.gen}</td>
                  <td className='hidde-on-overflow td-sets'>{match.sets}</td>
                  <td className='hidde-on-overflow'>{match.divizia}</td>
                  <td>{match.nume1}</td>
                  <td>{match.nume2}</td>
                  <td>{match.rezultat}</td>
                  <td className='hidde-on-overflow'>{match.description}</td>
                  <td>
                    <Link
                      to={`/calendar/edit/${match.id_meci}`}
                      className='edit'
                    >
                      <AiOutlineEdit size={20} />
                    </Link>
                    <Link
                      to={`/calendar/delete/${match.id_meci}`}
                      className='delete'
                    >
                      <MdDeleteForever size={20} />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div
          className='loading-content-spinner'
          style={{ display: isLoadingMatches ? 'flex' : 'none' }}
        >
          {iconLoading}
        </div>
        <Link to='/calendar/addmatch' class='btn btn-primary btn-add'>
          Adauga meci
        </Link>
      </div>
    </div>
  )
}

export default CreatorContinut
