import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductData } from '../Utils/ProductPage/ProductData';

// Define your API slice
type getAllProductsResponse ={
    data:ProductData[],
    meta:{
        total: number,
        page: number,
        last_page: number
    }
}
export const productApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/products',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<getAllProductsResponse,number>({
      query: (number) => `?pages=${number}`, // Adjust the endpoint path if needed
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
