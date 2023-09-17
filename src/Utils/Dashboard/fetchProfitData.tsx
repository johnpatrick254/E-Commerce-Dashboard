import axios from "axios";
import { profitData } from "./profitData";




export const fetchProfitData = async (): Promise<profitData[] | null> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/total-profits',
    withCredentials: true
  };

  const data: Promise<profitData[] | null> = await axios.request(config)
    .then((response) => {
      const data = response.data;
      data.length = 7;
      return data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return data;
};
