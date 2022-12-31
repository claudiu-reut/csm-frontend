import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './Noutati.css'
import Post from './Post/Post'
import axios from '../api/axios'
import { GrPowerReset } from 'react-icons/gr'
const Noutati = () => {
  const [postari, setPostari] = useState([])
  const [postariOrigin, setPostariOrigin] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedSortValue, setSelectedSortValue] = useState('')
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
  const filter_by_tag = (tag) => {
    if (tag === '') {
      setPostari(postariOrigin)
      return
    }
    let result = postariOrigin.filter((post) => post.tags.includes(tag))
    setPostari(result)
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
  return (
    <>
      <div className='noutati-container'>
        <div className='noutati-toolbar'>
          <div className='noutati-toolbar-item'>
            <label htmlFor='select-order-noutati'>Order by</label>
            <select
              value={selectedSortValue}
              id='select-order-noutati'
              defaultValue={''}
              class='form-select'
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
            <label htmlFor='select-filter-noutati'>Filter by Tag</label>
            <select
              value={selectedTag}
              id='select-filter-noutati'
              defaultValue={''}
              class='form-select'
              aria-label='Default select example'
              onChange={(e) => {
                setSelectedTag(e.target.value)
                filter_by_tag(e.target.value)
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
          <div
            className='noutati-reset'
            onClick={() => {
              window.scrollTo(0, 0)
              setSelectedTag('')
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
            return (
              <Post
                key={post.createdAt}
                post={post}
                filter_by_tag={filter_by_tag}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Noutati
