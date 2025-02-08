import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testsApi = createApi({
  reducerPath: "testsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/teacher" }),
  endpoints: (builder) => ({
    createTest: builder.mutation({
      query: (body) => ({
        url: "/tests",
        method: "POST",
        body,
      }),
    }),
    getAllTests: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (queryId: string) => ({ url: "/tests" }),
    }),
    getTestById: builder.query({
      query: (id) => ({ url: `/tests/${id}`, method: "GET" }),
    }),
  }),
});

export const {
  useCreateTestMutation,
  useGetAllTestsQuery,
  useGetTestByIdQuery,
} = testsApi;
