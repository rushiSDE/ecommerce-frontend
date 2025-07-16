'use client';

import { useEffect, useState } from 'react';
import { fetchOrderHistory } from '../../../services/orderService'; // adjust path if needed

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrderHistory().then(setOrders);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">🧾 Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">You have no past orders.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-blue-600">
                  🛍️ Order #{order.id}
                </h2>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-1">
                👤 <strong>Customer:</strong> {order.customerName || 'N/A'}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                📞 <strong>Phone:</strong> {order.customerPhone || 'N/A'}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                🧾 <strong>Customer ID:</strong> {order.customerId}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                📦 <strong>Product IDs:</strong> {order.productIds?.join(', ')}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                💵 <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>

              <p className="text-xs text-gray-400">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
