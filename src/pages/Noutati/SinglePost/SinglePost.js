import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './SinglePost.css'
import axios from '../../api/axios'
import { BsReddit } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import { GrFacebook } from 'react-icons/gr'
import { BsTwitter } from 'react-icons/bs'
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  RedditShareButton,
} from 'react-share'
import OtherPost from './OtherPost/OtherPost'
function SinglePost() {
  const params = useParams()
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState('')
  const [post, setPost] = useState({})
  const getPost = async () => {
    try {
      const response = await axios.get(`/getpost/${params.id}`)
      setPost(response.data)
      setTags(response.data.tags)
    } catch (error) {
      console.log(error)
    }
  }
  const get_posts = async () => {
    try {
      let result = await axios.get('getposts')
      if (result.status === 200) {
        let sorted = result.data.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
        setPosts(sorted)
      } else {
        console.log(result.data.err)
      }
    } catch (error) {}
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    getPost()
    get_posts()
  }, [params.id])

  let counter = 0
  let otherPostsArray = posts.map((postare) => {
    if (counter < 4 && post.id_postare !== postare.id_postare) {
      counter += 1
      return <OtherPost post={postare} key={postare.id_postare} />
    }
  })
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
    <div className='single-post-container'>
      <div className='single-post-ads'>
        <span>Ads</span>
      </div>
      <div className='single-post'>
        <div className='single-post-title'>
          <h1>{post.titlu}</h1>
        </div>
        <div className='post-tags'>
          <span>Taguri:</span>
          {tags.split(',').map((tag, index) => {
            return <p key={index}>#{tag}</p>
          })}
        </div>
        <div className='single-post-info'>
          <div className='single-post-info-date'>
            <p>{get_date_from_str(post.createdAt)}</p>
          </div>
          <div className='single-post-info-share'>
            <p className='icon-share icon-twiter icon-s'>
              <TwitterShareButton
                title={'test'}
                url={'https://www.csm-suceava.ro/'}
                hashtags={['hashtag1', 'hashtag2']}
              >
                <BsTwitter size={32} />
              </TwitterShareButton>
            </p>
            <p className='icon-share icon-facebook'>
              <FacebookShareButton
                hashtag={'#hashtag'}
                description={'aiueo'}
                url={'https://www.csm-suceava.ro/'}
                className='Demo__some-network__share-button'
              >
                <GrFacebook size={32} />
              </FacebookShareButton>
            </p>
            <p className='icon-share icon-instagram'>
              <InstapaperShareButton
                hashtag={'#hashtag'}
                description={'aiueo'}
                url={'https://www.csm-suceava.ro/'}
                className='Demo__some-network__share-button'
              >
                <FiInstagram size={32} />
              </InstapaperShareButton>
            </p>
            <p className='icon-share icon-reddit'>
              <RedditShareButton
                hashtag={'#hashtag'}
                description={'aiueo'}
                url={'https://www.csm-suceava.ro/'}
                className='Demo__some-network__share-button'
              >
                <BsReddit size={32} />
              </RedditShareButton>
            </p>
          </div>
        </div>
        <div className='single-post-image'>
          <img
            src={`data:image/jpeg;base64,${post.imagine}`}
            alt='imagine post'
          />
        </div>
        <div className='single-post-description'>
          <p dangerouslySetInnerHTML={{ __html: post.descriere }}></p>
        </div>
      </div>
      <div className='other-posts'>
        <div className='see-also'>
          <h2>Alte Stiri...</h2>
        </div>
        {otherPostsArray}
      </div>
    </div>
  )
}

export default SinglePost
