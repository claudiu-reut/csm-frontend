import React from 'react'
import { useState } from 'react'
import '../Sponsori/AddSponsor/AddSponsor.css'
import { useEffect } from 'react'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../CheckMessage/CheckMessage'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'

let iconSucces = <Checkmark size='30px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='30px' />
let iconLoading = <UseAnimations animation={loading} size={40} />
function EditSponsor() {
  const [sponsori, setSponsori] = useState([])
  const [denumire, setDenumire] = useState('')
  const [linkSite, setLinkSite] = useState('')
  const [linkImagine, setLinkImg] = useState('')
  const [editia, setEditia] = useState('')
  const match = useParams()
  //validate
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(undefined)
  const [message, setMessage] = useState('')
  const [textColor, setTextColor] = useState('black')

  const getSponsors = async () => {
    try {
      const result = await axios.get(`/getsponsor/${match.id}`)
      const sponsor = result.data
      setSponsori(sponsor)
      setDenumire(sponsor.denumire)
      setEditia(sponsor.editia)
      setLinkImg(sponsor.linkImagine)
      setLinkSite(sponsor.linkSite)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    getSponsors()
  }, [])

  const handleAddSponsor = () => {
    getSponsors()
    const addSpon = async () => {
      try {
        const response = await axios.put(`/editsponsor/${match.id}`, {
          denumire,
          linkSite,
          linkImagine,
          editia,
        })
        setMessage('Sponsor editat cu succes!')
        setTextColor('black')
        setIcon(iconSucces)
      } catch (error) {
        setMessage('No Server Response')
        setTextColor('red')
        setIcon(iconError)
      }
    }
    setCheckmark(true)
    setMessage('Loading...')
    setTextColor('black')
    setIcon(iconLoading)
    addSpon()
    getSponsors()
  }
  return (
    <div className='Add-form-container'>
      <section>
        <div className='Add-form'>
          <h1 className='Add-form-title'>Editeaza Sponsor</h1>
          <div className='Add-form-content'>
            <div className='form-group mt-3'>
              <label htmlFor='denumire'>Denumire:</label>
              <input
                type='text'
                id='denumire'
                className='form-control mt-1'
                onChange={(e) => setDenumire(e.target.value)}
                value={denumire}
                required
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='img-url'>Url imagine:</label>
              <input
                type='text'
                id='img-url'
                className='form-control mt-1'
                onChange={(e) => {
                  setLinkImg(e.target.value)
                }}
                value={linkImagine}
                required
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='site-url'>Oficial site:</label>
              <input
                type='text'
                id='site-url'
                className='form-control mt-1'
                onChange={(e) => {
                  setLinkSite(e.target.value)
                }}
                value={linkSite}
                required
              />
            </div>
            <div className='form-group mt-3'>
              <label htmlFor='editia'>Editia:</label>
              <input
                type='text'
                id='editia'
                className='form-control mt-1'
                onChange={(e) => {
                  setEditia(e.target.value)
                }}
                value={editia}
                required
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
            <CheckMessage
              textColor={textColor}
              visibility={checkmark}
              icon={icon}
              message={message}
            />
            <div className='d-grid gap-2 mt-3'>
              <button className='btn btn-primary' onClick={handleAddSponsor}>
                Salveaza Sponsor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EditSponsor
