import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import filtersReducer from './slices/filtersSlice';
import themeReducer from './slices/themeSlice';

const persistConfig = {
  key: 'ecommerce-store',
  storage,
  whitelist: ['cart', 'theme'], // Only persist cart and theme
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedThemeReducer = persistReducer(persistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: persistedCartReducer,
    filters: filtersReducer,
    theme: persistedThemeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
