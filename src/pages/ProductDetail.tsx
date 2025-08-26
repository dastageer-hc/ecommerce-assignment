import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LoadingGrid } from '@/components/LoadingGrid';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useStore } from '@/store/useStore';
import { fetchProduct } from '@/services/api';
import { Product } from '@/store/useStore';
import { toast } from '@/hooks/use-toast';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const productData = await fetchProduct(parseInt(id));
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.title} added to your cart.`,
    });
  };

  const getCartQuantity = () => {
    if (!product) return 0;
    const cartItem = cartItems.find(item => item.product.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square bg-gradient-secondary rounded-lg animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gradient-secondary rounded animate-pulse" />
            <div className="h-6 bg-gradient-secondary rounded w-1/3 animate-pulse" />
            <div className="h-20 bg-gradient-secondary rounded animate-pulse" />
            <div className="h-10 bg-gradient-secondary rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message="Product not found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 hover:shadow-glow transition-shadow"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-white rounded-lg p-8 shadow-card">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category & Title */}
          <div>
            <Badge variant="secondary" className="mb-3 capitalize bg-gradient-accent">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {product.title}
            </h1>
          </div>

          {/* Rating & Price */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating.rate}</span>
              </div>
              <span className="text-muted-foreground">
                ({product.rating.count} reviews)
              </span>
            </div>
            
            <div className="text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {getCartQuantity() > 0 && (
              <p className="text-sm text-muted-foreground">
                {getCartQuantity()} already in cart
              </p>
            )}

            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add {quantity > 1 ? `${quantity} ` : ''}to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};