import type { Product } from '../interfaces/product';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl p-6'>
      <div className='h-56 flex items-center justify-center p-4'>
        <img
          src={product.image}
          alt={product.title}
          className='h-full object-contain'
        />
      </div>

      <div className='p-4'>
        <h2 className='font-semibold text-xl mt-4'>{product.title}</h2>

        <p className='text-gray-500 mt-2 capitalize'>{product.category}</p>

        <p className='text-3xl font-bold text-purple-600 mt-4'>
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
