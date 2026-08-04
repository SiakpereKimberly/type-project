import { useEffect, useState } from 'react';
import type { Product } from './interfaces/product';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        setProducts(data);
      } catch {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center jusify-center'>
        {' '}
        <h1 className='text-3xl font-bold'>Loading Products...</h1>
      </div>
    );
  }

  if (error) {
    return <h1 className='text-center mt-10 text-2xl text-red-500'>{error}</h1>;
  }

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center py-10'>
      <div className='w-full max-w-5xl'>
        <h1 className='text-4xl font-bold text-center'>Kim's Store</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
