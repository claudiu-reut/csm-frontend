import './Post.css'
import { BsClock } from 'react-icons/bs'
import { BsReddit } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import { GrFacebook } from 'react-icons/gr'
import { BsTwitter } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'

function Post({ post }) {
  let date = new Date(post.createdAt)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  function addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  useEffect(() => {
    if (post.titlu.length > 100) {
      setTitle(post.titlu.slice(0, 100) + '...')
    } else {
      setTitle(post.titlu)
    }
    if (post.descriere.length > 150) {
      setDescription(post.descriere.slice(0, 150) + '...')
    } else {
      setDescription(post.descriere)
    }
  }, [])
  return (
    <div className='post'>
      <div className='post-img'>
        <img src={post.linkImg} alt='post-img' />
      </div>
      <div className='post-tags'>
        {post.tags.split(' ').map((tag, index) => {
          return <p key={index}>#{tag}</p>
        })}
      </div>
      <div className='post-title'>
        <h2>{title}</h2>
      </div>
      <div className='post-description'>
        <p>{description}</p>
      </div>
      <div className='post-info'>
        <div className='post-date'>
          <BsClock size={15} />
          <p className='date'>
            {addZero(date.getDate()) +
              '-' +
              addZero(date.getMonth() + 1) +
              '-' +
              date.getFullYear() +
              '     ' +
              addZero(date.getHours()) +
              ':' +
              addZero(date.getMinutes())}
          </p>
        </div>
        <div className='post-share'>
          <p className='icon-share icon-twiter icon-s'>
            <BsTwitter size={25} />
          </p>
          <p className='icon-share icon-facebook'>
            <GrFacebook size={25} />
          </p>
          <p className='icon-share icon-instagram'>
            <FiInstagram size={25} />
          </p>
          <p className='icon-share icon-reddit'>
            <BsReddit size={25} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default Post
