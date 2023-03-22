import { configureStore } from "@reduxjs/toolkit";

import apiSlice from "../features/api/apiSlice";
import filtersSlice from "../features/filters/filtersSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [filtersSlice.name]: filtersSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
