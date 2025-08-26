import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface Store {
  // Products
  products: Product[];
  loading: boolean;
  error: string | null;
  
  // Filters
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'price-asc' | 'price-desc' | 'name';
  
  // Cart
  cartItems: CartItem[];
  
  // Theme
  isDarkMode: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: 'price-asc' | 'price-desc' | 'name') => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleTheme: () => void;
  
  // Computed
  filteredProducts: () => Product[];
  cartTotal: () => number;
  cartCount: () => number;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      loading: false,
      error: null,
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'name',
      cartItems: [],
      isDarkMode: false,
      
      // Actions
      setProducts: (products) => set({ products }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSortBy: (sortBy) => set({ sortBy }),
      
      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find(item => item.product.id === product.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        return {
          cartItems: [...state.cartItems, { product, quantity: 1 }]
        };
      }),
      
      removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.product.id !== productId)
      })),
      
      clearCart: () => set({ cartItems: [] }),
      
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      // Computed functions
      filteredProducts: () => {
        const { products, searchQuery, selectedCategory, sortBy } = get();
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
      },
      
      cartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      
      cartCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);