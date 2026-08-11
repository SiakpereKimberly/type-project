import type { Product } from '../interfaces/product';

interface CartProps {
  cart: Product[];
  removeFromCart: (productId: number) => void;
}

function Cart({ cart, removeFromCart }: CartProps) {
  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <div className='mx-auto max-w-4xl px-6'>
        <h1 className='mb-8 text-center text-4xl font-bold'>My Cart</h1>

        {cart.length === 0 ? (
          <div className='rounded-xl bg-white p-10 text-center shadow'>
            <p className='text-xl text-gray-500'>Your cart is empty.</p>
          </div>
        ) : (
          <div className='space-y-6'>
            {cart.map((product) => (
              <div
                key={product.id}
                className='flex items-center gap-6 rounded-xl bg-white p-6 shadow'
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className='h-32 w-32 object-contain'
                />

                <div className='flex-1'>
                  <h2 className='text-lg font-semibold'>{product.title}</h2>

                  <p className='mt-2 text-xl font-bold text-purple-600'>
                    ${product.price.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className='rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
