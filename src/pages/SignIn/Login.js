import { useRef, useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'
import {useNavigate} from 'react-router-dom'
//import AuthContext from "./context/AuthProvider";
import axios from "./api/axios"
const LOGIN_URL = '/login';

const Login = () => {
   // const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [auth, setAuth] = useState({});
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const nav=useNavigate();
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL,
              { email:user,
               password:pwd,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
            }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.user;
            const roles = response?.data?.role;
            setAuth({ user, pwd, roles, accessToken });
            localStorage.setItem("token", accessToken);
            setUser('');
            setPwd('');
            setSuccess(true);
            if(response.status=200)
            nav("/acasa")
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/acasa">Go to Home</a>
                    </p>
                </section>
            ) : (
                <div className='Auth-form-container'>
                <section >
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className='Auth-form-title'>Sign In</h1>
                    <form onSubmit={handleSubmit} className='Auth-form'>
                    <div className='Auth-form-content'>
                    <div className='form-group mt-3'>
                        <label htmlFor="username">Email:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            className='form-control mt-1'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                    </div>
                    <div className='form-group mt-3'>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className='form-control mt-1'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                          <div className='d-grid gap-2 mt-3'>
                        <button className='btn btn-primary'>Sign In</button>
                        </div>
                        </div>
                    </div>
                    </form>
                   
                </section>
                </div>
            )}
        </>
    )
}

export default Login