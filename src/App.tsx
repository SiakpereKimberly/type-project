import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import { useState } from 'react';
import type { Product } from './interfaces/product';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

function App() {
  const [cart, setCart] = useState<Product[]>([]);
  function addToCart(product: Product) {
    setCart([...cart, product]);
    toast.success('Product added to cart!');
  }
  function removeFromCart(productId: number) {
    setCart(cart.filter((product) => product.id !== productId));
    toast.info('Product removed from cart.');
  }

  return (
    <BrowserRouter>
      <Toaster />
      <Navbar cart={cart} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/cart'
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />

        <Route
          path='/products/:id'
          element={<ProductDetails addToCart={addToCart} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
