import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setSelectedCategory,
  setSortBy,
  setSearchQuery,
  clearFilters,
} from "@/store/slices/filtersSlice";
import {
  selectSelectedCategory,
  selectSortBy,
  selectSearchQuery,
} from "@/store/selectors";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/services/api";

export const FilterControls = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const sortBy = useAppSelector(selectSortBy);
  const searchQuery = useAppSelector(selectSearchQuery);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    loadCategories();
  }, []);

  const clearAllFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = searchQuery || selectedCategory;

  return (
    <div className='flex flex-wrap items-center gap-4 p-4 bg-gradient-secondary rounded-lg shadow-card'>
      {/* Category Filter */}
      <div className='flex items-center space-x-2'>
        <span className='text-sm font-medium text-muted-foreground'>
          Category:
        </span>
        <Select
          value={selectedCategory || "all"}
          onValueChange={(value) =>
            dispatch(setSelectedCategory(value === "all" ? "" : value))
          }
        >
          <SelectTrigger className='w-48 bg-background'>
            <SelectValue placeholder='All Categories' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className='capitalize'
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort By */}
      <div className='flex items-center space-x-2'>
        <span className='text-sm font-medium text-muted-foreground'>
          Sort by:
        </span>
        <Select
          value={sortBy}
          onValueChange={(value: any) => dispatch(setSortBy(value))}
        >
          <SelectTrigger className='w-40 bg-background'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='name'>Name</SelectItem>
            <SelectItem value='price-asc'>Price: Low to High</SelectItem>
            <SelectItem value='price-desc'>Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      <div className='flex items-center space-x-2 ml-auto'>
        {hasActiveFilters && (
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-muted-foreground'>
              Active filters:
            </span>
            {searchQuery && (
              <Badge variant='secondary' className='bg-gradient-accent'>
                Search: "{searchQuery}"
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-4 w-4 p-0 ml-1 hover:bg-transparent'
                  onClick={() => dispatch(setSearchQuery(""))}
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge
                variant='secondary'
                className='bg-gradient-accent capitalize'
              >
                {selectedCategory}
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-4 w-4 p-0 ml-1 hover:bg-transparent'
                  onClick={() => dispatch(setSelectedCategory(""))}
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            )}
            <Button
              variant='outline'
              size='sm'
              onClick={clearAllFilters}
              className='text-xs'
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
