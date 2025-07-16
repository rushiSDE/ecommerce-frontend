'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../context/CartContext';
import { placeOrder } from '../../../services/orderService';
import Swal from 'sweetalert2'; //  SweetAlert2

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const totalAmount = cart.reduce((acc, item) => acc + Number(item.price), 0);
  const productIds = cart.map((item) => Number(item.id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const order = {
      name,
      email,
      phone,
      productIds,
      totalAmount,
    };

    console.log('📦 Sending order:', order);

    const response = await placeOrder(order);
    if (!response.error) {
      //  Success SweetAlert
      await Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: 'Your order has been placed successfully.',
        confirmButtonColor: '#16a34a',
      });

      clearCart();
      router.push('/orders');
    } else {
      //  Error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: 'Something went wrong. Please try again later.',
        confirmButtonColor: '#dc2626',
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone"
          className="w-full border px-3 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <p className="text-lg font-semibold text-green-600">
          Total: ₹{Number(totalAmount).toFixed(2)}
        </p>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
           Place Order
        </button>
      </form>
    </div>
  );
}
