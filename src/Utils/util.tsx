import productIcon from "../assets/sell-svgrepo-com.svg";
import analyticsIcon from "../assets/analytics-graph-svgrepo-com.svg";
import ordersIcon from "../assets/shipped-svgrepo-com.svg";
import AdminIcon from "../assets/businessman-svgrepo-com.svg";
import userIcon from "../assets/users-svgrepo-com.svg";
import nextIcon from "../assets/next4-svgrepo-com.svg";
import axios from "axios"
import { SideBarCardProps } from "../components/sidebar/Sidbarcard";

export const sideBarcards: SideBarCardProps[] =[
    {
        compIcon:analyticsIcon,
        nextIcon:nextIcon,
        name:"Analytics"
    },
    {
        compIcon:AdminIcon,
        nextIcon:nextIcon,
        name:"Admin",
    },
    {
        compIcon:userIcon,
        nextIcon:nextIcon,
        name:"User",
    },
    {
        compIcon:productIcon,
        nextIcon:nextIcon,
        name:"Products",
    },
    {
        compIcon:ordersIcon,
        nextIcon:nextIcon,
        name:"Orders",
    }
]    

export const fetchSalesData = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/chart',
  
    };
  
    const data = await axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return JSON.stringify(response.data)
      })
      .catch((error) => {
        console.log(error);
        return []
      });
  
    return data
  }