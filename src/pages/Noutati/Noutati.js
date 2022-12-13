import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Noutati.css'
import Post from './Post/Post'
import axios from '../api/axios'
const Noutati = () => {
  const [postari, setPostari] = useState([])
  const get_posts = async () => {
    try {
      let result = await axios.get('getposts')
      if (result.status === 200) {
        let sorted = result.data.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
        setPostari(sorted)
      } else {
        console.log(result.data.err)
      }
    } catch (error) {}
  }
  useEffect(() => {
    get_posts()
  }, [])
  return (
    <>
      <div className='noutati'>
        {postari.map((post) => {
          return <Post key={post.id_postare} post={post} />
        })}
      </div>
    </>
  )
}

export default Noutati
