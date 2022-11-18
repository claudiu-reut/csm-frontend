import React from 'react'
import './CheckMessage.css'
function CheckMessage({ icon, message, visibility }) {
  return (
    <div
      className={`checkmark-div`}
      style={{ display: visibility ? 'flex' : 'none' }}
    >
      <h1>{message}</h1>
      <div className='icon'>{icon}</div>
    </div>
  )
}

export default CheckMessage
