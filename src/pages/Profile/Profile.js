import React from 'react'
import './Profile.css'
import { useEffect ,useState} from 'react'
import axios from '../api/axios'
import { decodeJwt } from 'jose'
import data from '../../components/NavBar/images/img.json'
const Profile = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [role, setRole] = useState('')
    const [img, setImg] = useState();
    const [data,setData] = useState('');
    const [postari,setPostari] = useState('')
    const token = localStorage.getItem('token')
    useEffect(() => {
  
        const func = async () => {
          try {
            
            const response = await axios.get(`/getusersimple/${decodeJwt(token).user_id}`)
            const response2 = await axios.get(`/getuserphoto/${decodeJwt(token).user_id}`)
            const response3 = await axios.get(`/getuserposts/${decodeJwt(token).user_id}`)
            const result=response.data[0];
           
            setFname(result.firstName);
            setLname(result.lastName);
            setRole(result.role);
            setEmail(result.email)
            setData(result.createdAt.toString().slice(0,10))
            setPostari(response3.data)
            if(result)
            setImg(response2.data);
            else
            setImg(data.image)
          } catch (err) {
            console.log(err)
          }
        }
       
        func();
      }, [token])
  return (
    <>
      <div className='card'>
      <div className='img-card'>
        <img
          className='imag'
          src={`data:image/jpeg;base64,${img}`}
          alt='...'
          position='top'
        ></img>
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{fname+' '+lname}</h5>
        <p className='card-text'></p>
        <ul className='List'>
          <li>
            <b>Email: </b>
            {email}
          </li>
          <li>
            <b>Role: </b>
            {role}
          </li>
          <li>
            <b>Data Alaturarii: </b>
            {data}
          </li>
          <li>
            <b>Numar postari: </b>
            {postari}
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Profile
