import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/institution" }), // Adjust base URL
  tagTypes: ["Teacher", "Student"], // Add all necessary tag types
  endpoints: () => ({}), // No endpoints here, they will be injected
});

export default apiSlice;
