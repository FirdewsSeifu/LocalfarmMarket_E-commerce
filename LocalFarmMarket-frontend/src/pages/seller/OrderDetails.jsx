import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error(error); // Log the actual error
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order #{order._id}</h2>
      
      <div className="mb-4">
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Email:</strong> {order.customerEmail}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Items</h3>
        <ul className="border rounded p-3 bg-white">
          {order.items?.map((item, index) => (
            <li key={index} className="border-b py-2">
              <p>{item.productName} × {item.quantity}</p>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Total: ${order.totalAmount?.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default OrderDetails;
