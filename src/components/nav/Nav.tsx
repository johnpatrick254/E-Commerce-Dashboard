import axios from "axios"
import logoIcon from "../../assets/statistics-graph-stats-analytics-business-data-svgrepo-com.svg"
import exitIcon from "../../assets/exit-svgrepo-com.svg"
import "../../styles/nav/nav.style.css"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from "../../contexts/useContexts";
import { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
export const Nav = () => {
  const navigate = useNavigate()
  const authUser = useUserContext();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [showLogoout, setShowLogout]=useState<boolean>(true)
  useEffect(()=>{
    const checkLogin = async () => {
      await axios.get( baseURL + "/api/user", {
          withCredentials: true
      }).then(res => {
          if (res.status != 200) {
              setRedirect(true)
          } 
      }).catch(e => {
          console.log(e.response.data);
          setRedirect(true)
      })
  }
  checkLogin();
  },[])
  if (redirect) {
    navigate("/login")
}
  
   const logOut = () => {
     navigate('/login');
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseURL + '/api/logout',
      withCredentials:true
    };
    
    axios.request(config)
    .then((response) => {
      if(response.status == 200){
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      toast(error.response.data.message);
    });
    
  
  }

  const handleMouseOver =()=>{
      setShowLogout(true)
  }
  return <>
    <nav aria-label="navbar" id="nav">
      <div id="logo">
        <img src={logoIcon} alt="logo-icon" />
        <h3>TychFusion Analytics</h3>
      </div>
      <div id="login" >
        <div className="username"><p>Welcome {authUser && authUser.first_name}</p></div>
      </div>
      <div className="logout" onClick={logOut} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOver}>
        <img src={exitIcon } alt="logout" />
        <button className={`${showLogoout ? "show-logout":""}`}>Sign Out</button>
      </div>
    </nav>
  </>
}