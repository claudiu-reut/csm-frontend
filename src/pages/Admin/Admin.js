import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {Link} from "react-router-dom"
import "./Admin.css"
import axios from "../SignIn/api/axios"
function Admin() {
  const [users,setUsers]=useState([]);
  const [sponsors,setSponsors]=useState([]);
  useEffect(() => {

    async function fetchData() {
      
      const response = await axios.get("/getusers");
      const response2 = await axios.get("/getsponsors")
      setUsers(response.data);
      setSponsors(response2.data)
    }
    fetchData();
    
  }, [])
  return (
    <div className='mainDiv' >
      <div>
      <h1>Users</h1>
      <Link to="/register" class="btn btn-primary">Add User</Link>
      <br></br>
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nume</th>
      <th scope="col">Prenume</th>
      <th scope="col">Email</th>
      <th scope="col">Rol</th>
      <th scope="col">Actiune</th>
    </tr>
  </thead>
  <tbody>
  {users.map((user) => (
              <tr key={user.id_user}>
                <td>{user.id_user}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

  
                <td >
                  <Link to={`/users/${user.id_user}`} className='edit'>Edit</Link>
                  <Link to={`/users/delete/${user.id_user}` } className='delete'>Delete</Link>
                </td>
                
              </tr>
            ))}
  </tbody>
</table>
</div>
<h1>Sponsors</h1>
<Link to="/addsponsor" class="btn btn-primary">Add Sponsor</Link>
      <br></br>
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Denumire</th>
      <th scope="col">Link Site</th>
      <th scope="col">Editia</th>
      <th scope="col">Actiune</th>
    </tr>
  </thead>
  <tbody>
  {sponsors.map((sponsor) => (
              <tr key={sponsor.id_sponsor}>
                <td>{sponsor.id_sponsor}</td>
                <td>{sponsor.denumire}</td>
                <td >{sponsor.linkSite}</td>
                <td>{sponsor.editia}</td>
                

  
                <td >
                  <Link to={`/sponsors/${sponsor.id_sponsor}`} className='edit'>Edit</Link>
                  <Link to={`/sponsors/delete/${sponsor.id_sponsor}` } className='delete'>Delete</Link>
                </td>
                
              </tr>
            ))}
  </tbody>
</table>
<div>
  
</div>
    </div>
  )
}

export default Admin
