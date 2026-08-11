import { useEffect, useState } from 'react';
import type { Product } from '../interfaces/product';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

function Home() {
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
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-2xl font-bold'>Loading Products...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <h1 className='text-2xl text-red-500'>{error}</h1>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <div className='mx-auto w-full max-w-5xl px-6'>
        <h1 className='mb-8 text-center text-4xl font-bold'>Kim Store</h1>

        <Link
          to='/cart'
          className='rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700'
        >
          Cart
        </Link>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
