import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Product } from '../interfaces/product';
import { toast } from 'sonner';

function ProductDetails({
  addToCart,
}: {
  addToCart: (product: Product) => void;
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  async function handleAddToCart() {
    setIsAdding(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    addToCart(product);

    setIsAdding(false);
  }

  async function deleteProduct() {
    console.log('Deleting product with ID:', id);

    setIsDeleting(true);

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });

      console.log('Delete response:', response);

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      toast.success('Product deleted successfully!');
      navigate('/');
    } catch {
      setError('Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
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
              onClick={handleAddToCart}
              disabled={isAdding}
              className='mt-8 flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70'
            >
              {isAdding && (
                <span className='mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
              )}

              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>

            <button
              onClick={deleteProduct}
              disabled={isDeleting}
              className='mt-4 flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70'
            >
              {isDeleting && (
                <span className='mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
              )}

              {isDeleting ? 'Deleting...' : 'Delete Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
