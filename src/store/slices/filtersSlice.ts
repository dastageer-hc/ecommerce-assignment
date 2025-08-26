import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  searchQuery: string;
  selectedCategory: string;
  sortBy: "price-asc" | "price-desc" | "name";
}

const initialState: FiltersState = {
  searchQuery: "",
  selectedCategory: "",
  sortBy: "name",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<"price-asc" | "price-desc" | "name">
    ) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = "";
      state.selectedCategory = "";
      state.sortBy = "name";
    },
  },
});

export const { setSearchQuery, setSelectedCategory, setSortBy, clearFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
