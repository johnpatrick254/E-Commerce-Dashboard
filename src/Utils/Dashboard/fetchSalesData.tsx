import axios from "axios";
import { SalesData } from "./SalesData";
const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
export const fetchSalesData = async (): Promise<SalesData[] | []> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: baseURL + '/api/chart',
    withCredentials: true
  };

  const data: Promise<SalesData[] | []> = await axios.request(config)
    .then((response) => {
      return (response.data);
    })
    .catch((error) => {
      console.log(error);
      return [];
    });

  return data;
};
