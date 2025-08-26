import { ProductCard } from "./ProductCard";
import { LoadingGrid } from "./LoadingGrid";
import { ErrorMessage } from "./ErrorMessage";
import { useAppSelector } from "@/store/hooks";
import {
  selectLoading,
  selectError,
  selectFilteredProducts,
} from "@/store/selectors";

export const ProductGrid = () => {
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const filteredProducts = useAppSelector(selectFilteredProducts);

  if (loading) {
    return <LoadingGrid />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const products = filteredProducts;

  if (products.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-6xl mb-4'>🔍</div>
        <h3 className='text-xl font-semibold mb-2'>No products found</h3>
        <p className='text-muted-foreground'>
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
