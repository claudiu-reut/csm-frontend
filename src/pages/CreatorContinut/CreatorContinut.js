import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './CreatorContinut.css'
import { Link } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import { AiOutlineEdit } from 'react-icons/ai'
import axios from '../SignIn/api/axios'
function CreatorContinut() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  async function getEmail (id){
    const response2= await axios.get(`/getuser/${id}`)
    const email=response2.email;
    console.log(response2)
    setEmail(email);
  }
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/getposts')
      const response2= await axios.get('/getusers')
      setPosts(response.data);
      setUsers(response2.data);
    }
    fetchData()
  }, [])
  return (
    <div
    >
       <div className='div-table'>
        <h1>Noutati</h1>
        <br />
        <table class='table table-striped'>
          <thead>
            <tr>
              <th scope='col' className='hidde-on-overflow'>
                ID
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Titlu
              </th>
              <th scope='col' className='hidde-on-overflow'>
                Tags
              </th>
              <th scope='col'>Data</th>
              <th scope='col'>ID user</th>
              <th scope='col'>Actiune</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id_postare}>
                <td className='hidde-on-overflow'>{post.id_postare}</td>
                <td className='hidde-on-overflow'>{post.titlu}</td>
                <td className='hidde-on-overflow'>{post.tags}</td>
                <td>{post.createdAt}</td>
                <td>{console.log(getEmail(post.user_id)) }</td>
                <td>
                  <Link to={`/posts/${post.id_postare}`} className='edit'>
                    <AiOutlineEdit size={20} />
                  </Link>
                  <Link to={`/posts/delete/${post.id_postare}`} className='delete'>
                    <MdDeleteForever size={20} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to='/register' class='btn btn-primary btn-add'>
          Add post
        </Link>
      </div>
    </div>
  )
}

export default CreatorContinut
