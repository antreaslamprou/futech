import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import currentUserReducer from './features/currentUserReducer'
import basketReducer from './features/basketReducer'
import productsReducer from './features/productsReducer';
import countriesReducer from './features/countriesReducer';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['basket'],
};

const persistedReducer = persistReducer(persistConfig, basketReducer);


export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    basket: persistedReducer,
    products: productsReducer,
    countries: countriesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);