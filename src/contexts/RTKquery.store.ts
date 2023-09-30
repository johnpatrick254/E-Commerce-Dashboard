// store.js

import { configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiGateWay } from '../api/ApiSlice.slice';


export const store = configureStore({
  reducer: {
    [apiGateWay.reducerPath]:apiGateWay.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiGateWay.middleware),
});
setupListeners(store.dispatch);
