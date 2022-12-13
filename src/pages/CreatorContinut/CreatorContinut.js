import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './CreatorContinut.css'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import axios from '../api/axios'
function CreatorContinut() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/getpostsuser')
      setPosts(response.data)
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
        <table class='table table-striped'>
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
              <th scope='col'>Actiune</th>
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
        <Link to='/noutati/addpost' class='btn btn-primary btn-add'>
          Add post
        </Link>
      </div>
    </div>
  )
}

export default CreatorContinut
