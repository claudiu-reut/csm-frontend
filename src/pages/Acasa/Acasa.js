import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Acasa.css'
import Slider from 'react-slick'
import Post from '../Noutati/Post/Post.js'
import Meci from '../Calendar/Meci/Meci.js'
import axios from '../api/axios'
import SlickPost from './SlickPost/SlickPost'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
let iconLoading = (
  <UseAnimations animation={loading} size={55} strokeColor='blue' />
)
var settingsSlickPosts = {
  autoplay: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 6000,
}
var settingsSlickMatches = {
  autoplay: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 4000,
}

const Acasa = () => {
  const [postari, setPostari] = useState([])
  const [matches, setMatches] = useState([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [isLoadingMatches, setIsLoadingMatches] = useState(false)
  let navigate = useNavigate()
  const get_posts = async () => {
    setIsLoadingPosts(true)
    try {
      let result = await axios.get('getposts')
      if (result.status === 200) {
        order_posts_by(result.data, 'default')
      } else {
        console.log(result.data.err)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoadingPosts(false)
  }
  const get_matches = async () => {
    setIsLoadingMatches(true)
    try {
      let result = await axios.get('getmatchlogos')
      if (result.status === 200) {
        order_matches_by_date(result.data)
      } else {
        console.log(result.data.err)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoadingMatches(false)
  }
  const order_posts_by = (posts, sort_criteria) => {
    if (sort_criteria === '') {
      return
    }
    let sorted = posts.sort(function (a, b) {
      let result = 0
      switch (sort_criteria) {
        case 'data':
          result = new Date(b.createdAt) - new Date(a.createdAt)
          break
        case 'titlu':
          result = ('' + a.titlu).localeCompare(b.titlu)
          break
        default:
          result = new Date(b.createdAt) - new Date(a.createdAt)
          break
      }
      return result
    })
    setPostari(sorted)
  }
  const order_matches_by_date = (matches) => {
    let sorted = matches.sort(function (a, b) {
      let result = new Date(b.data) - new Date(a.data)
      return result
    })
    setMatches(sorted)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    get_posts()
    get_matches()
  }, [])
  let count_recent_matches = 0
  let count_future_matches = 0
  return (
    <>
      <div className='acasa-container'>
        <Slider {...settingsSlickPosts} className='slick-posts'>
          {postari.map((post, index) => {
            if (index < 4) {
              return <SlickPost post={post} key={post.id_postare} />
            }
          })}
        </Slider>
        <div className='acasa-section'>
          <h2 className='acasa-section-title'>Ultimile articole</h2>
          <div className='acasa-section-content'>
            <div
              className='loading-content-spinner'
              style={{ display: isLoadingPosts ? 'flex' : 'none' }}
            >
              {iconLoading}
            </div>
            {postari.map((post, index) => {
              if (index >= 2 && index < 6) {
                return <Post key={post.id_postare} post={post} />
              }
            })}
          </div>
          <button
            className='acasa-section-btn-more'
            onClick={() => {
              navigate(`/noutati`)
            }}
          >
            Mai multe articole {' →'}
          </button>
        </div>
        <div className='acasa-section future-matches-section'>
          <h2 className='acasa-section-title'>Meciuri planificate</h2>
          <div className='acasa-section-content'>
            <Slider {...settingsSlickMatches} className='slick-future-matches'>
              {matches.map((match) => {
                if (
                  count_future_matches < 3 &&
                  new Date() < new Date(match.data)
                ) {
                  count_future_matches += 1
                  return (
                    <div className='future-slick-match-problem'>
                      <Meci key={match.id_meci} match={match} />
                    </div>
                  )
                }
              })}
            </Slider>
          </div>
        </div>
        <div className='acasa-section'>
          <h2 className='acasa-section-title'>Meciuri recent jucate</h2>
          <div className='acasa-section-content'>
            <div
              className='loading-content-spinner'
              style={{ display: isLoadingMatches ? 'flex' : 'none' }}
            >
              {iconLoading}
            </div>
            {matches.map((match) => {
              if (
                count_recent_matches < 3 &&
                new Date() > new Date(match.data)
              ) {
                count_recent_matches += 1
                return <Meci key={match.id_meci} match={match} />
              }
            })}
          </div>
          <button
            className='acasa-section-btn-more'
            onClick={() => {
              navigate(`/calendar`)
            }}
          >
            Mai multe meciuri {' →'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Acasa
