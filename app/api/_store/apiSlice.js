import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authUserApi = createApi({
    reducerPath: "authUserApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000/api"}),
    endpoints: (builder)=>(
        {
            getUserData: builder.query({
                query: () => "authUser"
            })
        }
    )
})

export const {useGetUserDataQuery} = authUserApi;
