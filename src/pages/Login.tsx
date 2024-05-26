import ShowIcon from '../assets/eye-12120.svg'
import {useState } from 'react';
import logoIcon from "../assets/statistics-graph-stats-analytics-business-data-svgrepo-com.svg"
import { ClipLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/Login/login.css"
const Login = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({email:'demo@mail.com',password:"1234",first_name:"",last_name:"",password_confirm:''});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMSG] = useState('');
  const [loading, setIsloading] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";



  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(prev=>{
      const {name,value}= e.target;
      return {
        ...prev,
        [name]:value
      }
    });
  };

  const handleLoginSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsloading(true);
    e.preventDefault();
    let data;
    let url;
    if(isAdmin){
      data =input  
      url = baseURL +"/api/register " 
    }else{
      const {first_name,last_name,password_confirm,...authData} =input;
      data = authData;
      url =baseURL + '/api/login';
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      data: data,
      withCredentials:true
    };

    axios.request(config)
      .then((response) => {
        if (response.status === 200) {
          if(isAdmin){
          setErrMSG("Success, Login");
          setIsAdmin(false);
          setErr(true);
          setIsloading(false)
          }else{
            navigate('/');
            setIsloading(false)
          }
        }
      })
      .catch((error) => {
        setIsloading(false);
        console.log(error);
        const errMessage = error.response.data?.message
        if (errMessage) {
          setErrMSG(errMessage);
        } else {
          setErrMSG("");
        }
        setErr(true);
      });

  };

  return (
    <div className="container">
      <form className='login'>
       {!isAdmin && <div className="login-logo">
          <img src={logoIcon} alt="logo-icon" />
          <p>TychFusion Analytics</p>
        </div>}
        <div className="login-actions">
          <div className="login-actions_welcome">
            <h3>{isAdmin ? '':'Welcome' } </h3>
            {!isAdmin && <p className={err ? "err-txt" : ''}>{err ? errMsg : ( 'Please enter your credentials')}</p>}
          </div>
          <div className="login-actions_options">
            <div className={`login-actions_options-select ${!isAdmin ? 'selected' : ''}`} onClick={() => {
              setIsAdmin(false)
            }}>
              <p>Sign in</p>
            </div>
            <div className={`login-actions_options-select ${isAdmin ? 'selected' : ''}`} onClick={() => {
              setIsAdmin(true)
            }}>

              <p>Register</p>
            </div>
          </div>
          <div onSubmit={handleLoginSubmit} className="login-actions_input">
            { isAdmin && <><div className="email" >
              <p>First Name</p>
              <input type='text' name='first_name'required onChange={handleInputChange} value={input.first_name} />
            </div>
            <div className="email" >
              <p>Last Name</p>
              <input type='text' name='last_name' required onChange={handleInputChange} value={input.last_name} />
            </div></>}
            <div className="email" >
              <p>Email</p>
              <input type='text' name='email' required onChange={handleInputChange} value={input.email} />
            </div>
            <div className="password"  >
              <p>Password</p>
              <div className="pass-input">
                <input name='password' type={showPassword ? 'password' : 'text'} required onChange={handleInputChange} value={input.password} />
                <img src={ShowIcon} alt="show password"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              </div>
            </div>
            {isAdmin  && <div className="password"  >
              <p>Confirm Password</p>
              <div className="pass-input">
                <input name='password_confirm' type={showPassword ? 'password' : 'text'} required onChange={(e)=>{
                   if(input.password !== e.target.value){
                    setErrMSG("Password Do not match")
                    setErr(true);
                  }else{
                    setErr(false)
                  }
                  handleInputChange(e)
                }} value={input.password_confirm} />
                <img src={ShowIcon} alt="show password"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              </div>
            </div>}
          </div>
        </div>
        { <div className="login-submit">
          {loading ? <ClipLoader color="#36d7b7" size={"1.7rem"} /> : <button type='submit' onClick={(e: any) => {
            handleLoginSubmit(e)
          }}>{isAdmin ? "Sign Up":"Sign in"}</button>}
        </div>}
      </form>
    </div>
  );
};

export default Login;
