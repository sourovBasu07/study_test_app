import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/institution" }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (body) => ({
        url: "/student",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Student"],
    }),
    getAllStudents: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (testId: string) => "/student",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "Student" as const,
                id: _id,
              })),
              { type: "Student", id: "LIST" }, // Static tag for list-level updates
            ]
          : [{ type: "Student", id: "LIST" }], // Empty state
    }),
    getQuestionById: builder.query({
      query: (id) => ({ url: `/tests/questions/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Student", id }], // Dynamic tag for caching
    }),
    updateQuestion: builder.mutation({
      query: ({ questionId, ...patch }) => ({
        url: `/tests/questions/${questionId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { questionId }) => [
        { type: "Student", id: questionId }, // Invalidate specific question
      ],
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetQuestionByIdQuery,
  useUpdateQuestionMutation,
} = studentApi;
