import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./apiSlices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });
};

const store = makeStore();
setupListeners(store.dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
