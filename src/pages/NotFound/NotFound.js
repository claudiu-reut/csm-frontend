import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const nav=useNavigate();
    const yourFunction = async () => {
        await delay(5000);
        console.log("Waited 5s");
        nav('/acasa');
      };
      useEffect(() => {
        yourFunction();
      }, [])
  return (
   
      <div class="d-flex align-items-center justify-content-center vh-100">
          <div class="text-center">
      <h1 class="display-1 fw-bold"><span class="text-danger">404</span> Not Found </h1>
      <h1 class>Această pagină nu există</h1>
      <br></br>
      <h3>În 5 secunde vei fi redirecționat la pagina principală.</h3>
      </div>
    </div>
    
  )
}

export default NotFound
