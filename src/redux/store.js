import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import MyAutoSlice from './Slice/MyAutoSlice'

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['count']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const createStore = () => {  
  const store = configureStore({
    reducer: persistedReducer,
    MyAuto: MyAutoSlice,
  })

  let persistor = persistStore(store)

  return { store, persistor };
}