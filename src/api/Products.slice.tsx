import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductData } from '../Utils/ProductPage/ProductData';

// Define your API slice
type getAllProductsResponse = {
  data: ProductData[],
  meta: {
    total: number,
    page: number,
    last_page: number
  }
}
type productPostData = {
  id?: string,
  body: {
    name?: string,
    description?: string,
    image?: string | File,
    price?: number,
    category?:string
  }
}
export const productApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/products',
    credentials: 'include',
  }),
  tagTypes: ["products","product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<getAllProductsResponse, string>({
      query: (number) => `?pages=${number}`,
      providesTags: ["products"]
    }),
    getProductByID: builder.query<ProductData, string>({
      query: (number) => `/${number}`,
      providesTags: ["product"]
    }),
    createProduct: builder.mutation<ProductData, productPostData>({
      query: ({ body }) => ({
        url: `/`, method: "post", body: body
      }),
      invalidatesTags: ["products","product"]
    }),
    updateProduct: builder.mutation<ProductData, productPostData>({
      query: ({ id, body }) => ({
        url: `/${id}`, method: "put", body: body
      }),
      invalidatesTags: ["products","product"]
    }),
    deleteProduct: builder.mutation<ProductData, string>({
      query: (id) => ({
        url: `/${id}`, method: "delete"
      }),
      invalidatesTags: ["products","product"]
    }),
  }),
});

export const { useGetAllProductsQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation,useGetProductByIDQuery } = productApi;
