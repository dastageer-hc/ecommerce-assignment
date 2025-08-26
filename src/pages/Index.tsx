import { useEffect } from "react";
import { FilterControls } from "@/components/FilterControls";
import { ProductGrid } from "@/components/ProductGrid";
import { useAppDispatch } from "@/store/hooks";
import {
  setProducts,
  setLoading,
  setError,
} from "@/store/slices/productsSlice";
import { fetchProducts } from "@/services/api";

const Index = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const products = await fetchProducts();
        dispatch(setProducts(products));
      } catch (err) {
        dispatch(
          setError(
            err instanceof Error ? err.message : "Failed to load products"
          )
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadProducts();
  }, [dispatch]);

  return (
    <main className='container mx-auto px-4 py-8'>
      {/* Filters */}
      <section className='mb-8'>
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
