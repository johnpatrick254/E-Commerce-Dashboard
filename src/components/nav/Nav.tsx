import axios from "axios"
import logoIcon from "../../assets/statistics-graph-stats-analytics-business-data-svgrepo-com.svg"
import "../../styles/nav/nav.style.css"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Nav = () => {
  const navigate = useNavigate()
  const logOut = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/logout',
      withCredentials:true
    };
    
    axios.request(config)
    .then((response) => {
      if(response.status == 200){
        navigate('/login')
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      toast(error.response.data.message);
    });
    
  }
  return <>
    <nav aria-label="navbar" id="nav">
      <div id="logo">
        <img src={logoIcon} alt="logo-icon" />
        <h3>TychFusion Analytics</h3>
      </div>
      <div id="login" onClick={logOut}>
        <button>Log Out</button>
      </div>
    </nav>
  </>
}