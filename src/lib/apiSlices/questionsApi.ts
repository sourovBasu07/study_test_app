import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/teacher" }),
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: (body) => ({
        url: "/tests/question",
        method: "POST",
        body,
      }),
    }),
    getAllQuestions: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (queryId: string) => ({ url: "/tests/question" }),
    }),
    getQuestionById: builder.query({
      query: (id) => ({ url: `/tests/question/${id}`, method: "GET" }),
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetAllQuestionsQuery,
  useGetQuestionByIdQuery,
} = questionsApi;
