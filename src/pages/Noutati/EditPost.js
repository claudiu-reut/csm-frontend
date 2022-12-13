import React from 'react'
import { useState } from 'react'
import './AddPost/AddPost.css'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../CheckMessage/CheckMessage'
import { useEffect } from 'react'
import axios from '../api/axios'
import jwt_decode from 'jwt-decode'
import { useParams } from 'react-router-dom'
let iconSucces = <Checkmark size='25px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='25px' />
let iconLoading = <UseAnimations animation={loading} size={35} />
function AddPost() {
  const [titlu, setTitlu] = useState('')
  const [tags, setTags] = useState('')
  const [linkImagine, setLinkImg] = useState('')
  const [descriere, setDescriere] = useState('')
  const [userId, setUserId] = useState()
  const match = useParams()
  //confirmation
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(iconLoading)
  const [message, setMessage] = useState('Loading...')
  const [textColor, setTextColor] = useState('black')
  const check_field = (field) => {
    if (field.value === '' || field.value.length < 4) {
      field.style.backgroundColor = 'pink'
      setCheckmark(true)
      setMessage('Please complete this field')
      setTextColor('red')
      setIcon(iconError)
      return false
    }
    return true
  }
  const handleAddPost = async () => {
    let title_field = document.getElementById('title-post')
    let tags_field = document.getElementById('tags-post')
    let image_field = document.getElementById('img-post')
    let description_field = document.getElementById('description-post')
    if (
      check_field(title_field) &&
      check_field(tags_field) &&
      check_field(image_field) &&
      check_field(description_field)
    ) {
      setCheckmark(true)
      setIcon(iconLoading)
      setMessage('Loading...')
      setTextColor('black')
      let post = {}
      post.titlu = titlu
      post.tags = tags
      post.linkImg = linkImagine
      post.descriere = descriere
      post.linkExtern = ''
      post.tags = tags
      post.data = new Date()
      post.user_id = userId

      try {
        let result = await axios.put(`/editpost/${match.id}`, post)
        if (result.status === 200) {
          setMessage('Postare editata cu succes')
          setIcon(iconSucces)
          setTextColor('black')
        } else {
          setMessage(result.data.err)
          setIcon(iconError)
          setTextColor('red')
        }
      } catch (error) {
        console.log(error)
        setMessage('Error.Try again later')
        setIcon(iconError)
        setTextColor('red')
      }
    }
  }
  useEffect(() => {
    setCheckmark(false)
  }, [titlu, tags, linkImagine, descriere])
  const getPost = async () => {
    console.log(match.id)
    const response = await axios.get(`/getpost/${match.id}`)
    console.log(response)
    const post = response.data
    setDescriere(post.descriere)
    setTags(post.tags)
    setTitlu(post.titlu)
    setLinkImg(post.linkImg)
  }
  useEffect(() => {
    try {
      var enc = new TextEncoder()
      const token = jwt_decode(
        localStorage.getItem('token'),
        enc.encode('secret123')
      )
      setUserId(token.user_id)
    } catch (err) {
      console.log(err)
    }
    getPost()
  }, [])
  return (
    <div className='Add-form-container'>
      <section>
        <form className='Add-form'>
          <h1 className='Add-form-title'>Editeaza Stire</h1>
          <div className='Add-form-content'>
            <div className='form-group mt-3'>
              <label htmlFor='title-post'>Titlu:</label>
              <input
                placeholder='Titlul postarii'
                type='text'
                id='title-post'
                className='form-control mt-1'
                onChange={(e) => {
                  setTitlu(e.target.value)
                  e.target.style.backgroundColor = 'white'
                }}
                value={titlu}
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='tags-post'>Tags:</label>
              <input
                placeholder='Taguri separate prin spatiu'
                type='text'
                id='tags-post'
                className='form-control mt-1'
                onChange={(e) => {
                  setTags(e.target.value)
                  e.target.style.backgroundColor = 'white'
                }}
                value={tags}
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='img-post'>Url imagine:</label>
              <input
                placeholder='Adresa imaginii'
                type='text'
                id='img-post'
                className='form-control mt-1'
                onChange={(e) => {
                  setLinkImg(e.target.value)
                  e.target.style.backgroundColor = 'white'
                }}
                value={linkImagine}
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='description-post'>Descriere:</label>
              <textarea
                placeholder='Continutul postarii'
                rows={5}
                id='description-post'
                className='form-control mt-1'
                value={descriere}
                onChange={(e) => {
                  setDescriere(e.target.value)
                  e.target.style.backgroundColor = 'white'
                }}
              />
            </div>
            <div className='d-grid gap-2 mt-3'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => {
                  handleAddPost()
                }}
              >
                Editeaza Stire
              </button>
            </div>
            <CheckMessage
              textColor={textColor}
              visibility={checkmark}
              icon={icon}
              message={message}
            />
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddPost
