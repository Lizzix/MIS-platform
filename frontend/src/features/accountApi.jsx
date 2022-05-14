import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CONSTANTS from '../global/Constants'

export const accountApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: CONSTANTS.BASE_URL }),
  reducerPath: 'accountApi',
  endpoints: builder => ({
    signupAccount: builder.mutation({
      query: body => ({
        url: `accounts/signup`,
        method: 'POST',
        body: body,
      }),
    }),
    loginAccount: builder.mutation({
      query: body => ({
        url: `accounts/login`,
        method: 'POST',
        body: body,
      }),
    }),
    refreshAccount: builder.mutation({
      query: () => ({
        url: `accounts/refresh`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useSignupAccountMutation,
  useLoginAccountMutation,
  useRefreshAccountMutation,
} = accountApi
