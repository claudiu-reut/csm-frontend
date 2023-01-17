import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Noutati.css'
import Post from './Post/Post'
import axios from '../api/axios'
import { DateRangePicker } from 'rsuite'
import { GrPowerReset } from 'react-icons/gr'
import { BiFilterAlt } from 'react-icons/bi'
import { RiArrowUpDownLine } from 'react-icons/ri'
const Noutati = () => {
  const [postari, setPostari] = useState([])
  const [postariOrigin, setPostariOrigin] = useState([])
  const [tags, setTags] = useState([])
  const [tagFilter, setTagFilter] = useState('')
  const [selectedSortValue, setSelectedSortValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [, updateState] = React.useState()
  const get_posts = async () => {
    try {
      let result = await axios.get('getposts')
      if (result.status === 200) {
        order_by(result.data, 'default')
        setPostariOrigin(result.data)
        get_all_tags(result.data)
      } else {
        console.log(result.data.err)
      }
    } catch (error) {}
  }
  const forceUpdate = React.useCallback(() => updateState({}), [])
  useEffect(() => {
    get_posts()
  }, [])
  useEffect(() => {}, [])
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
    window.scrollTo(0, 0)
    forceUpdate()
  }
  const get_all_tags = (postari) => {
    let taguri = []
    if (postari.length !== 0) {
      for (let i = 0; i < postari.length; i++) {
        let sub_tags = postari[i].tags.split(',')
        for (let j = 0; j < sub_tags.length; j++) {
          if (!taguri.includes(sub_tags[j])) {
            taguri.push(sub_tags[j])
          }
        }
      }
    }
    setTags(taguri)
  }
  const filter_noutati = (tagFilter, dateMinFilter, dateMaxFilter) => {
    let result = postariOrigin
    if (tagFilter !== '') {
      result = result.filter((post) => post.tags.includes(tagFilter))
    }
    if (dateMinFilter !== '') {
      result = result.filter(
        (post) => new Date(post.createdAt) >= dateMinFilter
      )
    }
    if (dateMaxFilter !== '') {
      result = result.filter(
        (post) => new Date(post.createdAt) <= dateMaxFilter
      )
    }
    setPostari(result)
    window.scrollTo(0, 0)
  }
  return (
    <>
      <div className='noutati-container'>
        <div className='noutati-toolbar'>
          <div className='noutati-toolbar-item'>
            <label htmlFor='select-order-noutati'>
              <RiArrowUpDownLine size={25} />
            </label>
            <select
              value={selectedSortValue}
              id='select-order-noutati'
              defaultValue={''}
              className='form-select option-capitalise'
              aria-label='Default select example'
              onChange={(e) => {
                setSelectedSortValue(e.target.value)
                order_by(postari, e.target.value)
              }}
            >
              <option value='default'>Default</option>
              <option value='data'>Recente</option>
              <option value='titlu'>Titlu</option>
            </select>
          </div>
          <div className='noutati-toolbar-item'>
            <label htmlFor='select-filter-noutati'>
              <BiFilterAlt size={25} />
            </label>
            <select
              value={tagFilter}
              id='select-filter-noutati'
              defaultValue={''}
              className='form-select'
              aria-label='Default select example'
              onChange={(e) => {
                filter_noutati(e.target.value, startDate, endDate)
                setTagFilter(e.target.value)
              }}
            >
              <option value=''>All</option>
              {tags.map((tag, index) => {
                return (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='noutati-toolbar-item date-range-picker-item'>
            <DateRangePicker
              showOneCalendar
              appearance='default'
              value={[startDate, endDate]}
              onChange={(value) => {
                setStartDate(value[0])
                setEndDate(value[1])
                filter_noutati(tagFilter, value[0], value[1])
              }}
            />
          </div>
          <div
            className='noutati-reset'
            onClick={() => {
              window.scrollTo(0, 0)
              setTagFilter('')
              setStartDate('')
              setEndDate('')
              setSelectedSortValue('default')
              setPostari(postariOrigin)
            }}
          >
            <GrPowerReset size={20} />
            <span>Reset</span>
          </div>
        </div>
        <div className='noutati'>
          {postari.map((post) => {
            return <Post key={post.createdAt} post={post} />
          })}
        </div>
      </div>
    </>
  )
}

export default Noutati
