import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../interfaces/product';

function ProductDetails({
  addToCart,
}: {
  addToCart: (product: Product) => void;
}) {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }

        const data = await response.json();

        setProduct(data);
      } catch {
        setError('Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <p className='text-2xl font-semibold'>Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <p className='text-xl text-red-500'>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <p className='text-xl'>Product not found.</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 py-12'>
      <div className='mx-auto max-w-5xl px-6'>
        <div className='grid gap-10 rounded-2xl bg-white p-8 shadow-lg md:grid-cols-2'>
          <div className='flex items-center justify-center'>
            <img
              src={product.image}
              alt={product.title}
              className='h-96 w-full object-contain'
            />
          </div>

          <div className='flex flex-col justify-center'>
            <p className='mb-3 text-sm font-medium uppercase text-purple-600'>
              {product.category}
            </p>

            <h1 className='text-3xl font-bold'>{product.title}</h1>

            <p className='mt-5 text-3xl font-bold text-purple-600'>
              ${product.price.toFixed(2)}
            </p>

            <p className='mt-6 leading-7 text-gray-600'>
              {product.description}
            </p>

            <button
              onClick={() => addToCart(product)}
              className='mt-8 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
