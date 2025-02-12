import { TestDocument } from "@/types/SchemaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/teacher" }),
  tagTypes: ["Question", "Test"],
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: (body) => ({
        url: "/tests/questions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Question"],
    }),
    getAllQuestions: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (testId: string) => ({ url: `/tests/questions?testId=${testId}` }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "Question" as const,
                id: _id,
              })),
              { type: "Question", id: "LIST" }, // Static tag for list-level updates
            ]
          : [{ type: "Question", id: "LIST" }], // Empty state
    }),
    getQuestionById: builder.query({
      query: (id) => ({ url: `/tests/questions/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Question", id }], // Dynamic tag for caching
    }),
    updateQuestion: builder.mutation({
      query: ({ questionId, ...patch }) => ({
        url: `/tests/questions/${questionId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { questionId }) => [
        { type: "Question", id: questionId }, // Invalidate specific question
      ],
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetAllQuestionsQuery,
  useGetQuestionByIdQuery,
  useUpdateQuestionMutation,
} = questionsApi;
