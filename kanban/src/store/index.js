import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
      persistStore,
      persistReducer,
      FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER,
    } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import kanbanReducer from './slices/kanbanSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    kanban: kanbanReducer
})

const persistReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistReducer,
   middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export const persister = persistStore(store)