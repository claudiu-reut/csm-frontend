import React, { useEffect, useState } from 'react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from 'mdb-react-ui-kit'
import './Profile.css'
import axios from '../api/axios'
import { decodeJwt } from 'jose'
import { useNavigate } from 'react-router-dom'
import Post from '../Noutati/Post/Post'
export default function Profile() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [role, setRole] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [data, setData] = useState('')
  const [nrPostari, setNrPostari] = useState('')
  const token = localStorage.getItem('token')
  const [postari, setPostari] = useState([])
  const [userRecentPosts, setUserRecentPosts] = useState([])
  const get_user = async () => {
    try {
      const response = await axios.get(
        `/getusersimple/${decodeJwt(token).user_id}`
      )
      const response2 = await axios.get(
        `/getuserphoto/${decodeJwt(token).user_id}`
      )
      const response3 = await axios.get(
        `/getuserposts/${decodeJwt(token).user_id}`
      )
      const result = response.data[0]
      setFname(result.firstName)
      setLname(result.lastName)
      setRole(result.role)
      setEmail(result.email)
      setData(result.createdAt.toString().slice(0, 10))
      setNrPostari(response3.data)
      if (response2.data) setImgSrc(`data:image/jpeg;base64,${response2.data}`)
      else setImgSrc('https://cdn-icons-png.flaticon.com/512/6522/6522516.png')
    } catch (err) {
      console.log(err)
    }
  }
  const get_posts = async () => {
    try {
      let result = await axios.get('getposts')
      if (result.status === 200) {
        order_by(result.data, 'default')
      } else {
        console.log(result.data.err)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const order_by = (posts, sort_criteria) => {
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
  const get_user_recent_posts = () => {
    let counter_recent_posts = 0
    let result = postari.map((post) => {
      if (
        counter_recent_posts < 4 &&
        decodeJwt(token).user_id === post.user_id
      ) {
        counter_recent_posts += 1
        return <Post key={post.createdAt} post={post} />
      }
    })
    setUserRecentPosts(result)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    get_user()
    get_posts()
  }, [token])
  useEffect(() => {
    get_user_recent_posts()
  }, [postari])
  return (
    <div className='gradient-custom-2' style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer className='py-5 h-100 profile-container'>
        <MDBRow className='justify-content-center align-items-center h-100 '>
          <MDBCol lg='9' xl='7' className='profile-container-row'>
            <MDBCard className='profile-container-card'>
              <div
                className='rounded-top text-white d-flex flex-row'
                style={{ height: '200px' }}
              >
                <div
                  className='ms-4 mt-5 d-flex flex-column'
                  style={{ width: '150px' }}
                >
                  <MDBCardImage
                    src={imgSrc}
                    alt='profile image'
                    className='mt-4 mb-2 img-thumbnail'
                    fluid
                    style={{ width: '150px', zIndex: '1' }}
                  />
                </div>
                <div className='ms-3' style={{ marginTop: '130px' }}>
                  <MDBTypography tag='h5'>{fname + ' ' + lname}</MDBTypography>
                  <MDBCardText>Suceava</MDBCardText>
                </div>
              </div>
              <div
                className='p-4 text-black'
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div className='d-flex justify-content-end text-center py-1 profile-info'>
                  <button
                    className='edit-profile-btn'
                    onClick={() => {
                      nav(`/users/${decodeJwt(token).user_id}`)
                    }}
                  >
                    Editeaza profilul
                  </button>
                  <div>
                    <MDBCardText className='mb-1 h5'> {nrPostari}</MDBCardText>
                    <MDBCardText className='small text-muted mb-0'>
                      Postari
                    </MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className='text-black p-4'>
                <div className='mb-5'>
                  <p className='lead fw-normal mb-1'>Despre</p>
                  <div className='p-4' style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className='font-italic mb-1'>
                      <b>Email: </b>
                      {email}
                    </MDBCardText>
                    <MDBCardText className='font-italic mb-1'>
                      <b>Role: </b>
                      {role}
                    </MDBCardText>
                    <MDBCardText className='font-italic mb-0'>
                      <b>Data Alaturarii: </b>
                      {data}
                    </MDBCardText>
                  </div>
                </div>
                <div
                  className='recent-user-posts-container'
                  style={{
                    display: userRecentPosts.length < 1 ? 'none' : 'flex',
                  }}
                >
                  <MDBCardText className='lead fw-normal mb-0'>
                    Postari recente
                  </MDBCardText>
                  <MDBCardText className='mb-0'>
                    <button
                      className='text-muted profile-all-posts-btn'
                      onClick={() => {
                        nav(`/noutati/`)
                      }}
                    >
                      Arata toate
                    </button>
                  </MDBCardText>
                </div>
                <div className='recent-user-posts'>{userRecentPosts}</div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}
