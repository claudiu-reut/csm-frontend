import React, { useEffect } from 'react'

const NotFound = () => {
  useEffect(() => {}, [])
  return (
    <div class='d-flex align-items-center justify-content-center vh-100'>
      <div class='text-center'>
        <h1 class='display-1 fw-bold'>
          <span class='text-danger'>404</span> Not Found{' '}
        </h1>
        <h1 class>Această pagină nu există</h1>
        <br></br>
        <h3>În 5 secunde vei fi redirecționat la pagina principală.</h3>
      </div>
    </div>
  )
}

export default NotFound
