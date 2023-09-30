import axios from "axios";
import { OrdersData } from "./OrdersData";



export const fetchTotalOrdersChartData = async (): Promise<OrdersData | null> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/total-orders-chart',
    withCredentials: true
  };

  const data: Promise<OrdersData | null> = await axios.request(config)
    .then((response) => {
      const data = response.data;
      let orders: any = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (index > (data.length - 5)) {
          orders.push(element);
        }

      }
      return orders;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return data;
};