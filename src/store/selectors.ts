import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Product } from './slices/productsSlice';

// Base selectors
export const selectProducts = (state: RootState) => state.products.products;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;
export const selectSearchQuery = (state: RootState) => state.filters.searchQuery;
export const selectSelectedCategory = (state: RootState) => state.filters.selectedCategory;
export const selectSortBy = (state: RootState) => state.filters.sortBy;
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode;

// Computed selectors
export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchQuery, selectSelectedCategory, selectSortBy],
  (products, searchQuery, selectedCategory, sortBy) => {
    let filtered = [...products];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    return filtered;
  }
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((count, item) => count + item.quantity, 0)
);
