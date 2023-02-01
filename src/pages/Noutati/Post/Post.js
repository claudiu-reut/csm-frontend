import './Post.css'
import { BsClock } from 'react-icons/bs'
import { BsReddit } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import { GrFacebook } from 'react-icons/gr'
import { BsTwitter } from 'react-icons/bs'
import { FaTags } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  RedditShareButton,
} from 'react-share'
import { useNavigate } from 'react-router-dom'
function Post({ post }) {
  let navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
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
      console.log(post.descriere)
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
  const get_min_tags = (tags) => {
    // tags = tags.replace(/ /g, '')
    if (tags.length > 47) {
      tags = tags.slice(0, 47) + '...'
    }
    let result = tags.split(',').map((tag, index) => {
      return (
        <p key={index} onClick={() => {}}>
          #{tag}
        </p>
      )
    })
    return result
  }
  return (
    <div className='post'>
      <div className='post-img'>
        <img
          src={`data:image/jpeg;base64,${post.imagine}`}
          alt='post-img'
          onClick={() => {
            navigate(`/noutati/${post.id_postare}`)
          }}
        />
      </div>
      <div className='post-tags'>
        <FaTags size={15} />
        {get_min_tags(post.tags)}
      </div>
      <div
        className='post-title'
        onClick={() => {
          navigate(`/noutati/${post.id_postare}`)
        }}
      >
        <h2>{title}</h2>
      </div>
      <div className='post-description'>
        <p>{extractContent(description, true)}</p>
      </div>
      <div className='post-info'>
        <div className='post-date'>
          <BsClock size={15} />
          <p className='date'>{get_date_from_str(post.createdAt)}</p>
        </div>
        <div className='post-share'>
          <p className='icon-share icon-twiter icon-s'>
            <TwitterShareButton
              title={'test'}
              url={'https://www.csm-suceava.ro/'}
              hashtags={['hashtag1', 'hashtag2']}
            >
              <BsTwitter size={25} />
            </TwitterShareButton>
          </p>
          <p className='icon-share icon-facebook'>
            <FacebookShareButton
              hashtag={'#hashtag'}
              description={'aiueo'}
              url={'https://www.csm-suceava.ro/'}
              className='Demo__some-network__share-button'
            >
              <GrFacebook size={25} />
            </FacebookShareButton>
          </p>
          <p className='icon-share icon-instagram'>
            <InstapaperShareButton
              hashtag={'#hashtag'}
              description={'aiueo'}
              url={'https://www.csm-suceava.ro/'}
              className='Demo__some-network__share-button'
            >
              <FiInstagram size={25} />
            </InstapaperShareButton>
          </p>
          <p className='icon-share icon-reddit'>
            <RedditShareButton
              hashtag={'#hashtag'}
              description={'aiueo'}
              url={'https://www.csm-suceava.ro/'}
              className='Demo__some-network__share-button'
            >
              <BsReddit size={25} />
            </RedditShareButton>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Post
