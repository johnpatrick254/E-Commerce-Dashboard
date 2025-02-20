import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const fetchTotalOrders = async (): Promise<number> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: baseURL + '/api/total-orders',
    withCredentials: true
  };

  const data: Promise<number> = await axios.request(config)
    .then((response) => {
      return (response.data[0]['COUNT(*)']);
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });

  return data;
};
