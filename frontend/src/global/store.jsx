import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import { exchangeApi } from '../features/exchangeApi'
import { accountApi } from '../features/accountApi'

export default configureStore({
  reducer: {
    user: userReducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(exchangeApi.middleware)
      .concat(accountApi.middleware),
})
