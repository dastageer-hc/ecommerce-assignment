# Migration from Zustand to Redux Toolkit

This document summarizes the migration of the e-commerce application from Zustand state management to Redux Toolkit.

## What Was Changed

### 1. Dependencies

- **Removed**: `zustand` package
- **Added**: `@reduxjs/toolkit`, `react-redux`, `redux-persist`

### 2. Store Structure

The monolithic Zustand store was split into multiple Redux slices:

#### Products Slice (`src/store/slices/productsSlice.ts`)

- Manages products array, loading state, and error state
- Actions: `setProducts`, `setLoading`, `setError`

#### Cart Slice (`src/store/slices/cartSlice.ts`)

- Manages cart items and cart-related operations
- Actions: `addToCart`, `removeFromCart`, `clearCart`, `updateQuantity`

#### Filters Slice (`src/store/slices/filtersSlice.ts`)

- Manages search query, category selection, and sorting
- Actions: `setSearchQuery`, `setSelectedCategory`, `setSortBy`, `clearFilters`

#### Theme Slice (`src/store/slices/themeSlice.ts`)

- Manages dark mode state
- Actions: `toggleTheme`, `setTheme`

### 3. Store Configuration (`src/store/store.ts`)

- Configured Redux store with all slices
- Added Redux Persist for cart and theme persistence
- Configured middleware to handle serialization

### 4. Selectors (`src/store/selectors.ts`)

- Created memoized selectors for computed values
- Replaced Zustand's computed functions with Redux selectors
- Includes: `selectFilteredProducts`, `selectCartTotal`, `selectCartCount`

### 5. Typed Hooks (`src/store/hooks.ts`)

- Created typed versions of `useDispatch` and `useSelector`
- Provides type safety for Redux operations

### 6. Component Updates

All components were updated to use Redux instead of Zustand:

#### Header Component

- Uses `useAppSelector` for state
- Uses `useAppDispatch` for actions
- Manages search query and theme toggle

#### ProductGrid Component

- Uses selectors for loading, error, and filtered products
- No longer needs to call functions for computed values

#### ProductCard Component

- Dispatches `addToCart` action
- Uses typed Redux hooks

#### FilterControls Component

- Manages filters through Redux actions
- Uses selectors for current filter state

#### CartDrawer Component

- Manages cart operations through Redux
- Uses selectors for cart data

#### ProductDetail Component

- Dispatches cart actions
- Uses selectors for cart state

#### Index Page

- Dispatches product loading actions
- Manages API calls and state updates

### 7. App.tsx Updates

- Wrapped application with Redux `Provider`
- Added `PersistGate` for state persistence
- Maintains existing React Query and routing setup

## Benefits of the Migration

1. **Better DevTools**: Redux DevTools provide excellent debugging capabilities
2. **Predictable State Updates**: Redux's unidirectional data flow
3. **Middleware Support**: Easy to add logging, analytics, etc.
4. **Better Performance**: Memoized selectors and optimized re-renders
5. **Type Safety**: Full TypeScript support with typed hooks
6. **Ecosystem**: Access to the vast Redux ecosystem

## State Persistence

- Cart items and theme preference are persisted using Redux Persist
- Products and filters are not persisted (loaded fresh on each visit)

## Testing

The application builds successfully and should run without errors. All functionality has been preserved while improving the state management architecture.

## Usage Examples

### Before (Zustand):

```typescript
const { products, loading, addToCart } = useStore();
const filteredProducts = filteredProducts(); // Function call
```

### After (Redux):

```typescript
const products = useAppSelector(selectProducts);
const loading = useAppSelector(selectLoading);
const dispatch = useAppDispatch();
const filteredProducts = useAppSelector(selectFilteredProducts); // Direct value
dispatch(addToCart(product));
```

The migration maintains all existing functionality while providing a more robust and scalable state management solution.
