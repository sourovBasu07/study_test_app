import apiSlice from "./apiSlice";

export const studentApi = apiSlice.injectEndpoints({
  overrideExisting: process.env.NODE_ENV === "development",
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
  }),
});

export const { useCreateStudentMutation, useGetAllStudentsQuery } = studentApi;
