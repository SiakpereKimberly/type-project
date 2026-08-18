import type { Product } from '../interfaces/product';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cart: Product[];
}

function Navbar({ cart }: NavbarProps) {
  return (
    <nav className='flex items-center justify-between px-6 py-4 text-purple-600'>
      <h1 className='text-2xl font-bold'>Kim Store</h1>

      <Link
        to='/cart'
        className='rounded-lg bg-white px-4 py-2 font-semibold text-purple-600'
      >
        Cart ({cart.length})
      </Link>
    </nav>
  );
}

export default Navbar;
