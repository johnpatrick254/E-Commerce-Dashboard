import axios from "axios";

export const fetchTotalUsers = async (): Promise<number> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/total-users',
    withCredentials: true
  };

  const data: Promise<number> = await axios.request(config)
    .then((response) => {
      return (response.data[0]['data']);
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });

  return data;
};
