import React from 'react'
import { useState } from 'react'
import './AddPost.css'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../../CheckMessage/CheckMessage'
import { useEffect } from 'react'
import axios from '../../api/axios'

import jwt_decode from 'jwt-decode'
let iconSucces = <Checkmark size='25px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='25px' />
let iconLoading = <UseAnimations animation={loading} size={35} />
function AddPost() {
  const [postari, setPostari] = useState([])
  const [titlu, setTitlu] = useState('')
  const [tags, setTags] = useState('')
  const [linkImagine, setLinkImg] = useState('')
  const [descriere, setDescriere] = useState('')
  const [userId, setUserId] = useState()
  const [selectedFile, setSelectedFile] = useState(null)

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
  const get_posts = async () => {
    try {
      let result = await axios.get('getposts')
      if (result.status === 200) {
        setPostari(result.data)
      } else {
        console.log(result.data.err)
      }
    } catch (error) {}
  }
  const handleFile = (e) => {
    setSelectedFile(e.target.files[0])
    const src = e.target.files[0]
    const imag = document.getElementById('image')

    imag.src = URL.createObjectURL(src)
  }
  const handleAddPost = async () => {
    let title_field = document.getElementById('title-post')
    let tags_field = document.getElementById('tags-post')

    let description_field = document.getElementById('description-post')
    if (
      check_field(title_field) &&
      check_field(tags_field) &&
      check_field(description_field)
    ) {
      setCheckmark(true)
      setIcon(iconLoading)
      setMessage('Loading...')
      setTextColor('black')
      let post = new FormData()
      post.append('titlu', titlu)
      post.append(
        'tags',
        tags
          .trim()
          .replace(new RegExp('  ', 'g'), ' ')
          .replace(new RegExp(', ', 'g'), ',')
          .replace(new RegExp(' ,', 'g'), ',')
      )
      post.append('linkImg', linkImagine)
      post.append('descriere', descriere)
      post.append('linkExtern', '')
      post.append('data', new Date())
      post.append('user_id', userId)
      post.append('imagine', selectedFile)
      if (postari.find((post) => post.titlu === titlu)) {
        setMessage('Postare deja existenta!')
        setTextColor('red')
        setIcon(iconError)
      } else {
        axios({
          method: 'post',
          url: 'addpost',
          data: post,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then(function (response) {
            if (response.data.status !== 'ERROR') {
              setIcon(iconSucces)
              setMessage('Postare creata cu succes')
              setTextColor('black')
            }
            console.log(response)
          })
          .catch(function (response) {
            setIcon(iconError)
            setMessage('Oops, Eroare.Incearca din nou...')
            setTextColor('red')
            console.log(response)
          })
      }

      get_posts()
    }
  }
  useEffect(() => {
    setCheckmark(false)
  }, [titlu, tags, linkImagine, descriere])
  useEffect(() => {
    window.scrollTo(0, 0)
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
    get_posts()
  }, [])
  return (
    <div className='Add-form-container'>
      <section>
        <form className='Add-form'>
          <h1 className='Add-form-title'>Adauga Stire</h1>
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
                placeholder='Taguri separate prin virgula'
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
              <label htmlFor='img-post'>Imagine:</label>

              <input
                type='file'
                accept='image/png, image/gif, image/jpeg'
                id='imginp'
                onChange={(e) => handleFile(e)}
              />
              <div className='form-group mt-2'>
                <img
                  id='image'
                  src='./placeholder.jpg'
                  alt='imagine'
                  className='imgprev'
                />
              </div>
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
                Adauga Stire
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
