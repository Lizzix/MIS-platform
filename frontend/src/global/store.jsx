import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import { exchangeApi } from '../features/exchangeApi'
import { accountApi } from '../features/accountApi'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const persisitedReducer = persistReducer(persistConfig, userReducer)
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
})

const store = configureStore({
  reducer: {
    user: persisitedReducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    customizedMiddleware
      .concat(exchangeApi.middleware)
      .concat(accountApi.middleware),
})

const persistor = persistStore(store)
export { persistor }
export default store
