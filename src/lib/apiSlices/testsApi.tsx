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
  }),
});

export const { useCreateTestMutation } = testsApi;
