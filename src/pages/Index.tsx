import { useEffect } from 'react';
import { FilterControls } from '@/components/FilterControls';
import { ProductGrid } from '@/components/ProductGrid';
import { useStore } from '@/store/useStore';
import { fetchProducts } from '@/services/api';

const Index = () => {
  const { setProducts, setLoading, setError } = useStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await fetchProducts();
        setProducts(products);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [setProducts, setLoading, setError]);

  return (
    <main className="container mx-auto px-4 py-8">
      

      {/* Filters */}
      <section className="mb-8">
        <FilterControls />
      </section>

      {/* Products Grid */}
      <section>
        <ProductGrid />
      </section>
    </main>
  );
};

export default Index;
