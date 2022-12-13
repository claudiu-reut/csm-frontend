import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './OtherPost.css'
function OtherPost({ post }) {
  let navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [linkImg, setLinkImg] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    setLinkImg(post.linkImg)
    if (post.titlu.length > 70) {
      setTitle(post.titlu.slice(0, 70) + '...')
    } else {
      setTitle(post.titlu)
    }
    if (post.descriere.length > 100) {
      setDescription(post.descriere.slice(0, 100) + '...')
    } else {
      setDescription(post.descriere)
    }
  }, [])

  return (
    <div
      className='other-post'
      onClick={() => {
        navigate(`/noutati/${post.id_postare}`)
      }}
    >
      <div className='other-post-img'>
        <img src={linkImg} alt='imagine-post' />
      </div>
      <div className='other-post-title'>
        <h2>{title}</h2>
      </div>
      <div className='other-post-description'>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default OtherPost
