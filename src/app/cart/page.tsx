'use client';

import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

export default function CartPage() {
  const { cart } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No items in your cart.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <p className="text-lg font-medium text-gray-700">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>
              {/* Optional: quantity or remove button */}
            </div>
          ))}

          <div className="flex justify-between items-center border-t pt-4 mt-6">
            <p className="text-lg font-semibold text-gray-800">Total:</p>
            <p className="text-xl font-bold text-green-600">
              ₹{Number(totalAmount).toFixed(2)}
            </p>
          </div>

          <div className="text-right mt-6">
            <Link
              href="/checkout"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition duration-200"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
