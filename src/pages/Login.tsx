import ShowIcon from '../assets/eye-12120.svg'
import { useState } from 'react';
import logoIcon from "../assets/statistics-graph-stats-analytics-business-data-svgrepo-com.svg"
import { ClipLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login/login.css"
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMSG] = useState('');
  const [loading, setIsloading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsloading(true);
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/login',
      data: data,
      withCredentials:true
    };

    axios.request(config)
      .then((response) => {
        if (response.status === 200) {
          navigate('/')
        }
      })
      .catch((error) => {
        const errMessage = error.response.data.message
        if (errMessage) {
          console.log(error);
          setErrMSG(errMessage);
        } else {
          setErrMSG("");
        }
        setErr(true);
        setIsloading(false);
      });

  };

  return (
    <div className="container">
      <form className='login'>
        <div className="login-logo">
          <img src={logoIcon} alt="logo-icon" />
          <p>TychFusion Analytics</p>
        </div>
        <div className="login-actions">
          <div className="login-actions_welcome">
            <h3>Welcome </h3>
            <p className={err ? "err-txt" : ''}>{err ? errMsg : 'Please enter your credentials'}</p>
          </div>
          <div className="login-actions_options">
            <div className={`login-actions_options-select ${isAdmin ? 'selected' : ''}`} onClick={() => {
              setIsAdmin(true)
            }}>
              <p>User Sign in</p>
            </div>
            <div className={`login-actions_options-select ${!isAdmin ? 'selected' : ''}`} onClick={() => {
              setIsAdmin(false)
            }}>

              <p>Admin Sign</p>
            </div>
          </div>
          <div onSubmit={handleLoginSubmit} className="login-actions_input">
            <div className="email" >
              <p>Username</p>
              <input type='text' required onChange={handleEmailChange} value={email} />
            </div>
            <div className="password"  >
              <p>Password</p>
              <div className="pass-input">
                <input type={showPassword ? 'password' : 'text'} required onChange={handlePasswordChange} value={password} />
                <img src={ShowIcon} alt="show password"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="login-submit">
          {loading ? <ClipLoader color="#36d7b7" size={"1.7rem"} /> : <button type='submit' onClick={(e: any) => {
            handleLoginSubmit(e)
          }}>Sign in</button>}
        </div>
      </form>
    </div>
  );
};

export default Login;
