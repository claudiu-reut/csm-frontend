import React from 'react'
import { useState } from 'react'
import './AddSponsor.css'
import { useEffect } from 'react'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../../CheckMessage/CheckMessage'
import axios from '../../api/axios'
let iconSucces = <Checkmark size='30px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='30px' />
let iconLoading = <UseAnimations animation={loading} size={40} />
function AddSponsor() {
  const [sponsori, setSponsori] = useState([])
  const [denumire, setDenumire] = useState('')
  const [linkSite, setLinkSite] = useState('')
  const [linkImagine, setLinkImg] = useState('')
  const [editia, setEditia] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  //validate
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(undefined)
  const [message, setMessage] = useState('')
  const [textColor, setTextColor] = useState('black')
  const handleFile = (e) => {
    setSelectedFile(e.target.files[0])
    const src = e.target.files[0]
    const imag = document.getElementById('image')

    imag.src = URL.createObjectURL(src)
  }
  const getSponsors = async () => {
    try {
      const result = await axios.get(`/getsponsors`)
      setSponsori(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    getSponsors()
  }, [])
  useEffect(() => {
    setCheckmark(false)
    setMessage('Loading')
    setIcon(iconLoading)
    setTextColor('black')
  }, [denumire, linkImagine, linkSite, editia])
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
  const handleAddSponsor = () => {
    getSponsors()

    const addSpon = async () => {
      let sponsor = new FormData()
      sponsor.append('denumire', denumire)
      sponsor.append('linkSite', linkSite)
      sponsor.append('editia', editia)
      sponsor.append('imagine', selectedFile)

      if (sponsori.find((sponsor) => sponsor.denumire === denumire)) {
        setMessage('Sponsor deja existent!')
        setTextColor('red')
        setIcon(iconError)
      } else {
        axios({
          method: 'post',
          url: 'createsponsor',
          data: sponsor,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then(function (response) {
            if (response.data.status !== 'ERROR') {
              setIcon(iconSucces)
              setMessage('Sponsor adaugat cu succes')
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
        setMessage('Sponsor adaugat cu succes!')
        setTextColor('black')
        setIcon(iconSucces)
      }
    }
    let denum_field = document.getElementById('denumire-spon')
    let site_field = document.getElementById('site-spon')
    let editia_field = document.getElementById('editia-spon')
    if (
      check_field(denum_field) &&
      check_field(site_field) &&
      check_field(editia_field)
    ) {
      setCheckmark(true)
      setMessage('Loading...')
      setTextColor('black')
      setIcon(iconLoading)
      addSpon()
      getSponsors()
    }
  }
  return (
    <div className='Add-form-container'>
      <section>
        <form className='Auth-form'>
          <h1 className='Auth-form-title'>Adauga Sponsor</h1>
          <div className='Auth-form-content'>
            <div className='form-group mt-3'>
              <label htmlFor='denumire-spon'>Denumire:</label>
              <input
                type='text'
                id='denumire-spon'
                className='form-control mt-1'
                onChange={(e) => {
                  setDenumire(e.target.value)
                  e.target.style.backgroundColor = 'white'
                }}
                value={denumire}
                required
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='img-spon'>Url imagine:</label>
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
              <label htmlFor='site-spon'>Oficial site:</label>
              <input
                type='text'
                id='site-spon'
                className='form-control mt-1'
                onChange={(e) => {
                  setLinkSite(e.target.value)
                  e.target.style.backgroundColor = 'white'
                }}
                value={linkSite}
                required
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='editia-spon'>Editia:</label>
              <input
                type='text'
                id='editia-spon'
                className='form-control mt-1'
                onChange={(e) => {
                  setEditia(e.target.value)
                  e.target.style.backgroundColor = 'white'
                }}
                value={editia}
                required={true}
              />
            </div>

            {/* <div className='form-group'>
              <label htmlFor='checkbox-group'>Lotul:</label>
              <br />
              <div className='checkbox-group' id='checkbox-group'>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox1'
                    value='2020-2021'
                    checked={checked1}
                    onChange={(e) => {
                      setChecked1(!checked1)
                      changeLot(e)
                    }}
                  />
                  <label className='form-check-label' htmlFor='inlineCheckbox1'>
                    2020-2021
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox2'
                    value='2021-2022'
                    checked={checked2}
                    onChange={(e) => {
                      setChecked2(!checked2)
                      changeLot(e)
                    }}
                  />
                  <label className='form-check-label' htmlFor='inlineCheckbox2'>
                    2021-2022
                  </label>
                </div>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id='inlineCheckbox3'
                    value='2022-2023'
                    checked={checked3}
                    onChange={(e) => {
                      setChecked3(!checked3)
                      changeLot(e)
                    }}
                  />
                  <label className='form-check-label' htmlFor='inlineCheckbox3'>
                    2022-2023
                  </label>
                </div>
              </div>
            </div> */}

            <div className='d-grid gap-2 mt-3'>
              <button
                className='btn btn-primary'
                type='button'
                onClick={handleAddSponsor}
              >
                Adauga Sponsor
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

export default AddSponsor
