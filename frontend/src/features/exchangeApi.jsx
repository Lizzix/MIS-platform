import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CONSTANTS from '../global/Constants'

export const exchangeApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: CONSTANTS.BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const user = getState().user.user
      if (user && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${user.access_token}`)
      }
      return headers
    },
  }),
  reducerPath: 'exchangeApi',
  tagTypes: ['Exchange'],
  endpoints: builder => ({
    getExchanges: builder.query({
      query: () => `exchanges/`,
    }),
    getExchangeById: builder.query({
      query: id => `exchanges/${id}`,
    }),
    getExchangeByUid: builder.query({
      query: uid => `exchanges/${uid}`,
    }),
    getDemandExchangeByUid: builder.query({
      query: uid => `exchanges/${uid}/demand`,
    }),
    getSupplyExchangeByUid: builder.query({
      query: uid => `exchanges/${uid}/supply`,
    }),
    addExchage: builder.mutation({
      query: body => ({
        url: `exchanges/`,
        method: 'POST',
        body: body,
      }),
    }),
    updateExchange: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `exchanges/${id}`,
        method: 'PUT',
        body: rest,
      }),
    }),
    deleteExchange: builder.mutation({
      query: id => ({
        url: `exchanges/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetExchangesQuery,
  useGetExchangeByIdQuery,
  useGetExchangeByUidQuery,
  useGetDemandExchangeByUidQuery,
  useGetSupplyExchangeByUidQuery,
  useAddExchageMutation,
  useUpdateExchangeMutation,
  useDeleteExchangeMutation,
} = exchangeApi
