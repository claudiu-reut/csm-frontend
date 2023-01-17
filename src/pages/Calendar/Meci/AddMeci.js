import React, { useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AddMeci.css'
import axios from '../../api/axios'
import { Checkmark } from 'react-checkmark'
import { VscError } from 'react-icons/vsc'
import UseAnimations from 'react-useanimations'
import loading from 'react-useanimations/lib/loading'
import CheckMessage from '../../CheckMessage/CheckMessage'
import { useEffect } from 'react'

let iconSucces = <Checkmark size='25px' color='green' />
let iconError = <VscError className='icon-inside' color='red' size='25px' />
let iconLoading = <UseAnimations animation={loading} size={35} />

function AddMeci() {
  const [campionat, setCampionat] = useState('')
  const [rezultat, setRezultat] = useState('')
  const [locatia, setLocatia] = useState('')
  const [description, setDescription] = useState('')
  const [gen, setGen] = useState('')
  const [sets, setSets] = useState('')
  const [divizia, setDivizia] = useState('')
  const [data, setData] = useState('')
  const [id_echipa1, setIdEchipa1] = useState('')
  const [id_echipa2, setIdEchipa2] = useState('')
  const errRef = useRef()
  const [teams, setTeams] = useState([])
  function handleDate(e) {
    setData(e.target.value)
    let givenDate = new Date(e.target.value)
    let rez1 = document.getElementById('rez1')
    let rez2 = document.getElementById('rez2')
    let sets = document.getElementById('match-sets-id')
    let todaysDate = new Date().setHours(0, 0, 0, 0)
    if (givenDate >= todaysDate) {
      rez1.disabled = true
      rez2.disabled = true
      sets.disabled = true
      setRezultat('-:-')
      setSets('')
    } else {
      rez1.disabled = false
      rez2.disabled = false
      sets.disabled = false
    }
  }
  function handleRezultat() {
    var rez1 = document.getElementById('rez1')
    var rez2 = document.getElementById('rez2')
    console.log(rez1.value + ':' + rez2.value)
    var str1 = rez1.value
    var str2 = rez2.value
    if (str1 === '') str1 = '-'
    if (str2 === '') str2 = '-'
    setRezultat(str1 + ':' + str2)
  }
  //confirm
  const [checkmark, setCheckmark] = useState(false)
  const [icon, setIcon] = useState(iconLoading)
  const [message, setMessage] = useState('')
  const [textColor, setTextColor] = useState('black')
  const [valid, setValid] = useState(true)
  const getTeams = async () => {
    try {
      let result = await axios.get('getsimpleteams')
      setTeams(result.data)
      if (result.status === 200) {
        setTeams(result.data)
      } else {
        console.log(result.data.err)
      }
    } catch (error) {}
  }
  useEffect(() => {
    getTeams()
  }, [])
  useEffect(() => {
    setCheckmark(false)
    setIcon(iconLoading)
    setMessage('Logging..')
    setTextColor('black')
  }, [
    campionat,
    rezultat,
    locatia,
    description,
    gen,
    sets,
    divizia,
    data,
    id_echipa1,
    id_echipa2,
  ])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIcon(iconLoading)
    setMessage('Logging..')
    setTextColor('black')
    if (valid) {
      try {
        await axios
          .post('addmatch', {
            data: data,
            campionat: campionat,
            rezultat: rezultat,
            id_echipa1: id_echipa1,
            id_echipa2: id_echipa2,
            locatia: locatia,
            description: description,
            gen: gen,
            divizia: divizia,
            sets: sets,
          })
          .then(function (response) {
            if (response.data.status !== 'ERROR') {
              setIcon(iconSucces)
              setMessage('Meci creat cu succes')
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
        setCheckmark(true)
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
    <div className='Add-match-form-container'>
      <form className='Auth-form'>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Adauga Meci</h3>
          <div className='form-group mt-3'>
            <label>Campionat</label>
            <input
              type='text'
              className='form-control mt-1'
              placeholder='Campionat'
              required
              onChange={(e) => setCampionat(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Locatia</label>
            <input
              type='text'
              className='form-control mt-1'
              placeholder='Locatia'
              required
              onChange={(e) => setLocatia(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Data</label>
            <br></br>
            <input
              type='datetime-local'
              onChange={(e) => {
                handleDate(e)
              }}
              id='data'
            />
          </div>
          <div className='form-group mt-3'>
            <label>Echipa 1</label>
            <select
              class='form-select'
              onChange={(e) => setIdEchipa1(e.target.value)}
            >
              <option selected disabled>
                Selecteaza prima echipa
              </option>
              {teams.map((item) => {
                return (
                  <option key={item.id_echipa} value={item.id_echipa}>
                    {item.nume}
                  </option>
                )
              })}
            </select>
            <label>Echipa 2</label>
            <select
              class='form-select'
              onChange={(e) => setIdEchipa2(e.target.value)}
            >
              <option selected disabled>
                Selecteaza a doua echipa
              </option>
              {teams.map((item) => {
                return (
                  <option key={item.id_echipa} value={item.id_echipa}>
                    {item.nume}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='form-group mt-3'>
            <label>Rezultat</label>
            <br></br>
            <div className='scor'>
              <input
                type='number'
                className='form-control rezultat'
                placeholder='-'
                required
                id='rez1'
                onChange={handleRezultat}
                min='0'
                max='3'
                defaultValue='-'
              />
              <h3 className='puncte'>:</h3>
              <input
                type='number'
                className='form-control rezultat '
                placeholder='-'
                required
                id='rez2'
                onChange={handleRezultat}
                defaultValue='-'
                min='0'
                max='3'
              />
            </div>
          </div>
          <div className='form-group mt-3'>
            <label>Gen</label>
            <select
              class='form-select'
              onChange={(e) => setGen(e.target.value)}
            >
              <option selected disabled>
                Selecteaza gen...
              </option>
              <option>Masculin</option>
              <option>Feminin</option>
            </select>
          </div>
          <div className='form-group mt-3'>
            <label>Sets</label>
            <input
              type='text'
              id='match-sets-id'
              className='form-control '
              placeholder='Sets'
              required
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Divizia</label>
            <input
              type='text'
              className='form-control '
              placeholder='Divizia'
              required
              onChange={(e) => setDivizia(e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Descriere</label>
            <textarea
              class='form-control'
              placeholder='Descriere'
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Submit
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
export default AddMeci
