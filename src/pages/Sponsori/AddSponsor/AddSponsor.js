import React from 'react'
import { useState } from 'react'
import './AddSponsor.css'
import axios from 'axios'
import { useEffect } from 'react'
const app = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 2000,
})
function AddSponsor() {
  const [sponsori, setSponsori] = useState([])
  const [denumire, setDenumire] = useState('')
  const [urlSite, setUrlSite] = useState('')
  const [urlImg, setUrlImg] = useState('')
  const [lot, setLot] = useState('')
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [checked3, setChecked3] = useState(false)
  const getSponsors = async () => {
    try {
      const result = await app.get('/getsponsors')
      console.log(result.data)
      setSponsori(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSponsors()
  }, [])

  const changeLot = (e) => {}
  const handleAddSponsor = () => {}
  return (
    <div className='Add-form-container'>
      <section>
        <form onSubmit={handleAddSponsor} className='Add-form'>
          <h1 className='Add-form-title'>Adauga Sponsor</h1>
          <div className='Add-form-content'>
            <div className='form-group mt-3'>
              <label htmlFor='denumire'>Denumire:</label>
              <input
                type='text'
                id='denumire'
                autoComplete='off'
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
                  setUrlSite(e.target.value)
                }}
                value={urlSite}
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
                  setUrlImg(e.target.value)
                }}
                value={urlImg}
                required
              />
            </div>

            <div className='form-group'>
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
                    }}
                  />
                  <label className='form-check-label' htmlFor='inlineCheckbox3'>
                    2022-2023
                  </label>
                </div>
              </div>
            </div>
            <div className='d-grid gap-2 mt-3'>
              <button className='btn btn-primary'>Adauga Sponsor</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddSponsor
