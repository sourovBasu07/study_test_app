import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createUser } from "../actions/user.actions";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    // normal HTTP endpoint using fetchBaseQuery
    // endpoint with a custom `queryFn` and separate async logic
    // getUser: build.query<User, string>({
    //   queryFn: async (userId: string) => {
    //     try {
    //       const user = await userApi.getUserById(userId);
    //       // Return the result in an object with a `data` field
    //       return { data: user };
    //     } catch (error) {
    //       // Catch any errors and return them as an object with an `error` field
    //       return { error };
    //     }
    //   },
    // }),
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

export const { useCreateUserMutation } = userApi;
