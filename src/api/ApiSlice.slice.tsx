import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const apiGateWay = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include',
  }),
  endpoints: () => ({}),
});

