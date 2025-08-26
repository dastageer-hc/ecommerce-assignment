import { Minus, Plus, Trash2, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useStore } from '@/store/useStore';
import { toast } from '@/hooks/use-toast';

interface CartDrawerProps {
  children: React.ReactNode;
}

export const CartDrawer = ({ children }: CartDrawerProps) => {
  const { cartItems, addToCart, removeFromCart, cartTotal, cartCount, clearCart } = useStore();

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart.",
      });
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  if (cartItems.length === 0) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg bg-gradient-secondary">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Your Cart</span>
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground text-center">
              Looks like you haven't added any items to your cart yet. Start shopping to see items here!
            </p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-secondary flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Your Cart</span>
              <Badge variant="secondary" className="bg-gradient-accent">
                {cartCount()} {cartCount() === 1 ? 'item' : 'items'}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearCart}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {cartItems.map((item) => (
            <div key={item.product.id} className="bg-background rounded-lg p-4 shadow-card">
              <div className="flex space-x-4">
                {/* Product Image */}
                <div className="w-16 h-16 bg-white rounded-lg p-2 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">
                    {item.product.title}
                  </h4>
                  <p className="text-muted-foreground text-xs capitalize mb-2">
                    {item.product.category}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => addToCart(item.product)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-semibold text-primary">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-muted-foreground">
                          ${item.product.price.toFixed(2)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Footer */}
        <div className="border-t pt-4 space-y-4">
          <Separator />
          
          {/* Total */}
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total:</span>
            <span className="text-primary">${cartTotal().toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <Button 
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300" 
            size="lg"
            onClick={() => {
              toast({
                title: "Checkout",
                description: "Checkout functionality would be implemented here!",
              });
            }}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};