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
  function extractContent(s, space) {
    var span = document.createElement('span')
    span.innerHTML = s
    if (space) {
      var children = span.querySelectorAll('*')
      for (var i = 0; i < children.length; i++) {
        if (children[i].textContent) children[i].textContent += ' '
        else children[i].innerText += ' '
      }
    }
    return [span.textContent || span.innerText].toString().replace(/ +/g, ' ')
  }
  return (
    <div
      className='other-post'
      onClick={() => {
        navigate(`/noutati/${post.id_postare}`)
      }}
    >
      <div className='other-post-img'>
        <img
          src={`data:image/jpeg;base64,${post.imagine}`}
          alt='imagine-post'
        />
      </div>
      <div className='other-post-title'>
        <h2>{title}</h2>
      </div>
      <div className='other-post-description'>
        <p>{extractContent(description, true)}</p>
      </div>
    </div>
  )
}

export default OtherPost
