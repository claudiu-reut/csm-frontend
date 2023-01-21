import React, { useState, useEffect } from 'react'
import './SlickPost.css'
import { useNavigate } from 'react-router-dom'
function SlickPost({ post }) {
  let navigate = useNavigate()
  const [title, setTitle] = useState('')
  useEffect(() => {
    if (post.titlu.length > 150) {
      setTitle(post.titlu.slice(0, 150) + '...')
    } else {
      setTitle(post.titlu)
    }
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
      '   |   ' +
      addZero(date.getHours()) +
      ':' +
      addZero(date.getMinutes())
    )
  }
  return (
    <div className='slick-post'>
      <div
        className='slick-post-image'
        style={{
          '--img': `url(data:image/jpeg;base64,${post.imagine})`,
        }}
      ></div>

      <div className='slick-post-title'>
        <h3
          onClick={() => {
            navigate(`/noutati/${post.id_postare}`)
          }}
        >
          {title}
        </h3>
      </div>
      <div className='slick-post-date'>
        <span>{get_date_from_str(post.createdAt)}</span>
      </div>
    </div>
  )
}

export default SlickPost
