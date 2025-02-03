import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testsApi = createApi({
  reducerPath: "testsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createTest: builder.mutation({
      query: (body) => ({
        url: "/tests",
        method: "POST",
        body,
      }),
    }),
    getTest: builder.query({
      query: (id) => ({ url: `/tests/${id}`, method: "GET" }),
    }),
  }),
});

export const { useCreateTestMutation, useGetTestQuery } = testsApi;
