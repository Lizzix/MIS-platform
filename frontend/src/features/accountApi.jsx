import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CONSTANTS from '../global/Constants'

export const accountApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: CONSTANTS.BASE_URL }),
  reducerPath: 'accountApi',
  endpoints: builder => ({
    getAccounts: builder.query({
      query: () => `accounts/`,
    }),
    getAccountByUid: builder.query({
      query: uid => `accounts/${uid}`,
    }),
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
    deleteAccount: builder.mutation({
      query: uid => ({
        url: `accounts/delete/${uid}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAccountsQuery,
  useLazyGetAccountsQuery,
  useGetAccountByUidQuery,
  useLazyGetAccountByUidQuery,
  useSignupAccountMutation,
  useLoginAccountMutation,
  useRefreshAccountMutation,
  useDeleteAccountMutation,
} = accountApi
