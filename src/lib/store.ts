import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./apiSlices/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { testsApi } from "./apiSlices/testsApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [usersApi.reducerPath]: usersApi.reducer,
      [testsApi.reducerPath]: testsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(usersApi.middleware, testsApi.middleware),
  });
};

const store = makeStore();
setupListeners(store.dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
