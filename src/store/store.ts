import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./slices/productsSlice.js";
import cartReducer from "./slices/cartSlice.js";
import filtersReducer from "./slices/filtersSlice.js";
import themeReducer from "./slices/themeSlice.js";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  filters: filtersReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "ecommerce-store",
  storage, // This uses localStorage by default
  whitelist: ["cart", "theme"], // Only persist cart and theme
  debug: true, // Enable debug logging to see localStorage operations
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
