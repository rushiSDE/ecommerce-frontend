'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProducts } from '../../services/productService';
import { useCart } from '../../context/CartContext';
import Swal from 'sweetalert2'; // SweetAlert2

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // Show SweetAlert on Add to Cart
  const handleAddToCart = (product: any) => {
    addToCart(product);

    Swal.fire({
      title: 'Added to Cart!',
      text: `${product.name} has been added.`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Redirect to Checkout with Product
  const handlePlaceOrder = (product: any) => {
    addToCart(product);
    router.push('/checkout');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">🛍️ Available Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="border rounded-lg shadow hover:shadow-lg bg-white p-4 flex flex-col items-center"
          >
            <img
              src={product.image || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />

            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-1">{product.description}</p>
            <p className="text-green-700 font-bold text-base mb-3">₹{product.price}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => handlePlaceOrder(product)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
              >
                ✅ Place Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
