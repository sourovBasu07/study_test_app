import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createUser } from "../actions/user.actions";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    createUser: build.mutation({
      queryFn: async (values: any) => {
        try {
          const user = await createUser(values);
          // Return the result in an object with a `data` field
          return { data: user };
        } catch (error) {
          // Return error in the expected FetchBaseQueryError format
          return { error: { status: "CUSTOM_ERROR", data: error } };
        }
      },
    }),
  }),
});

export const { useCreateUserMutation } = usersApi;
