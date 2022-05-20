import { createSlice } from '@reduxjs/toolkit'

export const exchangeSlice = createSlice({
  name: 'exchanges',
  initialState: {
    exchanges: null,
    user_demand_exchanges: null,
    user_supply_exchanges: null,
  },
  reducers: {
    setAllExchanges: (state, action) => {
      state.exchanges = action.payload
    },
    setUserDemandExchanges: (state, action) => {
      state.user_demand_exchanges = action.payload
    },
    setUserSupplyExchanges: (state, action) => {
      state.user_supply_exchanges = action.payload
    },
  },
})

export const {
  setAllExchanges,
  setUserDemandExchanges,
  setUserSupplyExchanges,
} = exchangeSlice.actions

export const selectExchanges = state => state.exchanges.exchanges
export const selectUserRequestExchanges = state =>
  state.exchanges.user_demand_exchanges
export const selectUserProvideExchanges = state =>
  state.exchanges.user_supply_exchanges

export default exchangeSlice.reducer
