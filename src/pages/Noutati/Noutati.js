import React from 'react'
import './Noutati.css'
import Post from './Post/Post'
import axios from '..//SignIn/api/axios'
import { useEffect } from 'react'
import { useState } from 'react'
let date = new Date()
const Noutati = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    async function fetchData() {
      
      const response = await axios.get("/getposts");
      console.log(response.data);
      setPosts(response.data)
    }
    fetchData();
   
  }, [])
  return (
    <>
      <div className='noutati'>
        {posts.map((post) => {
          return <Post post={post} />
        })}
      </div>
    </>
  )
}

export default Noutati
