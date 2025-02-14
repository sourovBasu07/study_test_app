import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./apiSlices/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { testsApi } from "./apiSlices/testsApi";
import { questionsApi } from "./apiSlices/questionsApi";
import { studentApi } from "./apiSlices/studentApi";
import apiSlice from "./apiSlices/apiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware, usersApi.middleware),
  });
};

const store = makeStore();
setupListeners(store.dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
