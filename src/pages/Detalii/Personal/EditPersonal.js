import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AddPersonal.css'
import axios from '../../api/axios'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../../CheckMessage/CheckMessage'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

let iconSucces = <Checkmark size='25px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='25px' />
let iconLoading = <UseAnimations animation={loading} size={35} />

function EditPersonal() {
  const [nume, setNume] = useState('')
  const [prenume, setPrenume] = useState('')
  const [gen, setGen] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [pozitie, setPozitie] = useState('')
  const [tip_personal, setTipPersonal] = useState('')
  const [descriere, setDescriere] = useState('')
  const [data_nasterii, setData] = useState('')
  const [inaltime, setInaltime] = useState('')
  const [src, setSrc] = useState('')
  const [lot_curent, setLotCurent] = useState('')
  const params = useParams()
  function handleDate(e) {
    setData(e.target.value)
    let givenDate = new Date(e.target.value)
    let todaysDate = new Date().setHours(0, 0, 0, 0)
    if (givenDate - todaysDate <= 10) {
      setData(e.target.value)
    } else {
      setData(e.target.value)
    }
  }
  const errRef = useRef()
  var bodyFormData = new FormData()

  //confirm
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(iconLoading)
  const [message, setMessage] = useState('')
  const [textColor, setTextColor] = useState('black')
  const [valid, setValid] = useState(true)
  const handleFile = (e) => {
    setSelectedFile(e.target.files[0])
    const src = e.target.files[0]
    const imag = document.getElementById('image')
    imag.src = URL.createObjectURL(src)
  }
  const getPersonal = async () => {
    try {
      const result = await axios.get(`/getpersonal/${params.id}`)
      const personal = result.data
      setNume(personal.nume)
      setPrenume(personal.prenume)
      setDescriere(personal.descriere)
      setData(new Date(personal.data_nasterii).toISOString().split('T')[0])
      setInaltime(personal.inaltime)
      setSrc(personal.imagine)
      setPozitie(personal.post)
      setGen(personal.gen)
      setTipPersonal(personal.tip_personal)
      setLotCurent(personal.lot_curent)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPersonal()
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    setCheckmark(false)
    setIcon(iconLoading)
    setMessage('Logging..')
    setTextColor('black')
  }, [nume, prenume, gen])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIcon(iconLoading)
    setMessage('Logging..')
    setTextColor('black')
    if (valid) {
      try {
        bodyFormData.append('nume', nume)
        bodyFormData.append('prenume', prenume)
        bodyFormData.append('gen', gen)
        bodyFormData.append('post', pozitie)
        bodyFormData.append('tip_personal', tip_personal)
        bodyFormData.append('imagine', selectedFile)
        bodyFormData.append('id_echipa', 4)
        bodyFormData.append('data_nasterii', data_nasterii)
        bodyFormData.append('descriere', descriere)
        bodyFormData.append('inaltime', inaltime)
        bodyFormData.append('lot_curent',lot_curent)
        setCheckmark(true)
        axios({
          method: 'put',
          url: `editpersonal/${params.id}`,
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then(function (response) {
            if (response.data.status !== 'ERROR') {
              setIcon(iconSucces)
              setMessage('Personal editat cu succes')
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
      } catch (err) {
        console.log(err)
        if (!err?.response) {
          setIcon(iconError)
          setMessage('No Server Response')
          setTextColor('red')
        } else if (err.response?.status === 400) {
          setIcon(iconError)
          setMessage('Completati toate campurile')
          setTextColor('red')
        } else if (err.response?.status === 401) {
          setTextColor('red')
          setIcon(iconError)
          setMessage('Unauthorized')
        } else {
          setIcon(iconError)
          setMessage('Register Failed')
          setTextColor('red')
        }
      }
      errRef.current.focus()
    } else {
      setIcon(iconError)
      setMessage('Password is invalid')
      setTextColor('red')
    }
  }
  return (
    <div className='Add-form-container'>
      <form className='Auth-form'>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Editeaza Personal</h3>
          <div className='form-group mt-3'>
            <label>Nume</label>
            <input
              type='text'
              className='form-control mt-1'
              placeholder='Nume'
              required
              value={nume}
              onChange={(e) => setNume(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Prenume</label>
            <input
              type='text'
              className='form-control mt-1'
              placeholder='Prenume'
              required
              value={prenume}
              onChange={(e) => setPrenume(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Gen</label>
            <select
              className='form-select'
              onChange={(e) => setGen(e.target.value)}
              value={gen}
            >
              <option value='0' label='Selecteaza genul... ' selected disabled>
                Selecteaza genul...{' '}
              </option>
              <option value='masculin'>Masculin</option>
              <option value='feminin'>Feminin</option>
            </select>
          </div>
          <div className='form-group d-grid gap-2 mt-3'>
            <label>Tip Personal</label>
            <select
              className='form-select'
              value={tip_personal}
              onChange={(e) => setTipPersonal(e.target.value)}
            >
              <option selected disabled>
                Selecteaza tip personal...
              </option>
              <option value='antrenor'>Antrenor</option>
              <option value='seniori'>Seniori</option>
              <option value='juniori'>Juniori</option>
              <option value='cadeti'>Cadeti</option>
              <option value='sperante'>Speranțe</option>
            </select>
          </div>
          <div className='form-group d-grid gap-2 mt-3'>
            <label>Poziție</label>
            <select
              className='form-select'
              onChange={(e) => setPozitie(e.target.value)}
              value={pozitie}
            >
              <option selected disabled>
                Selecteaza poziție...
              </option>
              <option value='Outside Hitter'>Outside Hitter</option>
              <option value='Opposite Hitter'>Opposite Hitter</option>
              <option value='Middle Blocker'>Middle Blocker</option>
              <option value='Setter'>Setter</option>
              <option value='Libero '>Libero </option>
              <option value='Outside Hitter'>Capitan</option>
            </select>
          </div>
          <div className='form-group mt-3'>
            <label>Data Nasterii</label>
            <br></br>
            <input
              type='date'
              onChange={(e) => {
                handleDate(e)
              }}
              value={data_nasterii}
              id='data'
            />
          </div>
          <div className='form-group mt-3'>
            <label>Descriere</label>
            <textarea
              value={descriere}
              className='form-control'
              placeholder='Descriere'
              onChange={(e) => setDescriere(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group mt-3'>
            <label>Inaltime</label>
            <input
              value={inaltime}
              type='text'
              className='form-control mt-1'
              placeholder='Inaltime'
              required
              onChange={(e) => setInaltime(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Lot Curent</label>
            <input
              type='text'
              className='form-control mt-1'
              placeholder='Lot Curent'
              required
              value={lot_curent}
              onChange={(e) => setLotCurent(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Imagine</label>
            <input
              type='file'
              accept='image/png, image/gif, image/jpeg'
              onChange={(e) => handleFile(e)}
            />
          </div>
          <div className='form-group mt-2'>
            <img
              id='image'
              src={`data:image/jpeg;base64,${src}`}
              alt='imagine'
              className='imgprev'
            />
          </div>
          <input
            type='checkbox'
            checked={checkmark}
            className='checkmark-check'
            onChange={() => {
              setCheckmark(!checkmark)
            }}
          />
          <div className='d-grid gap-2 mt-3'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Editeaza
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
    </div>
  )
}
export default EditPersonal
