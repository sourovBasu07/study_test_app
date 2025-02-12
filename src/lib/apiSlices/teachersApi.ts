import apiSlice from "./apiSlice";

export const teachersApi = apiSlice.injectEndpoints({
  overrideExisting: process.env.NODE_ENV === "development",
  endpoints: (builder) => ({
    createTeacher: builder.mutation({
      query: (body) => ({
        url: "/teacher",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    getAllTeachers: builder.query({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (teachers: string) => "/teacher",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "Teacher" as const,
                id: _id,
              })),
              { type: "Teacher", id: "LIST" }, // Static tag for list-level updates
            ]
          : [{ type: "Teacher", id: "LIST" }], // Empty state
    }),
  }),
});

export const { useCreateTeacherMutation, useGetAllTeachersQuery } = teachersApi;
