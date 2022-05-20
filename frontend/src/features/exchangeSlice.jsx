import { createSlice } from '@reduxjs/toolkit'

export const exchangeSlice = createSlice({
  name: 'exchanges',
  initialState: {
    exchanges: null,
    user_request_exchanges: null,
    user_provide_exchanges: null,
  },
  reducers: {
    setAllExchanges: (state, action) => {
      state.exchanges = action.payload
    },
    setUserRequestExchanges: (state, action) => {
      state.user_request_exchanges = action.payload
    },
    setUserProvideExchanges: (state, action) => {
      state.user_provide_exchanges = action.payload
    },
  },
})

export const {
  setAllExchanges,
  setUserRequestExchanges,
  setUserProvideExchanges,
} = exchangeSlice.actions

export const selectExchanges = state => state.exchanges.exchanges
export const selectUserRequestExchanges = state =>
  state.exchanges.user_request_exchanges
export const selectUserProvideExchanges = state =>
  state.exchanges.user_provide_exchanges

export default exchangeSlice.reducer
