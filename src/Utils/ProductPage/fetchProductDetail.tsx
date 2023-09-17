import axios from "axios";
import { ProductData } from "./ProductData";


export const fetchProductDetail = async (id: number): Promise<ProductData | null> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/products/${id}`,
    withCredentials: true
  };

  const data: Promise<ProductData | null> = await axios.request(config)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });

  return data;
};
