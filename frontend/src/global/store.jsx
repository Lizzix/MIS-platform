import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import userReducer from '../features/userSlice'
import exchangeReducer from '../features/exchangeSlice'
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
    exchanges: exchangeReducer,
    [exchangeApi.reducerPath]: exchangeApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    customizedMiddleware
      .concat(exchangeApi.middleware)
      .concat(accountApi.middleware),
})

setupListeners(store.dispatch)

const persistor = persistStore(store)
export { persistor }
export default store
