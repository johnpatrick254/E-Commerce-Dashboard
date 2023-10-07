import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
export const apiGateWay = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL ,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});

 