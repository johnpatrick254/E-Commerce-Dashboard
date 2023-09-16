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
export interface SalesData{
  data:{name:string;order_sum:number}[]
}
export const fetchSalesData = async ():Promise<SalesData[] | []> => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/chart',
      withCredentials:true
    };
  
    const data: Promise<SalesData[]| []> = await axios.request(config)
      .then((response) => {
        return (response.data) 
      })
      .catch((error) => {
        console.log(error);
        return []
      });
  
    return data
  }
  export interface AuthenicatedUser{
    id: number;
    first_name: string;
    last_name: string;
    email: string;

    role: {
        id: number,
        name: string,
        permisions:{id:number,name:string} []
    }
}
  export const fetchAuthenticatedUser =async ()=>{
  const user = await  axios.get("http://localhost:3000/api/user",{
      withCredentials:true
    }).then(res=>{
      if(res.status == 200){
        return res.data as AuthenicatedUser
      }else{
        console.log(res.data);
      return null
      }
    }).catch(e=>{
      console.log(e.response.data);
      return null
      
    })
    return user
  }

  export const fetchTotalOrders = async ():Promise<number> => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/total-orders',
      withCredentials:true
    };
  
    const data: Promise<number> = await axios.request(config)
      .then((response) => {
        return (response.data[0]['COUNT(*)']) 
      })
      .catch((error) => {
        console.log(error);
        return 0
      });
  
    return data
  }
  export const fetchTotalUsers = async ():Promise<number> => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/total-users',
      withCredentials:true
    };
  
    const data: Promise<number> = await axios.request(config)
      .then((response) => {
        return (response.data[0]['data']) 
      })
      .catch((error) => {
        console.log(error);
        return 0
      });
  
    return data
  }

 export type OrderData ={
    date:string;
    sales:number
  }

export interface OrdersData{
  data:OrderData[]
}

export const fetchTotalOrdersChartData = async ():Promise<OrdersData | null> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/total-orders-chart',
    withCredentials:true
  };

  const data: Promise<OrdersData | null> = await axios.request(config)
    .then((response) => {
      const data  =response.data
      let orders:any= []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if(index > (data.length - 5)){
          orders.push(element)          
        }
        
      }
      return orders 
    })
    .catch((error) => {
      console.log(error);
      return null
    });
   
  return data
}

export type profitData ={
  profit:number;
  date:string;
}



export const fetchProfitData = async ():Promise<profitData[] | null> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/total-profits',
    withCredentials:true
  };

  const data: Promise<profitData[] | null> = await axios.request(config)
    .then((response) => {
      const data  =response.data
      data.length = 7
      return data
    })
    .catch((error) => {
      console.log(error);
      return null
    });

  return data
}