import React from 'react'
import './Post.css'
import { BsClock } from 'react-icons/bs'
import { BsShare } from 'react-icons/bs'
function Post({ post }) {
  function addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  return (
    <div className='post'>
      <div className='post-img'>
        <img src={post.linkImg} alt='post-img' />
      </div>
      <div className='post-tags'>
        {post.tags.split(' ').map((tag) => {
          return <p>#{tag}</p>
        })}
      </div>
      <div className='post-title'>
        <h2>{post.titlu.slice(0, 100)}...</h2>
      </div>
      <div className='post-description'>
        <p>{post.descriere.slice(0, 150)}...</p>
      </div>
      <div className='post-info'>
        <div className='post-date'>
          <BsClock size={15} />
          <p>
            {addZero(post.data.getDate()) +
              '-' +
              addZero(post.data.getMonth() + 1) +
              '-' +
              post.data.getFullYear() +
              '     ' +
              addZero(post.data.getHours()) +
              ':' +
              addZero(post.data.getMinutes())}
          </p>
        </div>
        <div className='post-share'>
          <BsShare size={15} />
          <p>Share</p>
        </div>
      </div>
    </div>
  )
}

export default Post
