import { ProductData } from '../Utils/ProductPage/ProductData';
import { apiGateWay } from './ApiSlice.slice';

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

const productApi =apiGateWay.enhanceEndpoints({addTagTypes:['products','product']}).injectEndpoints({
  endpoints:(builder) => ({
    getAllProducts: builder.query<getAllProductsResponse, {page:string,category?:string}>({
      query: ({page,category}) => `/api/products?pages=${page}${category ? '&category='+category:""}`,
      providesTags: ["products"]
    }),
    getProductByID: builder.query<ProductData, string>({
      query: (number) => `/api/products/${number}`,
      providesTags: ["product"]
    }),
    createProduct: builder.mutation<ProductData, productPostData>({
      query: ({ body }) => ({
        url: `/api/products`, method: "post", body: body
      }),
      invalidatesTags: ["products","product"]
    }),
    updateProduct: builder.mutation<ProductData, productPostData>({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`, method: "put", body: body
      }),
      invalidatesTags: ["products","product"]
    }),
    deleteProduct: builder.mutation<ProductData, string>({
      query: (id) => ({
        url: `/api/products/${id}`, method: "delete"
      }),
      invalidatesTags: ["products","product"]
    }),
  })
})


export const { useGetAllProductsQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation,useGetProductByIDQuery } = productApi;
