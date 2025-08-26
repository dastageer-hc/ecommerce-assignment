import { Moon, Sun, ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "@/components/CartDrawer";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/filtersSlice";
import { toggleTheme } from "@/store/slices/themeSlice";
import { selectIsDarkMode, selectCartCount } from "@/store/selectors";
import { useEffect } from "react";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const cartCount = useAppSelector(selectCartCount);
  const searchQuery = useAppSelector((state) => state.filters.searchQuery);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <div className='h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center'>
            <span className='text-primary-foreground font-bold text-sm'>E</span>
          </div>
          <h1 className='text-xl font-bold bg-gradient-primary bg-clip-text text-transparent'>
            EcomStore
          </h1>
        </div>

        {/* Search Bar */}
        <div className='flex-1 max-w-md mx-8'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search products...'
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className='pl-10 bg-gradient-secondary border-0 focus:shadow-glow'
            />
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center space-x-2'>
          {/* Cart */}
          <CartDrawer>
            <Button
              variant='ghost'
              size='icon'
              className='relative hover:shadow-glow transition-shadow'
            >
              <ShoppingCart className='h-5 w-5' />
              {cartCount > 0 && (
                <Badge
                  variant='destructive'
                  className='absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs'
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </CartDrawer>

          {/* Theme Toggle */}
          <Button
            variant='ghost'
            size='icon'
            onClick={() => dispatch(toggleTheme())}
            className='hover:shadow-glow transition-shadow'
          >
            {isDarkMode ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
