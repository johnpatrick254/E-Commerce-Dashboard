import axios from "axios";
import { SalesData } from "./SalesData";

export const fetchSalesData = async (): Promise<SalesData[] | []> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/chart',
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
